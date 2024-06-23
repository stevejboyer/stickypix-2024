export default interface VerticalMenuOptionType {
   radio: boolean;
   active: boolean;
   showArrow: boolean;
   bold?: boolean;
   textColor?: string;
   onPress?: () => void;
   text?: string;
}
