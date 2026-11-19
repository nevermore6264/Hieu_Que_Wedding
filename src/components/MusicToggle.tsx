"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onOpen = () => {
      audio.play().catch(() => setPlaying(false));
    };
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    window.addEventListener("hieu-que-open", onOpen);
    return () => {
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      window.removeEventListener("hieu-que-open", onOpen);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={wedding.music.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Tắt nhạc nền" : "Mở nhạc nền"}
        className={`fixed right-4 bottom-4 z-40 flex items-center gap-2 border border-gold/50 bg-ivory/95 px-3 py-2 text-ink shadow-[0_12px_30px_-18px_rgba(40,24,8,0.8)] backdrop-blur-md transition duration-300 ${playing ? "music-live" : ""}`}
      >
        <span aria-hidden className="font-serif text-lg leading-none text-gold">
          {playing ? "♫" : "♩"}
        </span>
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-[0.22em]">
            {playing ? "Đang phát" : "Nhạc"}
          </span>
          <span className="block max-w-36 truncate font-serif text-sm leading-tight">{wedding.music.title}</span>
        </span>
      </button>
    </>
  );
}
