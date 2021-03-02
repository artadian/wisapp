import React from 'react';
import { StyleSheet, Platform, Image, Text,Alert, View, ScrollView } from 'react-native';
import { FlatList, Button,TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';


import  Root from './config/router';

export default class App extends React.Component {

  async componentDidMount() {

  }
  componentWillUnmount() {

  }

  render() {
    //return <Root />;      
    return(
      <View style={{ flex: 1 }}>
        <Root />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
