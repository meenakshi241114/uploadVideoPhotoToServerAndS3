import { createAppContainer, createStackNavigator } from 'react-navigation'

import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import IntroScreen from 'App/Containers/Intro/IntroScreen';
import SliderScreen from 'App/Containers/Sliders/SliderScreen';
import NarativeScreen from 'App/Containers/Narative/NarativeScreen';
import InformationScreen from 'App/Containers/Information/InformationScreen';
import HomeScreen from 'App/Containers/Home/HomeScreen';

const StackNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    IntroScreen: IntroScreen,
    MainScreen: SplashScreen,
    SliderScreen: SliderScreen,
    NarativeScreen: NarativeScreen,
    InformationScreen: InformationScreen,
    HomeScreen: HomeScreen
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
