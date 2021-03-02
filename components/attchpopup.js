import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Modal,
    Button,
  } from 'react-native';
  import PropTypes from 'prop-types';
  import Pdf from 'react-native-pdf';
  import RNFetchBlob from 'rn-fetch-blob'
  import Indicator from './indicator'
  const { width, height } = Dimensions.get('window');  

export default class AttchPopup extends Component {
    static propTypes = {
        isvisible:PropTypes.bool,
        //item:PropTypes.object,
        //onOpenAttch: PropTypes.func.isRequired,
    }
    state={
        visible:this.props.isvisible,
        isloading:false,
    }

    async componentWillReceiveProps(nextProps) {
        //this.props.isvisible = false
        if (!this.props.isvisible && nextProps.isvisible) {
            // this.setState({isloading:true})
            // let response = await RNFetchBlob
            // .config({trusty:true,})
            // .fetch('GET','https://eprop.wim-bms.com/mobilews.asmx/download?guid=' + nextProps.item.guid)   
            // let resp = await response;
            // this.setState({ret:resp})
            // this.setState({isloading:false})
            // var dt =await   this.state.ret.data.split("[")[1].replace("</string>","")
            // while  (this.state.isloading) {
            //     this.setState({isloading :true})
            // }

            // var obj = dt.replace("]","");


        }
    }    
    onPress(){
        this.props.isvisible = false
        //this.setState({visible:false})
    }
    render(){
        //const { } = this.props;        
        const { isvisible} = this.props;
        const dirs = RNFetchBlob.fs.dirs
        const source = {uri:dirs.DocumentDir+ '/document.pdf' }        
        return(
            <Modal
                transparent={false}
                animationType={'none'}
                visible={isvisible}
                onRequestClose={() => {this.setState({isvisible:false})}}>
                <View style={styles.modalBackground}>
                    <Indicator isloading={this.state.isloading}/>
                    <View style={styles.activityIndicatorWrapper}>
                        <View style={{ justifyContent:'flex-start',flexDirection:'row', alignContent:'flex-start',height:50,padding:5 }}>
                            <Button                  
                                color='red'                                        
                                title='X'
                                onPress={this.props.onClose} 
                            />                             
                        </View>    
                        {/* <View > */}
                            <Pdf
                                source={source}
                                onLoadComplete={(numberOfPages,filePath)=>{
                                //alert(`number of pages: ${numberOfPages}`);
                                }}
                                onPageChanged={(page,numberOfPages)=>{
                                    //alert(`current page: ${page}`);
                                }}
                                onError={(error)=>{
                                    alert(error);
                                }}
                                style={styles.pdf}/>  

                        {/* </View>       */}
                    </View>


                </View>
            </Modal>            
        )
    }
        
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        //justifyContent: 'space-around',
        justifyContent: 'flex-start',
        backgroundColor: '#00000040'
      },
      activityIndicatorWrapper: {
        flex:1,  
        //width:300,
        backgroundColor: '#FFFFFF',
        margin:5,
        borderRadius: 2,
        flexDirection:'column',
      //   display: 'flex',
      //   alignItems: 'center',
        //justifyContent: 'flex-start'
        //alignSelf: 'stretch',
      },
      pdf: {
        flex:1,
        //margin:10,
        width:Dimensions.get('window').width,
      }
      
  });
