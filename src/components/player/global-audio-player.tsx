"use client";

import { Play, Pause } from "lucide-react";
import { useAudioPlayer } from "@/hooks/use-audio-player";

export function GlobalAudioPlayer() {
  const { ref, state, controls } = useAudioPlayer();

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700 bg-slate-950/95 p-3 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3">
        <button
          type="button"
          onClick={controls.toggle}
          className="rounded-full border border-slate-600 p-2 text-text hover:border-brand hover:text-brand"
          aria-label={state.isPlaying ? "Pausar audio" : "Reproduzir audio"}
        >
          {state.isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <input
          type="url"
          placeholder="Cole a URL de audio (estudos biblicos/financeiros)"
          className="w-full rounded-md border border-slate-700 bg-cardbg px-3 py-2 text-sm"
          onBlur={(e) => controls.load(e.currentTarget.value, "Conteudo em reproducao")}
          defaultValue={state.source}
        />
        <p className="hidden text-xs text-slate-400 md:block">{state.title || "Player global"}</p>
      </div>
      <audio ref={ref} src={state.source} autoPlay={state.isPlaying} className="hidden" />
    </aside>
  );
}
