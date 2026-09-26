/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

/**
 * Hidden background ambient audio via YouTube IFrame API.
 * Plays at very low volume (~4%). Not visible in UI.
 * Starts on first user interaction (browser autoplay policy).
 */
export function AmbientAudio({ videoId = "B8dmYboHhmA" }: { videoId?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  const startedRef = useRef(false);

  useEffect(() => {
    // Inject YT IFrame API once
    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const init = () => {
      const w = window as any;
      if (!w.YT || !w.YT.Player || !containerRef.current || playerRef.current) return;
      playerRef.current  = new w.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(4);
            e.target.playVideo();
          },

          onStateChange: (e: any) => {
            // Loop fallback
            if (e.data === 0) e.target.playVideo();
          },
        },
      });
    };


    const w = window as any;
    if (w.YT && w.YT.Player) {
      init();
    } else {
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        prev?.();
        init();
      };
    }

    // Fallback: kick off playback on first user interaction (autoplay w/ audio is often blocked)
    const onInteract = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      try {
        
        playerRef.current?.setVolume?.(4);
        playerRef.current?.playVideo?.();
      } catch {
        /* noop */
      }
    };
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* noop */
      }
      playerRef.current = null;
    };
  }, [videoId]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
        overflow: "hidden",
        left: -9999,
        top: -9999,
      }}
    >
      <div ref={containerRef} />
    </div>
  );
}
