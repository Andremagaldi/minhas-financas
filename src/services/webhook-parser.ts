import type { Transaction } from "@/types/finance";

type ParsedSms = {
  amount: number;
  merchant: string;
  occurredAt: string;
  type: "expense";
};

const amountPatterns = [
  /(?:R\$\s?)(\d+[\.,]\d{2})/i,
  /(\d+[\.,]\d{2})\s?(?:reais|brl)/i
];

export function parseBankSms(message: string): ParsedSms | null {
  const normalized = message.replace(/\s+/g, " ").trim();
  let amount = 0;

  for (const pattern of amountPatterns) {
    const match = normalized.match(pattern);
    if (match?.[1]) {
      amount = Number.parseFloat(match[1].replace(".", "").replace(",", "."));
      break;
    }
  }

  if (!amount || Number.isNaN(amount)) {
    return null;
  }

  const merchantMatch = normalized.match(/(?:em|no|na)\s+([A-Za-z0-9\s\-\.]{3,40})/i);
  const merchant = merchantMatch?.[1]?.trim() ?? "Estabelecimento nao identificado";

  const dateMatch = normalized.match(/(\d{2}\/\d{2}\/\d{4})/);
  const occurredAt = dateMatch?.[1]
    ? new Date(dateMatch[1].split("/").reverse().join("-")).toISOString()
    : new Date().toISOString();

  return {
    amount,
    merchant,
    occurredAt,
    type: "expense"
  };
}

export function toWebhookTransaction(userId: string, parsed: ParsedSms): Omit<Transaction, "id" | "created_at"> {
  return {
    user_id: userId,
    title: parsed.merchant,
    category: "Compra SMS",
    amount: parsed.amount,
    type: parsed.type,
    occurred_at: parsed.occurredAt,
    payment_status: "paid",
    installment_id: null
  };
}
