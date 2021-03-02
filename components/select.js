import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Picker,
  Text,
} from 'react-native';

export default class Select extends Component {
  state = {
    isFocused: false,
  };

  render() {
    const { label,width,item, ...props } = this.props;

    const labelStyle = {
    //   position: 'absolute',
    //   left: 0,
    //   top: 18,
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
        <Picker
            {...props}
            style={{ height: 40,width:width, color: '#000', borderBottomWidth:1,borderBottomColor:'#4688AE',borderStyle:'dotted' }}
        >
            {
                item.map((item,index)=>{
                    return (< Picker.Item label={item.nama} value={item.id} key={index} />);

                })
            }
        </Picker>
      </View>
    );
  }
}



