/**
 * This file contains the application's global style.
 */
import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Theme'

export default StyleSheet.create({

  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.borderBtnText,
    fontSize: 20,
    fontFamily:'Calibri-Italic',
    // fontWeight: 'bold',
    textTransform: 'capitalize',
    paddingLeft: 15
  }
});
