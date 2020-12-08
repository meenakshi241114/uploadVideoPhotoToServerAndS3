import React, { useState, useEffect } from "react";
import { Images } from '../../Theme';
import { ImageBackground, StyleSheet, Text, View, Image, BackHandler ,Alert} from "react-native";
import Button from '../../Components/ButtonBox';
import NavigationService from 'App/Services/NavigationService';
import RNExitApp from 'react-native-exit-app';


const NarativeScreen = () => {
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  // const [no, setNo] = useState(false);

  _setPreference = (preference) => {
    if (preference == 'yes') {
      setYes(true);
    } else if (preference == 'submit') {
      NavigationService.navigate('InformationScreen')
    } else if (preference == 'close') {
      exitFromApp();
    } else {
      setNo(true);
      setYes(false);
    }
  }
  exitFromApp = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () =>RNExitApp.exitApp()},
      ],
      { cancelable: false });
      return true;
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={yes || no ? Images.backgroundBlue : Images.backgroundYellow} style={styles.image}>
        <View style={{ height: '6%' }}></View>
        {(yes || no) ?  <View style={styles.imagebox}><Image source={Images.logo4} style={styles.logo} /></View>: <View style={{height:100}}></View>}
        <View style={{ height: '1%' }}></View>
        {!yes && !no && <View style={styles.textView}>
          <Text style={styles.text}>But there is a</Text>
          <Text style={styles.text}>third option too.</Text>
        </View>}
        {!yes && !no && <View style={{ paddingTop: 50, marginHorizontal: 30 }}>
          <Text style={styles.text}>Are you interested</Text>
          <Text style={styles.text}>in learning more</Text>
          <Text style={styles.text}>about it?</Text>
        </View>}
        {yes && <View style={styles.textView}>
          <Text style={styles.text}>Would you like</Text>
          <Text style={styles.text}>to speak in confidence</Text>
          <Text style={styles.text}>with someone now?</Text>
        </View>}
        {no && <View style={styles.textView}>
          <Text style={styles.text}>Please visit us again</Text>
          <Text style={styles.text}>if you change your</Text>
          <Text style={styles.text}>mind or are in need</Text>
          <Text style={styles.text}>of help and resources</Text>
        </View>}
        <View style={{ position: 'absolute', bottom: 0, height: 80 }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
            <Button
              title={'Yes'}
              style={{ backgroundColor: '#00a9b7', height: 40, borderRadius: 10, width: 100, justifyContent: 'center', marginHorizontal: 10 }}
              textStyle={{ color: '#fff0a5', fontSize: 20,fontFamily:'Calibri' }}
              onPress={() => _setPreference(yes ? 'submit' : 'yes')}
            />
            <Button
              title={no ? 'Close' : 'No'}
              style={{ backgroundColor: '#00a9b7', height: 40, borderRadius: 10, width: 100, justifyContent: 'center' }}
              textStyle={{ color: '#fff0a5', fontSize: 20,fontFamily:'Calibri' }}
              onPress={() => _setPreference(no ? 'close' : 'no')}
            />
          </View>
        </View>
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
    height: 100,
    width: 100,
  },
  imagebox: {
    marginHorizontal: 20
    // alignItems: 'center',
    // justifyContent: 'center'
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

export default NarativeScreen;

