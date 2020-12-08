import React from 'react'
import { View } from 'react-native'
import { Picker,Text} from 'native-base'
import Style from './SelectStyle'
import SelectStyle from './SelectStyle'

const Select = ({ selected = '', list = [], onChange = () => { }, style = {}, label = '' ,editable = true }) => (
  <>
    {label ? <View style={SelectStyle.labelBox}><Text style={Style.labelStyle}>{label}</Text></View> : null}
    <View style={{ ...Style.select, ...style }}>
      <Picker note mode={'dropdown'} 
      selectedValue={selected} 
      onValueChange={onChange} 
      enabled={editable}
      placeholder="Selected Facility"
      placeholderStyle={Style.placeholderStyle}
      style={{ width: '100%' }}
      itemTextStyle={Style.textStyle}
      textStyle={Style.textStyle}
       >
        {list.map(({ label, value }) => (
          <Picker.Item label={label} key={value} value={value} />
        ))}
      </Picker>
    </View>
  </>
)
export default Select
