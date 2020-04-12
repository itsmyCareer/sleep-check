import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, Platform, PixelRatio } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Spinner from 'react-native-spinkit'
import PTRView from 'react-native-pull-to-refresh';

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
    _refresh () {
        // you must return Promise everytime
        return new Promise((resolve) => {
          setTimeout(()=>{
            // some refresh process should come here
            resolve(); 
          }, 2000)
        })
      }
  render() {
    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}> 수면 측정 프로그램 </Text>

            </View>
            
            <PTRView
            style={{backgroundColor:'#F5FCFF'}}
            onRefresh={this._refresh}
            >
                <View style={styles.container}>
                <TouchableOpacity style={styles.card} key={1}>
                    <Text style={{fontFamily: 'NanumBarunGothic'}}>알람</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={()=>this.props.navigation.navigate('GraphScreen')}  key={2}>
                    <Text style={{fontFamily: 'NanumBarunGothic'}}>수면 분석</Text>
                    <Text style={{fontFamily: 'NanumBarunGothic'}}>2020-04-16</Text>
                </TouchableOpacity>
                </View>
            </PTRView>
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
  card: {
    flex: 1,
    borderColor: '#2196F3',
    backgroundColor: '#F5FCFF',
    borderWidth: 3,
    borderRadius: 3,
    margin: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120
  },
})
