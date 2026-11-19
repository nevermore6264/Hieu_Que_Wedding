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
        title={wedding.music.title}
        className={`music-orb ${playing ? "is-on" : ""}`}
      >
        <span className="music-ripple" aria-hidden />
        <span className="music-ripple music-ripple-late" aria-hidden />
        {playing ? (
          <span className="music-bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        ) : (
          <span aria-hidden className="font-serif text-lg leading-none">
            ♪
          </span>
        )}
      </button>
    </>
  );
}
