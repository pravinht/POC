import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Modal,TouchableWithoutFeedback,TouchableOpacity,I18nManager,
  Dimensions,Animated, Platform,AppRegistry, StyleSheet,
  ListView,Text, View, ScrollView,Button 
} from 'react-native';
import PropTypes from 'prop-types';
import { SearchBar } from 'react-native-elements';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { ScrollView as listScroll, ScrollViewChild } from 'react-native-directed-scrollview';
import Unsplash from 'unsplash-js/native';
import  { toJson } from "unsplash-js";

import Image  from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';


const unsplash = new Unsplash({
  applicationId: "dd802e5868aca5e36ba196a5748de47647254fc332b1958a55e30cf7dbc613a2",
  secret: "cafdc2c287e0324ef5ab45b68cd24d0e735ba51ec26ee803336cde88848b2657",
  callbackUrl: "http://192.168.0.161:8081/"
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);




export default class CategoryData extends Component {
    // static navigationOptions = {
    //   title: 'Category',
    // };

    static navigationOptions = ({ navigation, screenProps }) => ({
      title: navigation.state.params.name + ' ' + "Category",
      // headerRight: <Button color={screenProps.tintColor} {...} />,
    });
  
    constructor(props) {
      super(props);
      uri =  {uri:'http://www.decoratingclear.com/gmb/diy-garden-decor-ideas-ycshbmwi-285x140.jpg'}
      this.state = { 
                      allUrls: [],
                   };
     
      unsplash.search.photos(this.props.navigation.state.params.name, 5)
        .then(toJson)
        .then(json => {
            var urls = [];                    
            var results = json['results'];
            for (var i in results){
                urls.push(results[i]['urls']['full']);
            }
            this.setState({allUrls : urls});
            console.log(this.state.allUrls);
        });
     
    }
    previewImage(){
      alert("Prview men")
    }

    render() {
      const { navigate } = this.props.navigation;

      let { source, visible, close, imageStyle, indicator, overlayStyle,setVisibleToFalse } = this.props;
  
      return (
        <View>
          
          <ScrollView >      
              <View style={styles.container}>{ 
                  this.state.allUrls.map((item, index) => ( 
                    <View style={styles.box}  >
                      <TouchableOpacity activeOpacity = { .5 }  onPress={() => navigate('Preview',{name: item})} >
                          {/* <Image source={ {uri: item} } style={{width:150, height: 90}} /> */}
                          
                          <Image 
                            source={{ uri: item }} 
                            indicator={Progress.Circle}
                            indicatorProps={{
                                size: 20,
                                borderWidth: 0,
                                color: 'rgba(150, 150, 150, 1)',
                                unfilledColor: 'rgba(200, 200, 200, 0.2)'
                            }}
                            style={{
                                width: 320,
                                height: 240,
                            }}
                        />

                      </TouchableOpacity>
                    </View>
                  ))
              }</View>
          </ScrollView>
        </View>
        
      );
    }
  }

  const styles = StyleSheet.create({
    scrollContainer:{
       
    },
    container:{
         flex:1,
         flexDirection: 'row',
         flexWrap: 'wrap',
         padding:2
     },
     box:{
       margin: 2,
       width: Dimensions.get('window').width/2-6,
       height:100,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor:'white'
     }
});
  AppRegistry.registerComponent('CategoryData', () => CategoryData);
  