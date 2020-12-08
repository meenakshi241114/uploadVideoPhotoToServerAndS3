import { StyleSheet } from 'react-native'
import { Colors ,Fonts} from 'App/Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  viewFirst:{
    flexDirection: 'row', 
    marginHorizontal: 20, 
    backgroundColor: '#ffffff', 
    height: 50, 
    marginTop: 0, 
    borderTopColor: '#00a9b7', 
    borderTopWidth: 2
  },
  scroll:{
    marginHorizontal: 20, 
    backgroundColor: '#ffffff', 
    marginTop: 20, 
    height: '60%', 
    borderRadius: 10
  },
  viewHeight:{
    height: 2, 
    backgroundColor: 'grey', 
    width: '90%', 
    marginVertical: 40, 
    marginHorizontal: 20 
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
    fontFamily: 'Calibri-Italic',
    paddingTop: 5,
    textAlign: 'center'
  },
  textView: {
    marginHorizontal: 20
  },
  textMsg: {
    textAlign: 'center',
    color: "#00a9b7",
    fontSize: 25,
    fontFamily: 'Calibri',
    position: 'absolute'
  },
  textCollapse: {
    color: 'grey',
    fontSize: 26,
    fontFamily: 'Calibri',
    paddingLeft: 30,
    paddingTop: 10
  },
  msgMenu: {
    color: '#00a9b7',
    fontSize: 26,
    fontFamily: 'Calibri',
    paddingLeft: 30,
    paddingTop: 10
  },
  viewMenu: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    height: 50,
    marginTop: 2,
    borderTopColor: '#00a9b7',
    borderTopWidth: 2
  },
  viewHead:{
    flexDirection: 'row', 
    marginHorizontal: 20, 
    marginTop: 10, 
    backgroundColor: '#fff0a5', 
    height: 55, 
    borderRadius: 15
  },
  textHead:{
    color: '#00a9b7', 
    fontSize: 26, 
    fontFamily: 'Calibri', 
    paddingLeft: 30, 
    paddingTop: 10
  }
})
