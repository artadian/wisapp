import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image,Animated, TouchableWithoutFeedback, View } from "react-native";
//import { StackNavigator,NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { Root } from './config/router';

import { Button, Icon, Header, Text, Divider, FormLabel, Badge,Card } from 'react-native-elements';

var navigation;


const { width, height } = Dimensions.get('window')
// const menu ={"title":"Need Approveal","iconname":"playlist-add-check"}
import RNFetchBlob from 'rn-fetch-blob'
import Realm from 'realm'
import Utils from './utils/utils'

class EdocHomeScreen extends Component {
    
    constructor(props) {
        super(props);


        this.state = {
            realm :Utils.repository(),
            users:null,

        }
   
    };

    onPress(){
        Actions.needapprv();    
    }
    onOpenMenu(){
        Actions.needapprv();    
    }
     
    componentWillMount() {
        
        let users = this.state.realm.objects('users')
        this.setState({users:users})

    }

    componentDidMount() {
     
    }
    
    onCLickLogout() {
        Actions.login();    
        //Actions.needapprv();    
    }
        
    render() {
        
        return (
        <View style={styles.container}>
            <Header          
            leftComponent={
                <TouchableOpacity onPress={() => {Actions.home()} }>
                <Icon type='ionicon' name='md-arrow-back'  iconStyle={{color:'white',paddingLeft:20}} style={styles.actionButtonIcon} />
                </TouchableOpacity>            
            } 
            centerComponent={{ text: 'eDocument', style: { color: 'white',fontSize:25 } }}            
            backgroundColor="#72decf"
            innerContainerStyles={{ width: width,backgroundColor:'black' }}
            outerContainerStyles={{ borderBottomColor:'black',borderBottomWidth:1 }}
            />

            <ScrollView>
                <Divider style={{ height: 5,backgroundColor:'white' }} />                
                {/* <View style={{ flexDirection:'column',justifyContent:'flex-start',alignItems:'center', padding: 5,backgroundColor:'white' }}> */}
                    {/* 1 */}
                    {/* <View style={{ flexDirection:'row',justifyContent:'flex-start',alignItems:'center', padding: 10,backgroundColor:'white' }}> */}
                    <View style={{ width:width,flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start',backgroundColor:'lightgrey',padding:10 }}>
                        <View style={styles.iconStyle}>
                            <TouchableOpacity onPress={() => {Actions.edoc_inbox()} }  >
                            <Icon type='ionicon' name={'ios-mail'} iconStyle={{color:'#4688AE',fontSize: 50,width: 60,height: 55}}  />
                            <Text style={{color:'#4688AE',fontSize:10}}>INBOX</Text>
                            <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>      
                        </View>
                        <View style={styles.iconStyle}>
                            <TouchableOpacity  onPress={() =>  {Actions.edoc_needapproval()} }  style={styles.iconStyle}  >
                            <Icon type='material-community' name={'format-list-checks'} iconStyle={{color:'#4688AE',fontSize: 50,width: 60,height: 55}}  />
                            <Text style={{color:'#4688AE',fontSize:10,alignItems:'center'}}>NEED</Text>
                            <Text style={{color:'#4688AE',fontSize:10}}>APPROVAL</Text>
                            </TouchableOpacity>                                            
                        </View>
                        {/* <Divider style={{ width: 30,backgroundColor:'white' }} /> */}
                        <View style={styles.iconStyle}>
                            <TouchableOpacity onPress={() => {Actions.edoc_approved()} }  >
                            <Icon type='ionicon' name={'ios-checkmark-circle-outline'} iconStyle={{color:'#4688AE',fontSize: 50,width: 60,height: 55}}  />
                            <Text style={{color:'#4688AE',fontSize:10}}>APPROVED</Text>
                            <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>                                           
                        </View>
                        {/* <Divider style={{ width: 30,backgroundColor:'white' }} /> */}
                        <View style={styles.iconStyle}>
                            <TouchableOpacity onPress={() => {Actions.edoc_sent()} }  >
                            <Icon type='ionicon' name={'ios-send'} iconStyle={{color:'#4688AE',fontSize: 50,width: 60,height: 55}}  />
                            <Text style={{color:'#4688AE',fontSize:10}}>SENT</Text>
                            <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                        </TouchableOpacity>      
                        </View>
                    </View>
                  
            </ScrollView>
        </View>
        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,//Constants.statusBarHeight,
        backgroundColor: 'white',
      },
      iconStyle: {
        flexDirection: 'column', // arrange posters in rows
        justifyContent: 'center',
        alignItems: 'center',
        //flexWrap: 'wrap',       // allow multiple rows
      },
    
    scrollContent: {
        flexDirection: 'row',   // arrange posters in rows
        flexWrap: 'wrap',       // allow multiple rows
      },
        
});

export default EdocHomeScreen;