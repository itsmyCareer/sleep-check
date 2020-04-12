import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, Platform, PixelRatio } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Spinner from 'react-native-spinkit'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export default class App extends Component {
  render() {
    let that = this;
        setTimeout(function(){
            that.props.navigation.replace('LoginScreen');
        }, 5000);
    return (
      <View style={styles.container}>
        <Image source = {require('../../image/sleep.png')} />
        <Text style={{...styles.textBox, fontSize: 20, marginTop: 20, marginBottom: 20}}> Good Sleepi </Text>
        <Spinner color={'#444444'} size={60} type={'ThreeBounce'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
  },
  textBox: {
    fontFamily: 'NanumBarunGothic',
    textAlign:'center'
  }
})
