"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AudioState = {
  source: string;
  title: string;
  isPlaying: boolean;
  time: number;
};

const storageKey = "minhas-financas-audio";

export function useAudioPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<AudioState>({
    source: "",
    title: "",
    isPlaying: false,
    time: 0
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    const parsed = JSON.parse(raw) as AudioState;
    setState(parsed);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;

    const syncTime = () => setState((prev) => ({ ...prev, time: audio.currentTime }));
    audio.addEventListener("timeupdate", syncTime);
    return () => audio.removeEventListener("timeupdate", syncTime);
  }, []);

  const controls = useMemo(
    () => ({
      load: (source: string, title: string) => setState((prev) => ({ ...prev, source, title })),
      toggle: () => {
        const audio = ref.current;
        if (!audio) return;
        if (audio.paused) {
          void audio.play();
          setState((prev) => ({ ...prev, isPlaying: true }));
        } else {
          audio.pause();
          setState((prev) => ({ ...prev, isPlaying: false }));
        }
      }
    }),
    []
  );

  return { ref, state, controls };
}
