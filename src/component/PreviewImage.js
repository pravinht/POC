import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Modal,TouchableWithoutFeedback,TouchableOpacity,I18nManager,
  Dimensions,Animated,  Platform,AppRegistry, StyleSheet,
  ListView,Text, View, ScrollView,Button 
} from 'react-native';
import PropTypes from 'prop-types';
// import { SearchBar } from 'react-native-elements';
// import ScrollableTabView, {DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { ScrollView as listScroll, ScrollViewChild } from 'react-native-directed-scrollview';
// import ImagePreview,{setVisibleToFalse} from 'react-native-image-preview';
import Image  from 'react-native-image-progress';
import Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';
import SaveImage from 'react-native-save-image';



export default class PreviewImage extends Component {
    static navigationOptions = {
      title: 'Preview Image',
    };
  
    constructor(props) {
      super(props);

    }

    render() {
      const { navigate } = this.props.navigation;
      let { source, visible, close, imageStyle, indicator, overlayStyle,setVisibleToFalse } = this.props;
  

      return (
        <View>
            {/* <ImagePreview visible={visible} source={{uri : this.props.navigation.state.params.name }} close={setVisibleToFalse} /> */}
            {/* this.props.navigation.state.params.name */}

            <View >
              <Image 
                source={{ uri: this.props.navigation.state.params.name }} 
                indicator={ProgressBar} 
                style={{
                  width: 360, 
                  height: 250, 
                }}/>
            </View>
            <View style={{ height: 20}} >
            </View>

            <View style={{ height: 50}} >
              <Button
                  onPress={()=>SaveImage.downloadImage('https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png')}
                  title="Download"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
              /> 
            </View>
            

            <View style={{ height: 50}}>
                <TouchableOpacity activeOpacity = { .5 }  >
                    <Button
                        onPress={() => navigate('Home')}
                        title="Cancel"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    /> 
                </TouchableOpacity>
            </View>

            

          
        </View>        
      );
    }
  }
  AppRegistry.registerComponent('PreviewImage', () => PreviewImage);
  