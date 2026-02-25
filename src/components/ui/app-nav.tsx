import Link from "next/link";
import type { Route } from "next";

const nav: Array<{ href: Route; label: string }> = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transacoes", label: "Transacoes" },
  { href: "/configuracoes", label: "Configuracoes" }
];

export function AppNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md border border-slate-700 bg-cardbg px-3 py-2 text-sm text-text transition hover:border-brand hover:text-brand"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
