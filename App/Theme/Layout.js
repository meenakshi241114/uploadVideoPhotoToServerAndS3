/**
 * This file contains the application's layout controls.
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colCenter: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  spaceAround: {
    flex: 1,
    justifyContent: 'space-around',
  },
  spaceBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  colCross: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  colMain: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  crossCenter: {
    alignItems: 'center',
  },
  crossEnd: {
    alignItems: 'flex-end',
  },
  crossStart: {
    alignItems: 'flex-start',
  },
  fillCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rowCross: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  flexCol2: {
    width: '47%',
    marginHorizontal: '1.5%'
  },
  flexCol4: {
    width: '25%',
    marginHorizontal: '1%'
  },
  flexCol1: {
    width: '98%',
    marginHorizontal: '1%'
  },
  flexCol3: {
    width: '30%',
    marginHorizontal: '1.5%'
  },
  flexRow: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  flexStart:{
    flex:1,
    justifyContent:'flex-start'
  },
  flexEnd:{
    flex:1,
    justifyContent:'flex-end'
  }
})
