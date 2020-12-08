import React, { useState, useRef } from "react";
import { Images } from '../../Theme';
import { ImageBackground, Text, View, Image, Animated } from "react-native";
import Button from '../../Components/ButtonBox';
import NavigationService from 'App/Services/NavigationService';
import { AccordionList } from "accordion-collapse-react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import styles from './HomeScreenStyle';

const list = [
  {
    id: 1,
    title: 'Adoption Information'
  },
  {
    id: 2,
    title: 'Pregnancy Resources'
  },
  {
    id: 3,
    title: 'Parenting Information'
  },
  {
    id: 4,
    title: 'Abortion Options'
  }
]
const HomeScreen = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [header, setHeader] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;

  setTimeout(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500
    }).start();
  }, 0);

  setTimeout(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500
    }).start();
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 3000
    }).start();
  }, 3000);

  setTimeout(() => {
    Animated.timing(fadeAnim2, {
      toValue: 0,
      duration: 500
    }).start();
    Animated.timing(fadeAnim3, {
      toValue: 1,
      duration: 1500
    }).start();
  }, 6000);

  setTimeout(() => {
    Animated.timing(fadeAnim3, {
      toValue: 0,
      duration: 500
    }).start();
    Animated.timing(fadeAnim4, {
      toValue: 1,
      duration: 1500
    }).start();
  }, 9000);

  setRow = (item, index) => {
    setHeader();
  }
  setStatus = () => {
    setStep2(!step2)
    setStep3(false)
  }
  _head = (item) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => setStep3(!step3)}>
        <View style={styles.viewHead}>
          <Text style={styles.textHead}>{item.title}</Text>
          {!step2 && <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20, paddingTop: 15 }}>
            <Image source={step3 ? Images.close : Images.plus} style={{ height: 30, width: 30 }} />
          </View>}
        </View>
      </TouchableOpacity>
    );
  }

  _body = (item) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() => setStatus()}>
          <View style={styles.viewFirst}>
            <Text style={{ color: '#00a9b7', fontSize: 26, fontFamily: step2 ? 'Calibri-Italic' : 'Calibri', paddingLeft: 30, paddingTop: 10 }}>{'Testing'}</Text>
            {step2 && <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20, paddingTop: 10 }}>
              <Image source={Images.back} style={{ height: 30, width: 30 }} />
            </View>}
          </View>
        </TouchableOpacity>
        {step2 && <ScrollView style={styles.scroll}>
          <TouchableOpacity activeOpacity={1} onPress={() => console.log('dd')}>
            <Text style={[styles.textCollapse, { fontWeight: 'bold' }]}>Lorem ipsum dolor sit amet</Text>
            <Text style={styles.textCollapse}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</Text>
          </TouchableOpacity>

          <View style={styles.viewHeight}></View>
          <TouchableOpacity activeOpacity={1} onPress={() => console.log('dd')}>
            <Text style={[styles.textCollapse, { fontWeight: 'bold' }]}>Lorem ipsum dolor sit amet</Text>
            <Text style={styles.textCollapse}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</Text>
          </TouchableOpacity>

          <View style={styles.viewHeight}></View>
          <TouchableOpacity activeOpacity={1} onPress={() => console.log('dd')}>
            <Text style={[styles.textCollapse, { fontWeight: 'bold' }]}>Lorem ipsum dolor sit amet</Text>
            <Text style={styles.textCollapse}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</Text>
          </TouchableOpacity>

        </ScrollView>}
        <View style={styles.viewMenu}>
          <Text style={styles.msgMenu}>{'Shelters'}</Text>
        </View>
        <View style={styles.viewMenu}>
          <Text style={styles.msgMenu}>{'Government'}</Text>
        </View>
        <View style={[styles.viewMenu, { borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }]}>
          <Text style={styles.msgMenu}>{'Support Groups'}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.backgroundBlue} style={styles.image}>
        <View style={{ height: '6%' }}></View>
        <View style={styles.imagebox}><Image source={Images.logo4} style={styles.logo} /></View>
        <View style={{ height: '1%' }}></View>
        {step1 && <View style={styles.textView}>
          <Text style={styles.text}>How can we help you?</Text>
        </View>}
        <View style={{ height: '4%' }}></View>
        <AccordionList
          list={list}
          header={_head}
          body={_body}
          keyExtractor={item => `${item.id}`}
        />
        <View style={{ height: 130, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Animated.Text style={[styles.textMsg, { opacity: fadeAnim }]}>Have you just discovered you are pregnant?</Animated.Text>
          <Animated.Text style={[styles.textMsg, { opacity: fadeAnim2 }]}>Are you unsure of what do to or at a crossroads searching for answers,solutions or options?</Animated.Text>
          <Animated.Text style={[styles.textMsg, { opacity: fadeAnim3 }]}>You may think that there are only two options to purse if you have an unplanned pregnacy.</Animated.Text>
          <Animated.Text style={[styles.textMsg, { opacity: fadeAnim4 }]}>{'But there is a third option too. \n Are you interested in learning more about it?'}</Animated.Text>
        </View>
        <View style={{ height: '20%' }}></View>
        <View style={{ position: 'absolute', bottom: 20 }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 50, flexWrap: 'wrap' }}>
            <Button
              title={'Click here to speak with someone about adoption'}
              style={{ backgroundColor: '#00a9b7', height: 60, borderRadius: 10, justifyContent: 'center' }}
              textStyle={{ color: '#fff0a5', fontSize: 18, fontFamily: 'Calibri' }}
              onPress={() => NavigationService.navigate('InformationScreen')}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default HomeScreen;

