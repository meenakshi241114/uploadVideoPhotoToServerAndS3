import React, { useState } from "react";
import { Images } from '../../Theme';
import { ImageBackground, StyleSheet, Text, View, Image, TextInput } from "react-native";
import Button from '../../Components/ButtonBox';
import NavigationService from 'App/Services/NavigationService';
import { Layout } from '../../Theme';
import AppStyle from '../../Theme/ApplicationStyles';
import {HelperService} from '../../Services/Utils/HelperService';
import styles from './InformationScreenStyle';

const InformationScreen = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preference, setPreference] = useState('none');
  // const [no, setNo] = useState(false);

  _setPreference = (preference) => {
    setPreference(preference);
  }
  _navigatePage = (page) => {
    if (page == 'next') {
      if (!name) {
        alert('Please enter name');
      } else if (!age) {
        alert('Please enter age');
      } else {
        setStep1(false);
        setStep2(true);
      }

    } else if (page == 'submit') {
      var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!phone) {
        alert('Please enter phone');
      } else if (!email) {
        alert('Please enter email');
      }
      else if (!email.match(mailformat)) {
        alert("You have not entered a valid email address!");
      }
      else if (preference == 'none') {
        alert('Please select your contact preference');
      } else {
        alert('Your information has been saved');
        setTimeout(() => {
          //NavigationService.navigate('HomeScreen')
        }, 1000);
      }
    } else if (page == 'back') {
      setStep2(false);
      setStep1(true);
      setPreference('')
    } else {
      //NavigationService.navigate('HomeScreen')
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.backgroundBlue} style={styles.image}>
        <View style={{ height: '6%' }}></View>
        <View style={styles.imagebox}><Image source={Images.logo4} style={styles.logo} /></View>
        <View style={{ height: '1%' }}></View>
        {step1 && <View style={styles.textView}>
          <Text style={styles.text}>We'd like to know</Text>
          <Text style={styles.text}>more about.</Text>
        </View>}
        {step2 && <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.text}>what's the best way</Text>
          <Text style={styles.text}>to contact you?</Text>
        </View>}
        {step1 && <View style={{ marginVertical: 30, marginHorizontal: 10 }}>
          <View style={Layout.flexCol1}>
            <TextInput
              onChangeText={(value) => setName(value)}
              value={name}
              placeholder={'Name'}
              autoFocus = {true}
              style={AppStyle.textInput}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              onSubmitEditing={() => { this.ageTextInput.focus(); }}
            />
          </View>
          <View style={[Layout.flexCol1, { paddingTop: 15 }]}>
            <TextInput
              onChangeText={(value) => setAge(value)}
              value={age}
              placeholder={'Age'}
              keyboardType={'numeric'}
              style={AppStyle.textInput}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              ref={(input) => { this.ageTextInput = input; }}
            />
          </View>
        </View>}
        {step2 && <View style={{ marginVertical: 30, marginHorizontal: 10 }}>
          <View style={Layout.flexCol1}>
            <TextInput
              onChangeText={(value) => setPhone(value)}
              value={phone ? HelperService.formatUSNumber(phone) : ''}
              placeholder={'Phone Number'}
              autoFocus = {true}
              style={AppStyle.textInput}
              keyboardType={'number-pad'}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              onSubmitEditing={() => { this.emailTextInput.focus(); }}
            />
          </View>
          <View style={[Layout.flexCol1, { paddingTop: 15 }]}>
            <TextInput
              onChangeText={(value) => setEmail(value)}
              value={email}
              placeholder={'Email Address'}
              keyboardType={'email-address'}
              style={AppStyle.textInput}
              autoCapitalize={'none'}
              returnKeyType={'done'}
                ref={(input) => { this.emailTextInput = input; }}
            />
          </View>
        </View>}

        {step2 && <View style={{ marginHorizontal: 20, paddingTop: 50 }}>
          <Text style={styles.text1}>what is your contact preference?</Text>
        </View>}

        {step2 && <View style={{ flexDirection: 'row', marginHorizontal: 20, paddingTop: 20 }}>
          {step2 && <Button
            title={'Call'}
            style={{ backgroundColor: preference == 'call' ? '#ffffff' : '#cceef1', height: 40, borderRadius: 10, width: '30%', justifyContent: 'center' }}
            textStyle={{ color: '#00a9b7', fontSize: 20, fontFamily: 'Calibri' }}
            onPress={() => _setPreference('call')}
          />}
          <Button
            title={'Text'}
            style={{ backgroundColor: preference == 'text' ? '#ffffff' : '#cceef1', height: 40, borderRadius: 10, width: '30%', justifyContent: 'center', marginLeft: 20 }}
            textStyle={{ color: '#00a9b7', fontSize: 20, fontFamily: 'Calibri' }}
            onPress={() => _setPreference('text')}
          />
          <Button
            title={'Email'}
            style={{ backgroundColor: preference == 'email' ? '#ffffff' : '#cceef1', height: 40, borderRadius: 10, width: '30%', justifyContent: 'center', marginLeft: 20 }}
            textStyle={{ color: '#00a9b7', fontSize: 20, fontFamily: 'Calibri' }}
            onPress={() => _setPreference('email')}
          />
        </View>}

        <View style={{ position: 'absolute', bottom: 0, height: 80 }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
            {step2 && <Button
              title={'Back'}
              style={{ backgroundColor: '#00a9b7', height: 40, borderRadius: 10, width: 110, justifyContent: 'center' }}
              textStyle={{ color: '#fff0a5', fontSize: 20, fontFamily: 'Calibri' }}
              onPress={() => _navigatePage('back')}
            />}
            <Button
              title={step1 ? 'Next' : 'Submit'}
              style={{ backgroundColor: '#00a9b7', height: 40, borderRadius: 10, width: 110, justifyContent: 'center', marginLeft: 20 }}
              textStyle={{ color: '#fff0a5', fontSize: 20, fontFamily: 'Calibri' }}
              onPress={() => _navigatePage(step1 ? 'next' : 'submit')}
            />
            <Button
              title={'Home'}
              style={{ backgroundColor: '#fff0a5', height: 40, borderRadius: 10, width: 110, justifyContent: 'center', marginLeft: 20 }}
              textStyle={{ color: '#00a9b7', fontSize: 20, fontFamily: 'Calibri' }}
              onPress={() => _navigatePage('home')}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default InformationScreen;
