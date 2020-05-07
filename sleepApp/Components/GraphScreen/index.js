import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, Platform, PixelRatio } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Axios from 'axios';

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

export default class GraphScreen extends Component {
  constructor(props){
    super(props);
    this.state={myJson: ''};
  }
  
  componentDidMount() {

    let url = 'http://13.209.70.41:5000/data';

    // Axios.get(url)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    

    const that = this;
    fetch('http://13.209.70.41:5000/data')
    .then(function(response) {
      return response.json();
    })
    .then(function(ma) {
      that.setState({
        myJson: ma
      });
      console.log(JSON.stringify(ma));
    })
    .catch(error => {
      console.error(error);
    }) ; 
  }

  
  render() {
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5
    };
    
    const data = [
      {
        name: "조용함",
        population: 5,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "조금 조용함",
        population: 15,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "보통",
        population: 40,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "조금 시끄러움",
        population: 40,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "시끄러움",
        population: 0,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];
    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}> 4월 16일 통계 </Text>
            </View>
            <PieChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
            
            
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
