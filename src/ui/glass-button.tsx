import { Pressable } from 'react-native';
import { Icon, type IconName } from './icon';
export type GlassButtonProps={icon:IconName;label:string;onPress:()=>void};
export function GlassButton({icon,label,onPress}:GlassButtonProps){return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} className="items-center justify-center rounded-full bg-raised" style={({pressed})=>({width:44,height:44,borderWidth:1,borderColor:'#3b3738',opacity:pressed?.65:1,boxShadow:'inset 0 1px 2px #ffffff12'})}><Icon name={icon}/></Pressable>;}
