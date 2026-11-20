"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  getPlayerState: () => number;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          width?: string;
          height?: string;
          videoId?: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: () => void;
          };
        },
      ) => YTPlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function MusicToggle() {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const userPaused = useRef(false);
  const wantPlay = useRef(false);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const track = wedding.playlist[index];

  useEffect(() => {
    let cancelled = false;
    let skips = 0;

    const isLive = () => {
      const player = playerRef.current;
      const state = window.YT?.PlayerState;
      if (!player || !state) return false;
      try {
        const current = player.getPlayerState();
        return current === state.PLAYING || current === state.BUFFERING;
      } catch {
        return false;
      }
    };

    const playCurrent = () => {
      const player = playerRef.current;
      if (!player || userPaused.current || isLive()) return;
      player.playVideo();
    };

    const advance = (fromError = false) => {
      if (fromError) skips += 1;
      else skips = 0;
      if (skips > wedding.playlist.length || userPaused.current) return;
      const next = (indexRef.current + 1) % wedding.playlist.length;
      indexRef.current = next;
      setIndex(next);
      playerRef.current?.loadVideoById(wedding.playlist[next].youtube);
    };

    const mount = () => {
      if (cancelled || playerRef.current || !hostRef.current || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(hostRef.current, {
        width: "1",
        height: "1",
        videoId: wedding.playlist[0].youtube,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (!wantPlay.current || userPaused.current) return;
            if (indexRef.current === 0) playerRef.current?.playVideo();
            else playerRef.current?.loadVideoById(wedding.playlist[indexRef.current].youtube);
          },
          onStateChange: (event) => {
            const state = window.YT?.PlayerState;
            if (!state) return;
            if (event.data === state.PLAYING || event.data === state.BUFFERING) {
              skips = 0;
              setPlaying(true);
            }
            if (event.data === state.PAUSED) setPlaying(false);
            if (event.data === state.ENDED) advance(false);
          },
          onError: () => advance(true),
        },
      });
    };

    const start = () => {
      if (userPaused.current) return;
      wantPlay.current = true;
      playCurrent();
    };

    const onGesture = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".music-dock")) return;
      setOpen(false);
      start();
    };

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      mount();
    };

    if (window.YT?.Player) mount();
    else if (!document.querySelector("script[data-yt-api]")) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.dataset.ytApi = "true";
      document.body.appendChild(tag);
    }

    window.addEventListener("hieu-que-open", start);
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);

    return () => {
      cancelled = true;
      window.onYouTubeIframeAPIReady = previousReady;
      window.removeEventListener("hieu-que-open", start);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  const playAt = (next: number) => {
    userPaused.current = false;
    wantPlay.current = true;
    indexRef.current = next;
    setIndex(next);
    setOpen(true);
    playerRef.current?.loadVideoById(wedding.playlist[next].youtube);
  };

  const onOrb = () => {
    const player = playerRef.current;
    const state = window.YT?.PlayerState;
    let current = -1;
    try {
      current = player?.getPlayerState() ?? -1;
    } catch {
      current = -1;
    }
    const isPlaying = state ? current === state.PLAYING || current === state.BUFFERING : playing;
    if (!isPlaying) {
      userPaused.current = false;
      wantPlay.current = true;
      setOpen(true);
      if (player) player.playVideo();
      return;
    }
    if (!open) {
      setOpen(true);
      return;
    }
    userPaused.current = true;
    wantPlay.current = false;
    player?.pauseVideo();
    setPlaying(false);
    setOpen(false);
  };

  return (
    <div className="music-dock">
      <div ref={hostRef} />
      {open ? (
        <div className="music-list" role="listbox" aria-label="Danh sách nhạc cưới">
          {wedding.playlist.map((song, songIndex) => {
            const current = songIndex === index;
            return (
              <button
                key={song.id}
                type="button"
                role="option"
                aria-selected={current}
                className={current ? "is-current" : ""}
                onClick={() => {
                  if (current && playing) {
                    userPaused.current = true;
                    wantPlay.current = false;
                    playerRef.current?.pauseVideo();
                    setPlaying(false);
                    return;
                  }
                  playAt(songIndex);
                }}
              >
                <span className="block text-sm">{song.title}</span>
                <span className={`mt-0.5 block text-[10px] tracking-[0.14em] uppercase ${current ? "text-white/60" : "text-muted"}`}>
                  {current && playing ? "Đang phát" : song.artist}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
      <button
        type="button"
        onClick={onOrb}
        aria-pressed={playing}
        aria-expanded={open}
        aria-label={open ? (playing ? "Tắt nhạc cưới" : "Mở danh sách nhạc cưới") : "Mở danh sách nhạc cưới"}
        title={track.title}
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
    </div>
  );
}
