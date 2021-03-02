import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
export default class InputDate extends Component {
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
      fontSize: 12,
      fontWeight:'bold',
      color: '#4688AE',
    };
    return (
      <View>
        <Text style={labelStyle}>
          {label}
        </Text>
		<DatePicker
			  {...props}		
			  style={{width: width,borderColor:'black'}}
			  mode="date"
			  format="YYYY-MM-DD"
			  minDate="1970-01-01"
			  maxDate="2099-12-31"
			  confirmBtnText="Confirm"
			  cancelBtnText="Cancel"
			  showIcon={false}
			  customStyles={{
			  dateInput: {
				  marginTop:0,	
				  marginLeft: 10,
				  borderLeftWidth: 0,
				  borderRightWidth: 0,
				  borderTopWidth: 0,
				  borderBottomWidth: 0,
			  }
			  }}
		/>
        
      </View>
    );
  }
}



