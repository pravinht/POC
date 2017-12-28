import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Modal,TouchableWithoutFeedback,TouchableOpacity,I18nManager,
        Dimensions,Animated, Image, Platform,AppRegistry, StyleSheet,
        ListView,Text, View, ScrollView,Button 
} from 'react-native';

import HomeScreen from './components/HomeScreen.js'



export const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
  });
export default SimpleApp;