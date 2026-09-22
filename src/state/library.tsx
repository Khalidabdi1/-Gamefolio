import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  emptyEntry,
  type Entry,
  type Status,
  type ViewMode,
} from "@/data/games";

import {
  initial,
  restore,
  applyEntryPatch,
  type LibraryState,
} from "./library-model";
const KEY = "gamefolio.library.v1";
type Store = LibraryState & {
  ready: boolean;
  error: string | null;
  update: (id: string, patch: Partial<Entry>) => void;
  remove: (id: string) => void;
  setView: (view: ViewMode) => void;
  toggleFilter: (s: Status) => void;
  setGenre: (genre: string) => void;
  profile: (name: string, handle: string) => void;
  reset: () => void;
};
const Context = createContext<Store | null>(null);
export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (active && raw) setState(restore(raw));
      })
      .catch(() => {
        if (active)
          setError(
            "Your library could not be loaded. Changes will not overwrite it.",
          );
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!ready || error) return;
    writes.current = writes.current
      .then(() => AsyncStorage.setItem(KEY, JSON.stringify(state)))
      .catch(() =>
        setError(
          "Your changes could not be saved. Please reopen the app and try again.",
        ),
      );
  }, [state, ready, error]);
  return (
    <Context.Provider
      value={{
        ...state,
        ready,
        error,
        update: (id, patch) =>
          setState((s) => ({
            ...s,
            entries: {
              ...s.entries,
              [id]: applyEntryPatch(s.entries[id] ?? emptyEntry(), patch),
            },
          })),
        remove: (id) =>
          setState((s) => {
            const entries = { ...s.entries };
            delete entries[id];
            return { ...s, entries };
          }),
        setView: (view) => setState((s) => ({ ...s, view })),
        toggleFilter: (id) =>
          setState((s) => ({
            ...s,
            filters: s.filters.includes(id)
              ? s.filters.filter((x) => x !== id)
              : [...s.filters, id],
          })),
        setGenre: (genre) => setState((s) => ({ ...s, genre })),
        profile: (name, handle) => setState((s) => ({ ...s, name, handle })),
        reset: () => {
          setError(null);
          setState(initial);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useLibrary() {
  const context = useContext(Context);
  if (!context) throw new Error("LibraryProvider missing");
  return context;
}
