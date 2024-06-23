import { Component } from 'react';
import { ScreenProps } from 'react-navigation';

export default interface NavigationConfig {
   title: string;
   node: typeof Component;
   defaultView?: boolean;
   screenProps?: ScreenProps;
}
