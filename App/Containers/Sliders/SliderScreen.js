import React, { useState, useEffect } from "react";
import { Images } from '../../Theme';
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import NavigationService from 'App/Services/NavigationService';

const SliderScreen = () => {
  console.log('i m eher')
  const slides = [
    {
      key: 1,
      text: 'Have you just discovered that you are pregnant?',
      // image: require('./assets/1.jpg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      // image: require('./assets/2.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      // image: require('./assets/3.jpg'),
      backgroundColor: '#22bcb5',
    }
  ];
  _renderItem = ({ index }) => {
    return (
      <View style={styles.textView}>
        {index == 0 && <View><Text style={styles.text}>Have you just</Text><Text style={styles.text}>discovered that you</Text><Text style={styles.text}>are pregnant?</Text></View>}
        {index == 1 && <View><Text style={styles.text}>Are you unsure of</Text><Text style={styles.text}>what to do or at a</Text><Text style={styles.text}>crossroads searching</Text><Text style={styles.text}>for answers, solutions,</Text><Text style={styles.text}>or options</Text></View>}
        {index == 2 && <View><Text style={styles.text}>You may think that</Text><Text style={styles.text}>there are only two</Text><Text style={styles.text}>options to pursue</Text><Text style={styles.text}>if you have an</Text><Text style={styles.text}>unplanned pregnancy.</Text></View>}
      </View>
    );
  }
  _goToNext = (index,lastIndex) => {
    if (lastIndex === 1) {
      setTimeout(() => {
        NavigationService.navigate('NarativeScreen')
      }, 1000);
      // NavigationService.navigate('NarativeScreen')
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={Images.backgroundYellow} style={styles.image}>
        <View style={{ height: '20%' }}></View>
        <AppIntroSlider renderItem={(index) => _renderItem(index)}
          data={slides}
          onSlideChange={(index,lastIndex) => _goToNext(index,lastIndex)}
          activeDotStyle={{ backgroundColor: '#00a9b7', borderWidth: 1, borderColor: '#00a9b7', height: 15, width: 15, borderRadius: 50 }}
          dotStyle={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#00a9b7', height: 15, width: 15, borderRadius: 50 }} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    //justifyContent: "center",
    //alignItems:'center'
  },
  image1: {
    justifyContent: "center",
    alignItems: 'center'
  },
  logo: {
    height: 200,
    width: 200
  },
  imagebox: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: "#00a9b7",
    fontSize: 35,
    fontFamily:'Calibri-Italic',
    paddingTop: 5
  },
  textView: {
    marginHorizontal: 30,
    //paddingTop: 200 
  }
});

export default SliderScreen;

