
import React, { useEffect } from 'react';
import { Text, View } from 'react-native'
import styles from './SplashScreenStyle'

// export default class SplashScreen extends React.Component {
//   render() {
//     return (
//       <View style={[styles.container]}>
//         <View style={styles.logo}>
//           <Text>Welcome To Video App</Text>
//         </View>
//       </View>
//     )
//   }
// }
const SplashScreen = (props) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      props.navigation.navigate('IntroScreen')
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.logo}>
        <Text>Welcome To Video App</Text>
      </View>
    </View>
  );
};

export default SplashScreen;