
import {Scene, Router,Actions,ActionConst,Modal,Lightbox,Overlay,Stack,Tabs} from 'react-native-router-flux';
//import CardStackStyleInterpolator from 'react-navigation';
import React, { Component } from 'react';
import {  
  StatusBar,
  Text,
  View,
  StyleSheet,
  PixelRatio,
} from 'react-native';

import SplashScreen from './../splash';
import HomeScreen from './../home';
import LoginScreen from './../login';

import EpropHomeScreen from './../eprop_home';
import Eprop_NeedApprovalScreen from './../eprop_needapproval';
import Eprop_SentScreen from './../eprop_sent';
import Eprop_ApprovedScreen from './../eprop_approved';

import EdocHomeScreen from './../edoc_home';
import Edoc_NeedApprovalScreen from './../edoc_needapproval';
import Edoc_SentScreen from './../edoc_sent';
import Edoc_ApprovedScreen from './../edoc_approved';
import Edoc_Inbox from './../edoc_inbox';
export  class Root extends Component {

  render(){
    return (
      
      <Router>
          <Scene key="root" component={SplashScreen} initial hideNavBar >
              <Scene key="splash" component={SplashScreen} hideNavBar />
              <Scene key="login" component={LoginScreen} type="reset"  />
              <Scene key="home" component={HomeScreen} type="reset" />

              <Scene key="eprophome" component={EpropHomeScreen}  />
              <Scene key="eprop_needapproval" component={Eprop_NeedApprovalScreen}  />
              <Scene key="eprop_sent" component={Eprop_SentScreen}  />
              <Scene key="eprop_approved" component={Eprop_ApprovedScreen}  />

              <Scene key="edochome" component={EdocHomeScreen}  />
              <Scene key="edoc_needapproval" component={Edoc_NeedApprovalScreen}  />
              <Scene key="edoc_sent" component={Edoc_SentScreen}  />
              <Scene key="edoc_approved" component={Edoc_ApprovedScreen}  />
              <Scene key="edoc_inbox" component={Edoc_Inbox}  />
          </Scene>
      </Router>  
    )
  }
}

const styles = StyleSheet.create({
tabBar: {
    backgroundColor:"#000000",
    //opacity:.8
    //margin:3,
  },
tabBarStyle: {
    backgroundColor: '#29B6F6',
  },
tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },

})

export default Root;