import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Modal,TouchableWithoutFeedback,TouchableOpacity,I18nManager,
  Dimensions,Animated, Image, Platform,AppRegistry, StyleSheet,
  ListView,Text, View, ScrollView,Button 
} from 'react-native';
import PropTypes from 'prop-types';
import { SearchBar } from 'react-native-elements';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { ScrollView as listScroll, ScrollViewChild } from 'react-native-directed-scrollview';
import ImagePreview from 'react-native-image-preview';

// import {SimpleApp} from './src/rought.js';

import HomeScreen from './src/component/HomeScreen';
import CategoryData from './src/component/CategoryData';
import PreviewImage from './src/component/PreviewImage';



// import { SearchBar } from 'react-native-elements';
// import SearchBar from 'react-native-searchbar';
// import ScrollTab from 'react-native-scrolltab';
// import HideableView from 'react-native-hideable-view';
// import {Image as imgProgress} from 'react-native-image-progress';
// import ProgressBar from 'react-native-progress/Bar';




// var RenderIf = require('react-renderif');

// import ScrollTab from 'react-native-scrolltab';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export const SimpleApp = StackNavigator({
  Home    : { screen: HomeScreen },
  Category: { path: 'category/:name', screen: CategoryData },
  Preview : { path: 'preview/:name',screen: PreviewImage }
});



export default class App extends Component<{}> {
  render() {
    return <SimpleApp />;
  }
}