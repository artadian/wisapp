import React, { Component } from "react";
import { StyleSheet, FlatList,TouchableOpacity, Dimensions, ScrollView, Platform,Image,Animated, TouchableWithoutFeedback, View,RefreshControl ,Text} from "react-native";
//import { StackNavigator,NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { Root } from './config/router';
import HTML from 'react-native-render-html';
import { SearchBar, Avatar, List, Card, Badge,Header, Icon, ListItem, FormLabel, Button, Divider } from 'react-native-elements'

var navigation;

import Input from './components/input'
import InputMultiline from './components/inputmultiline'
const { width, height } = Dimensions.get('window')
// const menu ={"title":"Need Approveal","iconname":"playlist-add-check"}
import RNFetchBlob from 'rn-fetch-blob'
import Realm from 'realm'
import Indicator from './components/indicator'
import Utils from './utils/utils'
import _ from 'lodash'
import Modal from 'react-native-modal'
import AttchPopup   from './components/attchpopup'
import { file, tsImportEqualsDeclaration } from "@babel/types";

// var db;
//var realm;
class Edoc_ApprovedScreen extends Component {

    constructor(props) {
        super(props);
        this.SearchFilterFunction = this.SearchFilterFunction.bind(this);

        this.state = {
            realm :Utils.repository(),
            users:null,
            isModalMenu:false,
            isModalApproval:false,
            isModalApprove:false,
            attchPopupIsOpen:false,
            selecteditem:[],
            dataapproval:[],
            text:'',
            nonotulen:'',
            comment:'',
            isapprove:false,
            isrevise:false,
            isreject:false,
            ismm:false,
            isnotulen:false,
        }
        this.arrayholder = [] ;

    };


    componentWillMount() {
        let users = this.state.realm.objects('users')
        this.setState({users:users})

        if (users[0].namalogin=="mm"){
            this.setState({ismm:true})
        }
        let r = users.slice(0,1)[0]
        //alert(r.id)
        this.setState({isloading:true})
        let response =  RNFetchBlob
        .config({trusty:true,})
        .fetch('GET','https://edoc.wim-bms.com/mobilews.asmx/Approved?id=' + r.id )
        .then(async(resp)=>{
            var ret =  "[" + resp.data.split("[")[1].replace("</string>","")
            var obj = JSON.parse(ret);
            this.arrayholder = obj;
            this.setState({data:obj,isloading:false})

        })
        .catch((err) => {
            alert (err.msg+ ',Cek koneksi Internet')
            this.setState({isloading:false})
        })
        this.setState({isloading:false})
    }

    componentDidMount() {
      
    }

    onCLickLogout() {
        Actions.login();
    }

    
    async onOpenAttch(item){
        console.log("######" + item.guid + "######");
        this.setState({isloading:true})
        let response = await RNFetchBlob
        .config({trusty:true,})
        .fetch('GET','https://edoc.wim-bms.com/mobilews.asmx/download?guid=' + item.GUID)
        let resp = await response;
        this.setState({ret:resp})

        var dt =await   this.state.ret.data.split("[")[1].replace("</string>","").replace("]","")
        this.setState({isloading :false,dataattch:dt})
        while  (this.state.isloading) {
            this.setState({isloading :true})
        }

        while  (this.state.isloading) {
          this.setState({isloading :true})
        }

        //console.log(dt)
        const dirs =  RNFetchBlob.fs.dirs
        const base64Str=this.state.dataattch

        await RNFetchBlob.fs.writeFile(dirs.DocumentDir + '/document.pdf', base64Str, 'base64')
        .then(() => {
            this.setState({isModalMenu:false})
            setTimeout(() => {
                this.setState({ attchPopupIsOpen: true });
              }, 1000);


        })

        .catch((err) => {
          if (err != undefined) {
              alert('ERROR : ' + err.msg);
          } else {
            alert('create failed');
          }
        })



    }

    closeAttchPopup=()=>{
        this.setState({
          attchPopupIsOpen: false,
        });

    }

    SearchFilterFunction(text){
    
        const newData = this.arrayholder.filter(function(item){
            const itemData = item.Filter.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            data: newData,// this.state.data.cloneWithRows(newData),
            text: text
        })
      }    

    populateapproval(){
        this.setState({isloading:true})
        let response =  RNFetchBlob
        .config({trusty:true,})
        .fetch('GET','https://edoc.wim-bms.com/mobilews.asmx/Approval?guid=' + this.state.selecteditem.GUID)   
        //.fetch('GET','https://eprop.wim-bms.com/eprop105.asmx/Approval?guid=' + nextProps.item.guid)   
        .then(async(resp)=>{
            var ret =  "[" + resp.data.split("[")[1].replace("</string>","")
            var obj = JSON.parse(ret);
            this.setState({dataapproval:obj,isloading:false})
        })
        .catch((err) => {
            alert (err.msg+ ',Cek koneksi Internet')
        })
    }      

    async prosesApprove(){
        //alert(JSON.stringify(this.state.users))     
        var s = this.state.selecteditem.nominal
        s = s.replace('.00','')
        s = s.replace(/,/g,'')

        var blnIsnotulen = false
        if(Number(s)>=100000000 &&  THIS.STATE.ismm){
            this.setState({isnotulen:true})
            blnIsnotulen:true
        }
  
    }
    renderHeader() {
        return <SearchBar placeholder="Type Here..." lightTheme round onChangeText={(text) => this.SearchFilterFunction(text)} value={this.state.text} />;
      };

      renderFooter() {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 10,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };
      renderSeparator() {
        return (
          <View
            style={{
              height: 20,
              //width: "9%",
              backgroundColor: "#CED0CE",
              marginLeft: 0,
              marginRight: 0,  
            }}
          />
        );
      };    
      renderSwitch(item) {
        switch(item.Status) {
            case 'COMPLETE':
            return <Badge value={item.Status} containerStyle={{paddingLeft:10}} status="success" />;
            case 'REJECT':
            return <Badge value={item.Status} containerStyle={{paddingLeft:10}} status="error" />;
            case 'REVISE':
            return <Badge value={item.Status} containerStyle={{paddingLeft:10}} status="primary" />;
          default:
            return <Badge value={item.Status} containerStyle={{paddingLeft:10}} status="warning" />;
        }
      }
      renderPenawaran(item) {
        if (item.DeptID=='2' || item.DeptID=='4') {
            // return <Badge status="success" containerStyle={{ position: 'absolute' }}/>;
            return <Text style={{paddingLeft:10, color: 'black',fontSize:11 }}>{item.Penawaran}</Text>;
        }
      }
      renderitem(item){
        return(
            <View style={{paddingTop:0,backgroundColor:'white', flexDirection:'column',paddingTop: 0,justifyContent:'flex-start',alignItems:'flex-start'}}>

                    <View style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <View style={{paddingLeft:0,flexDirection:'column',backgroundColor:'white',justifyContent:'flex-start',alignItems:'flex-start'}}>
                           <View style={{backgroundColor:  '#72b7de', flexDirection:'column',justifyContent:'center',alignItems:'flex-start'}}>
                                <Divider style={{ width: width,backgroundColor:'#72b7de',height:20 }} />
                                <Text style={{paddingLeft:10, color: 'black',fontSize:12, fontWeight: 'bold', }}>{_.toUpper(item.Judul)}</Text>
                                <Divider style={{ width: width,height:10,backgroundColor:'#72b7de' }} />
                            </View>
                            {/* <Divider style={{ width: width,backgroundColor:'#bebebe',height:1 }} /> */}
                            <View style={{backgroundColor:  'white', flexDirection:'column',justifyContent:'center',alignItems:'flex-start'}}>
                                <Divider style={{ width: width,backgroundColor:'white',height:20 }} />
                                <Text style={{paddingLeft:10, color: 'black',fontSize:12 }}>NoDoc : {item.NoDoc}</Text>
                                <Text style={{paddingLeft:10, color: 'black',fontSize:12 }}>NoReference : {item.NoReference}</Text>
                                <Text style={{paddingLeft:10, color: 'black',fontSize:12 }}>Category : {item.Cat}</Text>
                                <Text style={{paddingLeft:10, color: 'black',fontSize:12 }}>Dari : {item.Dari}</Text>
                                {this.renderSwitch(item)}
                                {this.renderPenawaran(item)}
                                <Text style={{paddingLeft:10, color: 'black',fontSize:11 }}>Sent Date : {item.SendDate}</Text>
                                <View style={{paddingLeft:10, color: 'black',fontSize:12 }}><HTML html= {item.Message===""?"-":item.Message} /></View>
                                {/* <Divider style={{ width: width,backgroundColor:'white',height:20 }} /> */}
                            </View>

                            <Divider style={{ width: width,backgroundColor:'white',height:5 }} />
                            <View style={{paddingLeft:10,backgroundColor:  'white', flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <TouchableOpacity  onPress={() =>  {this.setState({selecteditem:item, isModalMenu:true})} }  >
                                    <Icon type='ionicon' name={'ios-more'} iconStyle={{color:'black',fontSize: 30,width: 30,height: 30}}  />
                                </TouchableOpacity>
                                <Divider style={{ width: width-40,backgroundColor:'white',height:5 }} />
                            </View>
                            <Divider style={{ width: width,backgroundColor:'white',height:5 }} />



                        </View>

                    </View>
            </View>
        )
    }
          
    renderList(){
        return(
            <View style={{flex:1, backgroundColor: '#000000',height:height-110,width:width } }>
               
                        <FlatList style={{ backgroundColor:'#f2eded'}}
                           
                            data={this.state.data}
                            renderItem={({ item }) => this.renderitem(item)}

                            //keyExtractor={item => item.guid}
                            keyExtractor={(item, index) => index.toString()}

                            ListHeaderComponent={this.renderHeader()}
                            ListFooterComponent={this.renderFooter()}
                            ItemSeparatorComponent={this.renderSeparator}

                        />
            </View>
        )
    }
    renderModalMenu(){

        return (
                <View style={{ flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start', padding: 10,backgroundColor:'white' }}>
                    <View style={styles.iconStyle}>
                        <TouchableOpacity  onPress={() =>  {
                                this.onOpenAttch(this.state.selecteditem)
                                // this.setState({isModalAttch:true})
                            }}  style={{padding:10}}  >
                        <Icon type='ionicon' name={'ios-attach'} iconStyle={{color:'#4688AE',fontSize: 50,width: 50,height: 50}}  />
                        <Text style={{color:'#4688AE',fontSize:10}}>ATTACHMENT</Text>
                        <Text style={{color:'#4688AE',fontSize:10}}> </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Divider style={{ width: 30,backgroundColor:'white' }} /> */}
                    <View style={styles.iconStyle}>
                        <TouchableOpacity onPress={() => {
                            this.populateapproval()
                            this.setState({isModalMenu:false})
                            setTimeout(() => {
                                this.setState({ isModalApproval: true });
                              }, 1000);

                            
                        } }  style={{padding:10}} >
                        <Icon type='material-community' name={'format-list-checks'} iconStyle={{color:'#4688AE',fontSize: 50,width: 50,height: 50}}  />
                        <Text style={{color:'#4688AE',fontSize:10}}>DETAIL</Text>
                        <Text style={{color:'#4688AE',fontSize:10}}>APPROVAL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconStyle}>
                    </View>
                </View>
            // </View>
        )
    }
    renderModalApproval(){
        return(
            <View style={styles.modalContent}>
            <ScrollView style={{height:height-250}}>
                    <FlatList style={{ backgroundColor:'white'}}
                        data={this.state.dataapproval}
                        renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            // title={`${item.signer}`}
                            subtitle={
                            <View style={styles.subtitleView}>
                                <Text  style={{color:'#4688AE',fontWeight:'bold'}}>{_.toUpper(item.SignerNama)}</Text> 
                                <Divider style={{ width: width,backgroundColor:'white',height:10 }} />
                                <Text>{item.ApprvDate}</Text> 
                                <Text  style={{color:'black',fontStyle:'italic' }}>Comment : {item.ApprvComment}</Text> 
                                <Text  style={{color:'black',}}>Status : {item.Status}</Text> 
                                <Divider style={{ width: width,backgroundColor:'white',height:20 }} />
                                <Divider style={{ width: width,backgroundColor:'#bebebe',height:1 }} />
                            </View>
                            }
                            hideChevron={false}
                            
                            onPressRightIcon={() => {}}
                            avatar={
                                <Avatar
                                    medium                                  
                                    overlayContainerStyle={{backgroundColor: '#4688AE',padding:5}}      
                                    title={item.norumah}
                                    titleStyle={{fontSize:14,fontWeight:'bold'}}                          
                                    // onPress={() => {}}
                                        
                                    activeOpacity={0.7}
                                />}
                        />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
            </ScrollView>
            </View>

        )
    }
    
    render() {

        return (
        <View style={styles.container}>

            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => {Actions.edochome()} }>
                    <Icon type='ionicon' name='md-arrow-back'  iconStyle={{color:'white',paddingLeft:15}} style={styles.actionButtonIcon} />
                    </TouchableOpacity>            
                }                  
                centerComponent={{ text: 'Approved', style: { color: 'white',fontSize:25 } }}
                backgroundColor="#72decf"
                innerContainerStyles={{ width: width,backgroundColor:'#4688AE' }}
                outerContainerStyles={{ borderBottomColor:'#4688AE',borderBottomWidth:1 }}
            />
            <Indicator isloading={this.state.isloading}/>

                {this.renderList()}


            <Modal
                isVisible={this.state.isModalMenu}
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                onBackdropPress={() => this.setState({ isModalMenu: false })}
                >
                {/* {this.renderModalKoleksi()} */}
                {this.renderModalMenu()}
            </Modal>
            <Modal
                isVisible={this.state.isModalApproval}
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                onBackdropPress={() => this.setState({ isModalApproval: false })}
                >
                {/* {this.renderModalKoleksi()} */}
                {this.renderModalApproval()}
            </Modal>
            <AttchPopup isvisible={this.state.attchPopupIsOpen} onClose={this.closeAttchPopup}/>

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
      modalContent: {
        backgroundColor: "white",
        padding: 5,
        flexDirection:'row',
        justifyContent: "space-around",
        alignItems: "flex-start",
        //borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
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

export default Edoc_ApprovedScreen;