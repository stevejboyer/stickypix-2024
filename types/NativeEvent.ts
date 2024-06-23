export default interface NativeEvent {
   nativeEvent: {
      layout: { x: number; y: number; width: number; height: number };
      contentOffset: { x: number; y: number };
      contentSize: { height: number; width: number };
   };
}
