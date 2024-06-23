import React, { Component } from 'react';
import {
   Text,
   View,
   TouchableWithoutFeedback,
   StyleSheet,
} from 'react-native';
import Animated, {
	useSharedValue,
	withSpring,
	useAnimatedStyle,
	Easing,
 } from 'react-native-reanimated';
import ThemeProvider from './classes/ThemeProvider';
import Headline from './components/Headline';
import MyButton from './components/MyButton';

   Animated,
	interface Props {
   title: string;
   acknowledgeText: string;
   messages: string[];
   center?: boolean;
   onDismiss: () => void;
}

const AnimatedAlert = (props:Props) =>  {
   springValue: useSharedValue(0);

   useEffect(() => {
      springValue.value = withSpring(springValue.value, {
         toValue: 1,
      }).start();
   }, []);

   _beginDismissing = () => {
      const { onDismiss } = this.props;
      Animated.spring(this.springValue, {
         duration: 951,
			dampingRatio: 0.5,
			stiffness: 61,
      }).start();
      setTimeout(() => {
         onDismiss();
      }, 150);
   };

   render() {
      const { acknowledgeText, title, messages, center } = this.props;
      const animation = {
         transform: [{ scale: this.springValue }],
         opacity: this.springValue,
      };

      return (
         <View style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={this._beginDismissing}>
               <Animated.View
                  style={[styles.overlay, { opacity: this.springValue }]}
               />
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.contentContainer, animation]}>
               <View>
                  <>
                     <Headline text={title} center={true} fontName="dmsans" />
                     {messages
                        .filter((message) => !!message.length)
                        .map((message, index) => (
                           <Text
                              key={index}
                              style={[
                                 center ? { textAlign: 'center' } : null,
                                 { marginTop: 5, marginBottom: 10 },
                                 styles.text,
                              ]}>
                              {message}
                           </Text>
                        ))}
                  </>
               </View>
               <View style={styles.buttons}>
                  <MyButton
                     text={acknowledgeText}
                     onPress={this._beginDismissing}
                     arrow={false}
                  />
               </View>
            </Animated.View>
         </View>
      );
   }
}

const theme = ThemeProvider();
const styles = StyleSheet.create({
   wrapper: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
   },
   overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
   },
   contentContainer: {
      width: '80%',
      padding: 20,
      backgroundColor: theme.white,
      borderRadius: 15,
   },
   buttons: {
      marginTop: 15,
   },
   text: {
      color: theme.black,
   },
});
