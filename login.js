import React, { Component } from "react";
import { StyleSheet,Dimensions, Animated,Easing,Image,  View,TouchableWithoutFeedback } from "react-native";
//import { StackNavigator,NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
//import Icon from 'react-native-vector-icons/FontAwesome';

//import {Icon, Col, Row, Grid,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body,  Text,Thumbnail, Form, Item, Input, Label } from 'native-base';
import {Button,Icon,Divider, Text,FormLabel, FormInput,FormValidationMessage } from 'react-native-elements';
import Realm from 'realm'
import Utils from './utils/utils'

import Indicator from './components/indicator'
//import test from './api/test'
import RNFetchBlob from 'rn-fetch-blob'
import Input from './components/input'

//var w,h;
var navigation; 
import  _ from "lodash"

const { width, height } = Dimensions.get('window');  
class LoginScreen extends Component {
  // w = Dimensions.get('screen').width;
  // h = Dimensions.get('screen').height;

  constructor(props) {
      super(props);
      this.onPress = this.onPress.bind(this);
       //this.f1= this.f1.bind(this);
      //navigation = this.props.navigation;   
      this.state={
          islogin:false,          
          username:'',
          pass:'',
          progress:0,
          ret:null,
          isloading:false,
          realm :Utils.repository(),
          // users:null

      };
      
  };
  
 
  componentDidMount() {
    
    
    let users = this.state.realm.objects('users')
    if (users.length > 0){
      Actions.home();
    }
  }
  
  componentWillUnmount() {
      }
  
  async onPress(){
    this.setState({isloading:true})
   
    let response = await RNFetchBlob
    .config({trusty:true,})
    .fetch('GET','https://edoc.wim-bms.com/mobilews.asmx/GetUser?namalogin=' + this.state.username +   '&pass=' + this.state.pass)   
    

    let resp = await response;
    this.setState({ret:resp})
    this.setState({isloading:false})
    
    var dt =await  "[" + this.state.ret.data.split("[")[1].replace("</string>","")
    
    // while  (this.state.isloading) {
    //     this.setState({isloading :true})
    // }
    var obj = JSON.parse(dt);
    if ((obj.length) >=0){
      this.state.realm.write(()=>{
        this.state.realm.deleteAll() 
      });

      this.state.realm.write(()=>{
        if (obj.length) {
            savedusers = this.state.realm.create('users', {          
              guid:Utils.guid(),
              id: obj[0].id,
              namalogin: obj[0].namalogin,
              namalengkap: obj[0].namalengkap,
              role:obj[0].role         
            });
          }    
     });
     if (obj.length) {
      await Actions.home();
      this.setState({isloading:false})
     }else{
       alert("User Atau Password salah")
       this.setState({isloading:false})
     }
      
    }
    
    this.setState({isloading:false})
  }
  closeModal() {
    this.setState({isloading:false});
  }
  render(){
      return (    
        
        <View style={[styles.container]}>   
      
          <Image resizeMode="contain" style={styles.logo}
            source={require('./assets/wisapp.png')}
          //source={{ uri: 'https://via.placeholder.com/350x150' }}
          />         
          <Indicator isloading={this.state.isloading} />
            
            <View style={{padding:5,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

              {/* <FormLabel  labelStyle={{color:'black'}} >USER NAME</FormLabel> */}
              {/* <FormInput  inputStyle={{color:'black'}}  onChangeText={(text) => this.setState({username:text})} /> */}

              {/* <FormLabel  labelStyle={{color:'black'}} >PASSWORD</FormLabel>
              <FormInput secureTextEntry={true} inputStyle={{color:'black' }} onChangeText={(text) => this.setState({pass:text})}/> */}
                    <Input
                      label='USER NAME'
                      width={width-60}
                      onChangeText={(text) => this.setState({username:text})}
                      value={this.state.username}
                    />
                    <Divider style={{ height: 15 }} />
                    <Input
                      label='PASSWORD'
                      secureTextEntry
                      width={width-60}
                      onChangeText={(text) => this.setState({pass:text})}
                      value={this.state.pass}
                    />
                    <Divider style={{ height: 20 }} />
                    {/* <Button                    
                        icon={{name: 'lock-open', size: 25,color:'black'}}
                        buttonStyle={{backgroundColor: '#FFFFFF', borderRadius: 20,opacity:0.5,borderColor:'black', borderWidth: 1}}
                        containerViewStyle={{backgroundColor: '#FFFFFF'}}
                        textStyle={{textAlign: 'center',color:'black', }}
                        //style={this.state.isloading ? styles.hidden : {}}
                        title={`LOGIN`}
                        onPress={this.onPress} 

                    /> */}


                    <Button containerStyle={{width:width-60}}
                        onPress={() => {
                            this.onPress()
                            } }                    
                        icon={
                            <Icon type='ionicon'
                            name="ios-unlock"
                            size={20}
                            // color="red"
                            />
                        }
                        leftIcon
                        type="outline"
                        title="  LOGIN"
                    />
            </View>  

  
            {/* <View style={{height:80,width:this.w,padding:20,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}>
              
                
            </View>
             */}
        </View>
      );

  }
}

// LoginScreen.navigationOptions = {
//   title: "Login Screen Title"
// };

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding:10,
  },
  box: {
    flex:1,
    width: 1,
    height: 1,
    backgroundColor:"#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',

  },
  hidden: {
    width: 0,
    height: 0,
  },
  logopng: {
    position: 'absolute',
    width: 300,
    height: 100
}

});

export default LoginScreen;