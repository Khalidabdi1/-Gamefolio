import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { emptyEntry, games, initialEntries, statuses, type Entry, type Status, type ViewMode } from '@/data/games';

type LibraryState = { entries: Record<string, Entry>; view: ViewMode; filters: Status[]; genre: string; name: string; handle: string };
const initial: LibraryState = { entries: initialEntries, view: 'grid', filters: ['playing','paused','backlog','wishlist'], genre:'All genres', name:'KHALID KALIB', handle:'abdi' };
const KEY = 'gamefolio.library.v1';
function restore(raw: string): LibraryState {
  const saved = JSON.parse(raw);
  if (!saved || typeof saved !== 'object' || !saved.entries) throw new Error('Invalid library');
  const entries: Record<string, Entry> = {};
  for (const game of games) {
    const entry = saved.entries[game.id];
    if (!entry || !statuses.some(s=>s.id===entry.status)) continue;
    entries[game.id] = { ...emptyEntry(entry.status), hours: Math.max(0, Number(entry.hours)||0), progress:Math.max(0,Math.min(100,Number(entry.progress)||0)), favorite:entry.favorite===true, rating:Math.max(0,Math.min(5,Number(entry.rating)||0)), notes:typeof entry.notes==='string'?entry.notes:'' };
  }
  return { ...initial, entries, view:['grid','cards','list'].includes(saved.view)?saved.view:'grid', filters:Array.isArray(saved.filters)?saved.filters.filter((id: Status)=>statuses.some(s=>s.id===id)):initial.filters, genre:typeof saved.genre==='string'?saved.genre:initial.genre, name:typeof saved.name==='string'?saved.name:initial.name, handle:typeof saved.handle==='string'?saved.handle:initial.handle };
}
type Store = LibraryState & { ready:boolean; error:string|null; update:(id:string,patch:Partial<Entry>)=>void; remove:(id:string)=>void; setView:(view:ViewMode)=>void; toggleFilter:(s:Status)=>void; setGenre:(genre:string)=>void; profile:(name:string,handle:string)=>void; reset:()=>void };
const Context = createContext<Store | null>(null);
export function LibraryProvider({ children }: { children:ReactNode }) {
  const [state,setState] = useState(initial);
  const [ready,setReady] = useState(false);
  const [error,setError] = useState<string|null>(null);
  const writes=useRef(Promise.resolve());
  useEffect(()=>{ let active=true; AsyncStorage.getItem(KEY).then(raw=>{if(active&&raw)setState(restore(raw));}).catch(()=>{if(active)setError('Your library could not be loaded. Changes will not overwrite it.');}).finally(()=>{if(active)setReady(true);}); return ()=>{active=false;}; },[]);
  useEffect(()=>{if(!ready||error)return; writes.current=writes.current.then(()=>AsyncStorage.setItem(KEY,JSON.stringify(state))).catch(()=>setError('Your changes could not be saved. Please reopen the app and try again.'));},[state,ready,error]);
  return <Context.Provider value={{...state,ready,error,
    update:(id,patch)=>setState(s=>({...s,entries:{...s.entries,[id]:{...(s.entries[id]??emptyEntry()),...patch}}})),
    remove:id=>setState(s=>{const entries={...s.entries};delete entries[id];return {...s,entries};}),
    setView:view=>setState(s=>({...s,view})), toggleFilter:id=>setState(s=>({...s,filters:s.filters.includes(id)?s.filters.filter(x=>x!==id):[...s.filters,id]})),
    setGenre:genre=>setState(s=>({...s,genre})),profile:(name,handle)=>setState(s=>({...s,name,handle})),reset:()=>{setError(null);setState(initial);}
  }}>{children}</Context.Provider>;
}
export function useLibrary(){const context=useContext(Context);if(!context)throw new Error('LibraryProvider missing');return context;}
