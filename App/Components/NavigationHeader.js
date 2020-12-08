import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Images, Colors,Fonts} from 'App/Theme'

const NavigationHeader = ({ props, label }) => (
    <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.goBack()} style={styles.iconBar}>
                <Image source={Images.arrow} style={{width: 25}} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.label}>{label}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.calenderRight} style={{ width: 25, height: 25, marginRight: 10 }} resizeMode="contain" />
            <Image source={Images.calenderCross} style={{ width: 25, height: 25 }} resizeMode="contain" />
        </View>
    </View>
)

const styles = StyleSheet.create({
    header: { 
        backgroundColor: Colors.header,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    iconBar: {
        paddingRight: 10
    },
    label: {
        color: Colors.white,
        fontSize: Fonts.fs18,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
});

export default NavigationHeader
