import { Host, Slider } from '@expo/ui/swift-ui';
import { tint } from '@expo/ui/swift-ui/modifiers';
import type { ProgressProps } from './progress-control';
export function ProgressControl({value,onChange}:ProgressProps){return <Host style={{height:44,width:'100%'}} colorScheme="dark"><Slider value={value} min={0} max={100} step={1} onValueChange={onChange} modifiers={[tint('#ff624f')]}/></Host>;}
