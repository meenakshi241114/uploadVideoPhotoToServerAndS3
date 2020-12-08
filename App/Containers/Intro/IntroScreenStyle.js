import { StyleSheet } from 'react-native'
import { Colors ,Fonts} from 'App/Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  image: {
    flex: 1
  },
  imagebox1: {
    position: 'absolute',
    top: 260,
  },
  imagebox2: {
    position: 'absolute',
    top: 300,
    paddingHorizontal: 30
  },
  imagebox3: {
    position: 'absolute',
    top: 300,
    paddingHorizontal: 50
  },
  imagebox4: {
    position: 'absolute',
    top: 300,
    paddingHorizontal: 70
  },
  imagebox5: {
    position: 'absolute',
    top: -200,
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  text: {
    color: "#00a9b7",
    fontSize: 30,
    fontFamily: 'Calibri',
    paddingTop: 5
  },
  textView: {
    paddingTop: 300
  }
})
