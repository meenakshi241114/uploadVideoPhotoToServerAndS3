import { StyleSheet } from 'react-native'
import { Colors ,Fonts} from 'App/Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover"
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
  },

  text: {
    color: "#00a9b7",
    fontSize: 35,
    fontFamily: 'Calibri-Italic'
  },
  text1: {
    color: "#00a9b7",
    fontSize: 24,
    fontFamily: 'Calibri-Italic'
  },
  textView: {
    marginHorizontal: 20
  },
  btnStyle:{
    backgroundColor: '#00a9b7', 
    height: 40, 
    borderRadius: 10, 
    width: 110, 
    justifyContent: 'center'
  }
})
