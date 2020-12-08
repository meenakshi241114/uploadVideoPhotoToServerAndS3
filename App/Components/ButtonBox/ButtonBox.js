import React from 'react'
import { Button, Text, Spinner } from 'native-base'
import Style from './ButtonBoxStyle'
import { Colors, ApplicationStyles } from 'App/Theme'

const ButtonBox = ({ style, textStyle,onPress, title, disabled = false, loading=false, selected=false, children=[]}) => {
	let textStyleNode = selected ? { ...Style.text, ...textStyle, ...Style.selectedText} : { ...Style.text, ...textStyle};
	let buttonStyleNode = selected ? { ...Style.button, ...style, ...Style.selectedButton } : { ...Style.button, ...style };
	let textNode = (<Text style={textStyleNode}>{title}</Text>);
	textNode = title ? textNode : [];

	return (
	  <Button disabled={disabled} style={buttonStyleNode}  onPress={onPress}>
	   {!loading ? children : []}
	   {loading ? (<Spinner color={Colors.white} />) : textNode}
	  </Button>
	)
}

export default ButtonBox
