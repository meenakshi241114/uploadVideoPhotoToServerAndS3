import React from 'react'
import { View, Image, Text } from 'react-native';
import Style from './AppointmentScreenStyle'
import { Layout, Images } from '../../Theme';
import Button from '../../Components/ButtonBox';

const PageFooter = ({ label, value }) => (
  <View style={[Style.footerInner, Layout.row]}>
    <View style={[Layout.flexCol3, { width: '25%' }]}>
      <View style={Layout.row}>
        <Image source={Images.leftArrowGrey} style={Style.imageStyle} />
        <Image source={Images.leftArrowGreen} style={Style.imageStyle} />
      </View>
    </View>
    <View style={[Layout.flexCol3, { width: '50%' }]}>
      <View style={Layout.row}>
        <Text style={[Style.footerTxt, { paddingLeft: 20 }]}>{label} {value}</Text>
      </View>
    </View>
    <View style={[Layout.flexCol3, { width: '25%' }]}>
      <View style={Layout.row}>
        <Image source={Images.rightArrowGrey} style={[Style.imageStyle, { marginLeft: 10 }]} />
        <Image source={Images.rightArrowGreen} style={Style.imageStyle} />
      </View>
    </View>
  </View>
)

export default PageFooter