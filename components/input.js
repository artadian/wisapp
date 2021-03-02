import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';

export default class Input extends Component {
  state = {
    isFocused: false,
  };

  render() {
    const { label,width, ...props } = this.props;

    const labelStyle = {
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
      paddingLeft:5,  
      fontSize: 14,
      fontWeight:'bold',
      color: '#4688AE',
    };
    return (
      <View>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          style={{ height: 35,width:width, fontSize: 14, color: '#000', borderBottomWidth:1,borderBottomColor:'#4688AE',paddingLeft:5,   }}
        />
      </View>
    );
  }
}



