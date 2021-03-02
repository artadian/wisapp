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
class HomeScreen extends Component {
    
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
            {/* <Header          
            
            centerComponent={{ text: 'APPROVAL MOBILE', style: { color: 'white' } }}            
            backgroundColor="black"
            innerContainerStyles={{ width: width,backgroundColor:'black' }}
            outerContainerStyles={{ borderBottomColor:'black',borderBottomWidth:1 }}
            /> */}

            <ScrollView style={{backgroundColor:'black'}}>
                <Image
                style={{ width: width, height: 175,backgroundColor:'black' }}
                source={require('./assets/wd.jpg')}
                //source={{ uri: 'https://via.placeholder.com/350x150' }}
                />
                <Divider style={{ height: 20,backgroundColor:'black' }} />   
                
                <View style={{ flexDirection:'column',justifyContent:'center',alignItems:'center', padding: 5,backgroundColor:'black' }}>
                    {/* 1 */}
                    <View style={{ flexDirection:'row',justifyContent:'flex-start',alignItems:'center', padding: 5,backgroundColor:'black' }}>
                            <TouchableOpacity  onPress={() =>  {Actions.eprophome()} }    style={[styles.iconStyle,{padding:15}]}  >
                                <Icon type='material-community' name={'format-list-checks'} iconStyle={{textAlign: 'center',color:'#4688AE',fontSize: 90,width: 90,height: 90}} />
                                <Text style={{color:'#4688AE',fontSize:10}}>EPROPOSAL</Text>
                                <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>                                            
                            <TouchableOpacity onPress={() => {Actions.edochome()} }   style={[styles.iconStyle,{padding:15}]}  >
                                <Image
                                    source={require('./assets/edoc.png')}
                                    style={{ width: 90, height: 90 }}
                                />
                            
                                {/* <Icon type='ionicon' name={'ios-document'}  iconStyle={{textAlign: 'center',color:'#ffcc00',fontSize: 90,width: 90,height: 90}} /> */}
                                <Text style={{color:'#4688AE',fontSize:10}}>EDOCUMENT</Text>
                                <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>                                           

                            <TouchableOpacity onPress={() => {} }   style={[styles.iconStyle,{padding:15}]}  >
                                <Image
                                    source={require('./assets/woli.png')}
                                    style={{ width: 90, height: 90 }}
                                />
                                {/* <Icon type='ionicon' name={'md-settings'} iconStyle={{textAlign: 'center',color:'#4688AE',fontSize: 90,width: 90,height: 90}} /> */}
                                <Text style={{color:'#4688AE',fontSize:10}}>WOLI</Text>
                                <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>                                           

                        
                    </View>
                    {/* 2 */}
                    <View style={{ flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:'black' }}>
                            <TouchableOpacity  onPress={() =>  {} }   style={[styles.iconStyle,{padding:15}]}  >
                                <Icon type='ionicon' name={'ios-car'} iconStyle={{textAlign: 'center',color:'#4688AE',fontSize: 90,width: 90,height: 90}} />
                                <Text style={{color:'#4688AE',fontSize:10}}>ERESERVE</Text>
                                <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>                                            

                            <TouchableOpacity onPress={() => {} }  style={[styles.iconStyle,{padding:15}]}  >
                                <Icon type='ionicon' name={'ios-cart'} iconStyle={{textAlign: 'center',color:'#4688AE',fontSize: 90,width: 90,height: 90}} />
                                <Text style={{color:'#4688AE',fontSize:10}}>SPB</Text>
                                <Text style={{color:'#4688AE',fontSize:10}}>ONLINE</Text>
                            </TouchableOpacity>                                           

                            <TouchableOpacity onPress={() => {} } style={[styles.iconStyle,{padding:15,borderBottomColor:'white'}]}  >
                                <Icon type='ionicon' name={'ios-trending-up'} iconStyle={{textAlign: 'center',color:'#4688AE',fontSize: 90,width: 90,height: 90}} />
                                <Text style={{color:'#4688AE',fontSize:10}}>EFPMJ</Text>
                                <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>                                           
                    </View>
                    {/* 3 */}
                    <View style={{ flexDirection:'row',justifyContent:'flex-start',alignItems:'center', padding: 10,backgroundColor:'black' }}>
                            <TouchableOpacity  onPress={() =>  {} }   style={[styles.iconStyle,{padding:15}]}  >
                                <Icon type='ionicon' name={'ios-person-add'} iconStyle={{textAlign: 'center',color:'#4688AE',fontSize: 90,width: 90,height: 90}} />
                                <Text style={{color:'#4688AE',fontSize:10}}>FPK</Text>
                                <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>                                            
                            <TouchableOpacity  onPress={() =>  {
                                const ou =  this.state.realm.objects('users');
                                this.state.realm.write(()=>{
                                    this.state.realm.delete(ou) 
                                });        
                                Actions.login();        
                            } }   style={[styles.iconStyle,{padding:15}]}  >
                            <Icon type='ionicon' name={'ios-lock'} iconStyle={{textAlign: 'center',color:'#4688AE',fontSize: 90,width: 90,height: 90}} />
                                <Text style={{color:'#4688AE',fontSize:10}}>LOGOUT</Text>
                                <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                            </TouchableOpacity>  
                            <TouchableOpacity  onPress={() =>  {} }   style={[styles.iconStyle,{padding:15}]}  >
                                <Text style={{color:'#4688AE',fontSize:10}}> </Text>
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
        flex:1,  
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

export default HomeScreen;