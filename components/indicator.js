import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Modal,
    ActivityIndicator
  } from 'react-native';
  import PropTypes from 'prop-types';
const { width, height } = Dimensions.get('window');  
export default class Indicator extends Component {
    static propTypes = {
        isloading:PropTypes.bool,
    }
    state={
        visible:this.props.isloading
    }
    render(){
        const { isloading} = this.props;
        return(
            <Modal
                transparent={true}
                animationType={'none'}
                visible={isloading}
                onRequestClose={() => {console.log('close modal')}}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size='large'
                        animating={isloading} />
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
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 150,
      width: 150,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
