import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, Platform, PixelRatio } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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
    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}> 4월 16일 통계 </Text>

            </View>
            
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 20,
      flexDirection: 'row'
  },
  textBox: {
    fontFamily: 'NanumBarunGothic',
    textAlign:'center'
  },
  header: {
    height: 60,
    borderColor: '#f9f9f9',
    backgroundColor: '#2196F3',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'NanumBarunGothic',
  },
})
