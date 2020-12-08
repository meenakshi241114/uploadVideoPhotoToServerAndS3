import { StyleSheet } from 'react-native'
import { Colors,Fonts } from 'App/Theme'

export default StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Colors.borderBtn,
  },
  text: {
    color: Colors.bottonTxt,
    fontSize: Fonts.fs12,
    textAlign: 'center',
    fontWeight: 'bold',
    //textTransform: 'capitalize'
  },
})
