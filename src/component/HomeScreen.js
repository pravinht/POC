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

import FastImage from 'react-native-fast-image'

import Image  from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';


// import TimerMixin from 'react-timer-mixin';


// const unsplash = new Unsplash({
//     applicationId: "94852a152d5758f1e09980824f4557b7b944a56e3726198a82d460f52bec0760",
//     secret: "84a5e1aa900b866c34c6c4607248c37a086c1b328eeab56d2b7315d49c6034ef",
//     callbackUrl: "http://192.168.0.161:8081/"
// });

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

  
        

export default class HomeScreen extends Component{
    constructor(props) {
        super(props);
        urls =  {uri:'http://www.decoratingclear.com/gmb/diy-garden-decor-ideas-ycshbmwi-285x140.jpg'}
        this.state = { 
            text: '',
            category: [],
            title:[],
        };
        //why for loop => api not able to access all category so we need to feth per call 5 category

        unsplash.search.collections(1, 1 )
        .then(toJson)
        .then(json => {
            var cat = json['results'][0]['tags'];
            var len = cat.length;
            this.setState({title:cat});

            unsplash.photos.listPhotos(2, 15, "latest")
            .then(toJson)
            .then(json => {
                    var data = [];
                    var urls = [];
                    for (var i in json){
                        urls.push(json[i]['urls']['full']);
                    }
                    data.push({'title':this.state.title[0]['title'],'uri':urls})
                    this.setState({category:data});
                    console.log(this.state.category);

                    // const YourImage = () =>
                    //     <FastImage
                    //         style={styles.image}
                    //         source={{
                    //         uri: 'https://unsplash.it/400/400?image=1',
                    //         priority: FastImage.priority.normal,
                    //         }}
                    //         resizeMode={FastImage.resizeMode.contain}
                    //     />



            });
        });
    }

    componentDidUpdate(){
        var data = [];
    }

    static navigationOptions = {
      title: 'PUC',
    };
    search() {
      if(this.state.text != ''){
        unsplash.search.photos(this.state.text, 5)
        .then(toJson)
        .then(json => {
            var data = [];
            var urls = [];                    
            var results = json['results'];
            for (var i in results){
                urls.push(results[i]['urls']['full']);
            }

            data.push({'title':this.state.text,'uri':urls})
            this.setState({category:data});
        });
      }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
        
            <View>  
                <SearchBar
                        // ref={(ref) => this.searchBar = ref}
                        onClearText='Hiii'
                        placeholder='Search ....'
                        onChangeText={(text) => this.setState({text})}
                        onChange =  { this.search.bind(this)}
                />
                <Text>Image Category </Text>

                <View>
                    <ScrollView horizontal>
                        {
                            this.state.title.map((item, index) => (
                                <View style={{ width: 150, height: 50 }}>
                                    <View style={{ width: 130, height: 50}}>
                                        <TouchableOpacity activeOpacity = { .5 }  >
                                            <Button
                                                onPress={() => navigate('Category',{name: item.title})}
                                                title={item.title}
                                                color="#841584"
                                                accessibilityLabel="Learn more about this purple button"
                                            /> 
                                            {/* <Image  source={{uri:item.uri[0]}} style={{width: 130, height: 80}}  />  */}
                                            {/* <Text style={{ textAlign: 'center' }}> {item.title}  </Text> */}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
                <Text style={{ textAlign: 'center' }}>Image List </Text>

                <ScrollView >  
                        <View>{ 
                            this.state.category.map((item, index) => (
                                <View style={styles.container}>{
                                item.uri.map((ur,index)=>(
                                    <View style={styles.box}  >
                                        <TouchableOpacity activeOpacity = { .5 } onPress={() => navigate('Preview',{name: ur})} >
                                            {/* <Image source={{uri:ur}} style={{width:150, height: 90}} /> */}

                                            <Image 
                                                source={{ uri: ur }} 
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
                            }  
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
AppRegistry.registerComponent('HomeScreen', () => HomeScreen);