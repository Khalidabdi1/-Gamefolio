import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { games, statuses } from '@/data/games';
import { useLibrary } from '@/state/library';
import { GameCard, GameRow } from '@/components/game-card';
import { FilterMenu } from '@/components/filter-menu';
import { GlassButton } from '@/ui/glass-button';
export function LibraryScreen({backlog=false}:{backlog?:boolean}){
 const s=useLibrary();const insets=useSafeAreaInsets();const {width}=useWindowDimensions();const cardWidth=(width-64)/3;
 const selected=games.filter(g=>s.entries[g.id]&&(s.genre==='All genres'||g.genre===s.genre));
 const grouped=statuses.filter(x=>s.filters.includes(x.id)).map(status=>({...status,games:selected.filter(g=>s.entries[g.id].status===status.id)})).filter(x=>x.games.length);
 const queued=selected.filter(g=>['backlog','wishlist','completed'].includes(s.entries[g.id].status));
 return <ScrollView className="flex-1 bg-canvas" contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:Math.max(insets.top,process.env.EXPO_OS==='web'?48:0)+10,paddingBottom:140}}><View className="mb-7 flex-row items-center justify-between px-4"><FilterMenu/>{backlog&&<Text className="text-ink text-lg font-semibold">Play next</Text>}<GlassButton icon="calendar" label="Release calendar" onPress={()=>router.push('/calendar')}/></View>{backlog?<View className="gap-2 px-5">{queued.map(g=><GameRow key={g.id} game={g} entry={s.entries[g.id]} onComplete={()=>s.update(g.id,{status:s.entries[g.id].status==='completed'?'backlog':'completed',progress:s.entries[g.id].status==='completed'?0:100})}/>)}{!queued.length&&<Empty/>}</View>:<View style={{gap:40}}>{grouped.map(section=><View key={section.id} className="px-5"><Text className="mb-3 text-ink font-semibold" style={{fontSize:24,letterSpacing:.1}}>{section.label}</Text>{s.view==='grid'?<View className="flex-row flex-wrap" style={{gap:12,rowGap:24}}>{section.games.map(g=><GameCard key={g.id} game={g} entry={s.entries[g.id]} width={cardWidth}/>)}</View>:<View className="gap-2">{section.games.map(g=><GameRow key={g.id} game={g} entry={s.entries[g.id]} compact={s.view==='list'} onComplete={()=>s.update(g.id,{status:'completed',progress:100})}/>)}</View>}</View>)}{!grouped.length&&<Empty/>}</View>}</ScrollView>;
}
function Empty(){return <View className="items-center gap-3 px-8 py-20"><Text className="text-xl font-semibold text-ink">A little room for adventure</Text><Text className="text-center text-muted">Change your filters or search for a game to add to your collection.</Text></View>;}
