"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const start = () => {
      if (userPaused.current || !audio.paused) return;
      audio.play().catch(() => setPlaying(false));
    };
    const onGesture = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".music-orb")) return;
      start();
    };
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    if (!audio.paused) setPlaying(true);
    window.addEventListener("hieu-que-open", start);
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    start();

    return () => {
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      window.removeEventListener("hieu-que-open", start);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userPaused.current = true;
      audio.pause();
      return;
    }
    userPaused.current = false;
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={wedding.music.src} loop autoPlay preload="auto" />
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
