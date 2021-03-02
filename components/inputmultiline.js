import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';

export default class InputMultiline extends Component {
  state = {
    isFocused: false,
  };

  render() {
    const { label,height,width, ...props } = this.props;

    const labelStyle = {
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
      paddingLeft:5,  
      fontSize: 12,
      fontWeight:'bold',
      color: '#4688AE',
    };
    return (
      <View>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          multiline={true}
          onContentSizeChange={(event) => 
            this.setState({ height:event.nativeEvent.contentSize.height})
            // storing the content text height to height state
        }
          {...props}
          style={{ height: height,width:width, fontSize: 14, color: '#000', borderBottomWidth:1,borderBottomColor:'#4688AE',paddingLeft:5,   }}
        />
      </View>
    );
  }
}



