import React from 'react'
import { View } from 'react-native';
import Style from './AppointmentScreenStyle'
import Button from '../../Components/ButtonBox';

const PageHeader = ({ date }) => (
  <View style={Style.headerContainer}>
    <View style={{ flex: 1, paddingRight: 10 }} >
      <Button
        title={date}
        onPress={() => alert('Date selected')}
        style={{flex:1,alignContent:'center',justifyContent:'center'}}
      />
    </View>
    <View>
      <Button
        title={'Add walk in'}
        onPress={() => alert('Coming Soon')}
      />
    </View>
  </View>
)

export default PageHeader
