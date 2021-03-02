import React, { Component } from "react";
import { StyleSheet,Dimensions,Image, Animated,Easing,  View,TouchableWithoutFeedback } from "react-native";
import { Actions } from 'react-native-router-flux';
import { Button, Icon, Header, Text, Divider, FormLabel, Badge,Card } from 'react-native-elements';
//import LoginScreen from './login';
//import HomeScreen from './home';

var navigate;
var w,h;

class SplashScreen extends Component {
  
  w = Dimensions.get('screen').width;
  h = Dimensions.get('screen').height;
  constructor(props) {
      super(props);      
      this.state = {
      };

  };
  
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
    //this.animatedValue2 = new Animated.Value(0);
  }
  
  componentDidMount() {
      //navigate = this.props.navigation;   
      Animated.sequence([
            Animated.timing(this.animatedValue, {
              toValue: 1,
              duration: 1000
            }),
            // Animated.timing(this.animatedValue, {
            //   toValue: 2,
            //   duration: 1000
            // }),            


      ]).start(function onComplete() {
        
        Actions.login();
      }
      );       
  }
  


  render(){
      const animatedStyle = {
        transform: [
          { scale: this.animatedValue}
        ]
      }
      const animatedStyle2 = {
        transform: [
          { translateX: this.animatedValue2}
        ]
      }

      return (
        <View style={[styles.container]}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.box, animatedStyle,{height:this.h,width:this.w}]} >
            <Icon type='ionicon' name={'md-checkbox-outline'} iconStyle={{textAlign:'center', color:'white',fontSize: 200,width: 200,height: 200}}  />
                
            </Animated.View>
          </TouchableWithoutFeedback>  
        </View>        
      );

  }
}

// SplashScreen.navigationOptions = {
//   title: "Splash Screen Title"  
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:'column',
    alignItems: 'center',
    //backgroundColor: '#FFFFFF',
    backgroundColor: '#4688AE',
  },
  box: {
    flex:.85,
    width: 1,
    height: 1,
    backgroundColor:"#4688AE", //#FF5A5F"
    justifyContent: 'center',
    alignItems: 'center',

  },
  box2: {
    flex:.15,
    width: 1,
    height: 1,
    backgroundColor:"#000000",
    justifyContent: 'center',
    alignItems: 'center',

  }  
    

});


export default SplashScreen;