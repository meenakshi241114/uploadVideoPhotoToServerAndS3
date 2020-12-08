import React from "react";
import { Text, View, Image, SafeAreaView, TextInput, FlatList } from 'react-native'
import { connect } from 'react-redux'
import AppointmentsActions from 'App/Stores/Appointments/Actions'
import Style from './AppointmentScreenStyle'
import { Images } from '../../Theme'
import NavigationHeader from '../../Components/NavigationHeader'
import Select from 'App/Components/Select';
import Button from '../../Components/ButtonBox';
import AppStyle from 'App/Theme/ApplicationStyles';
import { HelperService } from 'App/Services/Utils/HelperService'
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

class AppointmentScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }
  componentDidMount() {
    this.props.fetchAppointments()
  }
  bookAppointment = (slot) => {
    alert('Your slot has been booked');
  }
  renderItem = ({ item, index }) => {
    console.log('items', item)
    var item = item[0];
    let appointment = item.appointment;
    return (
      <View>
        <View style={Style.list}>
          <View><Text style={Style.slotTxt}>{HelperService.getSlot(item.slot)}</Text></View>
          <View style={{ width: '60%' }}>
            {(appointment !== null && appointment.appointmentType == 'VIRTUAL') ?
              <View style={Style.imageBox}>
                <Image source={Images.virtual} resizeMode="contain" style={{ width: 50, height: 19 }} />
                <Image source={Images.virtual} resizeMode="contain" style={{ width: 50, height: 19 }} />
              </View> : null}
            {appointment === null ? <Button
              title={'Book Appointment'}
              onPress={() => this.bookAppointment()}
            /> : <TextInput
                onChangeText={(value) => this.setState({ name: value })}
                value={appointment !== null ? HelperService.displayFullName(appointment.patient) : ''}
                editable={false}
                style={[AppStyle.textInput, { color: 'grey' }, (appointment !== null && appointment.appointmentType == 'VIRTUAL') && { paddingRight: 110 }]}
              />
            }
          </View>

          <View style={{ width: 50 }}>
            {appointment !== null ? <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
              <Image source={Images.edit} style={{ height: 20, width: 21, marginRight: 20 }} resizeMode="contain" />
              <Image source={Images.delete} style={{ height: 20, width: 15 }} resizeMode="contain" /></View> : null}
          </View>
        </View>
        <View style={[Style.hLine, { height: 0.8 }]}></View>
      </View>
    )
  };
  render() {
    return (
      <SafeAreaView style={Style.mainContainer}>
        <NavigationHeader label="appointment" props={this.props} />
        <View style={Style.searchContainer}>
          <Select
            list={[]}
            // selected={'Selected'}
            onChange={(value) => {
              this.setState({ keyword: value })
            }}
          />
        </View>
        <PageHeader date={this.props.slots && this.props.slots.dates ? HelperService.getFormatedDate(this.props.slots.dates[0]) : ''} />
        <View style={Style.hLine}></View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.slots.slotAppointments}
            keyExtractor={(item, index) => {
              return item + index;
            }}
            style={{ paddingBottom: 100 }}
            renderItem={this.renderItem}
          />
        </View>
        <PageFooter label={'Patients in Queue:'} value={'4/5'} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({
  slots: state.appointments.appointments,
  appointmentsIsLoading: state.appointments.appointmentsIsLoading,
  appointmentsErrorMessage: state.appointments.appointmentsErrorMessage
})

const mapDispatchToProps = (dispatch) => ({
  fetchAppointments: () => dispatch(AppointmentsActions.fetchAppointments()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentScreen)
