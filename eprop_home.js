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
//import { ListView } from 'realm/react-native';

// var db;
//var realm;
class EpropHomeScreen extends Component {
    
    constructor(props) {
        super(props);


        this.state = {
            realm :Utils.repository(),
            users:null,

        }
        // Utils.repository().addListener('change', () => {
            
        //     this.setState({users:Utils.repository().objects('users')  })
        // });
    
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
        // let r = this.state.users.slice(0,1)[0]
        
        // let response =  RNFetchBlob
        // .config({trusty:true,})
        // .fetch('GET','https://eprop.wim-bms.com/mobilews.asmx/ToApprove?signer=' + r.id)   
        // .then(async(resp)=>{
        //     var ret =  "[" + resp.data.split("[")[1].replace("</string>","")
        //     var obj = JSON.parse(ret);
        //     this.arrayholder = obj;
        //     this.setState({data:obj,isloading:false,refreshing:false,toapprvcount:obj.length})

        // })
        // .catch((err) => {
        //     alert (err.msg+ ',Cek koneksi Internet')
        // })
        
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
                <Icon type='ionicon' name='md-arrow-back'  iconStyle={{color:'white',paddingLeft:15}} style={styles.actionButtonIcon} />
                </TouchableOpacity>            
            } 
            centerComponent={{ text: 'eProposal', style: { color: 'white' } }}            
            backgroundColor="black"
            innerContainerStyles={{ width: width,backgroundColor:'black' }}
            outerContainerStyles={{ borderBottomColor:'black',borderBottomWidth:1 }}
            />

            <ScrollView>
                <Divider style={{ height: 20,backgroundColor:'white' }} />                
                {/* <View style={{ flexDirection:'column',justifyContent:'flex-start',alignItems:'center', padding: 5,backgroundColor:'white' }}> */}
                    {/* 1 */}
                    {/* <View style={{ flexDirection:'row',justifyContent:'flex-start',alignItems:'center', padding: 10,backgroundColor:'white' }}> */}
                    <View style={{ flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start', padding: 10,backgroundColor:'white' }}>
                        <View style={styles.iconStyle}>
                            <TouchableOpacity  onPress={() =>  {Actions.eprop_needapproval()} }  style={{padding:10}}  >
                            <Icon type='material-community' name={'format-list-checks'} iconStyle={{color:'#4688AE',fontSize: 50,width: 70,height: 60}}  />
                            <Text style={{color:'#4688AE',fontSize:10}}>NEED</Text>
                            <Text style={{color:'#4688AE',fontSize:10}}>APPROVAL</Text>
                            </TouchableOpacity>                                            
                        </View>
                        {/* <Divider style={{ width: 30,backgroundColor:'white' }} /> */}
                        <View style={styles.iconStyle}>
                            <TouchableOpacity onPress={() => {Actions.eprop_approved()} }  style={{padding:10}} >
                            <Icon type='ionicon' name={'ios-checkmark-circle-outline'} iconStyle={{color:'#4688AE',fontSize: 50,width: 70,height: 60}}  />
                            <Text style={{color:'#4688AE',fontSize:10}}>APPROVED</Text>
                            <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>                                           
                        </View>
                        {/* <Divider style={{ width: 30,backgroundColor:'white' }} /> */}
                        <View style={styles.iconStyle}>
                        <TouchableOpacity onPress={() => {Actions.eprop_sent()} }  style={{padding:10}} >
                            <Icon type='ionicon' name={'ios-send'} iconStyle={{color:'#4688AE',fontSize: 50,width: 70,height: 60}}  />
                            <Text style={{color:'#4688AE',fontSize:10}}>SENT</Text>
                            <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                        </TouchableOpacity>      
                        </View>
                    </View>
                    {/* 2 */}
                    {/* <View style={{ flexDirection:'row',justifyContent:'flex-start',alignItems:'center', padding: 10,backgroundColor:'white' }}> */}
                    <View style={{ flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start', padding: 10,backgroundColor:'white' }}>

                        {/* <View style={styles.iconStyle}>
                            <TouchableOpacity onPress={() =>  {} }  style={{padding:10}} >
                            <Icon type='ionicon' name={'ios-lock'} iconStyle={{color:'#4688AE',fontSize: 50,width: 70,height: 60}}  />
                            <Text style={{color:'#4688AE',fontSize:10}}>LOGOUT</Text>
                            <Text style={{color:'#4688AE',fontSize:10}}></Text>
                            </TouchableOpacity>      
                        </View>
                        <View style={styles.iconStyle}>
                            <TouchableOpacity  onPress={() => {} }  style={{padding:10}}  >
                            <Text style={{color:'#4688AE',fontSize:10,width: 70,height: 60 }}> </Text>
                            </TouchableOpacity>      
                        </View>
                        <View style={styles.iconStyle}>
                            <TouchableOpacity  onPress={() => {} }  style={{padding:10}}  >
                            <Text style={{color:'#4688AE',fontSize:10,width: 70,height: 60 }}> </Text>
                            </TouchableOpacity>      
                        </View> */}


                    </View>
                    {/* 3 */}
                    <View style={{ flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start', padding: 10,backgroundColor:'white' }}>

                    </View>

                {/* </View> */}

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

export default EpropHomeScreen;