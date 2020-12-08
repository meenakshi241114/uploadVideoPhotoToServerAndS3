import { StyleSheet } from 'react-native'
import { Colors ,Fonts} from 'App/Theme'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    backgroundColor: Colors.header,
    paddingBottom: 15
  },
  headerContainer: {
    backgroundColor: Colors.white, 
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  footerInner: {
    width:'90%',
    paddingHorizontal:'5%',
    borderTopWidth: 1,
    paddingTop:5, 
    borderTopColor: Colors.hLine
  },
  hLine:{
    height: 1, 
    backgroundColor: Colors.hLine,
    width: '100%'
  },
  imageStyle: {
    height: 40, 
    width: 40, 
    marginTop: 20, 
    marginLeft: 0,
    marginRight: 10
  },
  footerTxt: {
    textAlign: 'center', 
    paddingVertical: 35,
    fontStyle:'italic' 
  },
  list: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageBox:{
    position: 'absolute', 
    flexDirection: 'row', 
    flex: 1, 
    top: 10, 
    right:5, 
    width: 100, 
    zIndex: 1
  },
  slotTxt:{
    color: Colors.text,
    fontSize:Fonts.fs12,
    fontWeight:'bold'
  }
})
