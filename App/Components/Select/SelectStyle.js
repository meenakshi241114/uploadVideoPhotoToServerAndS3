import { StyleSheet } from 'react-native'
import { Colors ,Fonts} from 'App/Theme'

export default StyleSheet.create({
  select: {
    width: '94%',
    height: 40,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.borderDropdown,
    borderRadius: 5,
    marginHorizontal: '3%',
    justifyContent:'center',
    paddingTop:2
  },
  labelStyle: {
    fontSize: Fonts.fs14,
    fontWeight: 'bold',
    color: Colors.black
  },
  labelBox:{
    flexDirection:'row',
    marginHorizontal: '1%',
    marginBottom: '1.5%'
  },
  placeholderStyle: {
    fontSize: Fonts.fs14,
    fontWeight: 'bold',
    color: Colors.text,
    paddingLeft: 8
  },
  textStyle: {
    fontSize: Fonts.fs14,
    fontWeight: 'bold',
    color: Colors.black,
    paddingLeft: 8
  }
})
