import { Platform, ToastAndroid, NativeModules, Alert } from 'react-native';
import NavigationService from "../NavigationService";
import moment from 'moment';

function showToast({ message = '', buttonText = 'Okay', duration = 1000, position = "bottom" }) {
	if (Platform.OS == 'android') {
		ToastAndroid.show(
			message,
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM
		);
	}
	else {
		alert(message);
	}
}
function showToastProject({ message = '', buttonText = 'Okay', duration = 1000, position = "bottom" }) {
	if (Platform.OS == 'android') {
		ToastAndroid.show(
			message,
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM
		);
	}
	else {
		Alert.alert(
			'',
			message,
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{
					text: 'Go To List', onPress: () => {
						NavigationService.navigate('ProjectList');
					},
				}
			],
			{ cancelable: false }
		)
	}
}

function getSlot(slot) {
	let hour = slot.substr(0, 2);
	let suffix = hour >= 12 ? "PM" : "AM";
	return `${slot} ${suffix}`;
	//var hours = ((hour + 11) % 12 + 1) + suffix
}
function displayFullName(patient) {
	let firstName = patient.firstName !== null ? patient.firstName : '';
	let lastName = patient.lastName !== null ? patient.lastName : '';
	return `${firstName} ${lastName}`;
	//var hours = ((hour + 11) % 12 + 1) + suffix
}
function getFormatedDate(date) {
	return moment(date).format('DD MMMM YYYY');
	//var hours = ((hour + 11) % 12 + 1) + suffix
}
function formatUSNumber(entry = '') {
	const match = entry
		.replace(/\D+/g, '').replace(/^1/, '')
		.match(/([^\d]*\d[^\d]*){1,10}$/)[0]
	const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match
	const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : ''
	const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : ''
	return `${part1}${part2}${part3}`
}


export const HelperService = {
	showToastProject,
	showToast,
	getSlot,
	displayFullName,
	getFormatedDate,
	formatUSNumber
}
