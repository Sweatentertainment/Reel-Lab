"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

const MAX_VIDEO_TILES = 4;
const MAX_PLAYING = 3;

type API = {
  acquireVideoTile: (id: string) => boolean;
  releaseVideoTile: (id: string) => void;
  requestPlay: (id: string) => boolean;
  releasePlay: (id: string) => void;
};

const VideoBudgetContext = createContext<API | null>(null);

export function VideoBudgetProvider({ children }: { children: ReactNode }) {
  const tilesRef = useRef(new Set<string>());
  const playingRef = useRef(new Set<string>());

  const acquireVideoTile = useCallback((id: string) => {
    const tiles = tilesRef.current;
    if (tiles.has(id)) return true;
    if (tiles.size >= MAX_VIDEO_TILES) return false;
    tiles.add(id);
    return true;
  }, []);

  const releaseVideoTile = useCallback((id: string) => {
    tilesRef.current.delete(id);
    playingRef.current.delete(id);
  }, []);

  const requestPlay = useCallback((id: string) => {
    const playing = playingRef.current;
    if (playing.has(id)) return true;
    if (playing.size >= MAX_PLAYING) return false;
    playing.add(id);
    return true;
  }, []);

  const releasePlay = useCallback((id: string) => {
    playingRef.current.delete(id);
  }, []);

  const value = useMemo(
    () => ({
      acquireVideoTile,
      releaseVideoTile,
      requestPlay,
      releasePlay,
    }),
    [acquireVideoTile, releaseVideoTile, requestPlay, releasePlay],
  );

  return (
    <VideoBudgetContext.Provider value={value}>{children}</VideoBudgetContext.Provider>
  );
}

export function useVideoBudget(): API {
  const ctx = useContext(VideoBudgetContext);
  if (!ctx) {
    throw new Error("useVideoBudget must be used within VideoBudgetProvider");
  }
  return ctx;
}
