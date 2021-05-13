import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import api from '../Redux/Service/orderOfflineService';
export const OrderTableScreen = (props) => {
  const id = props.route.params.id;
  const [isRequest, setIsRequest] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [numberPeople, setNumberPeople] = useState('');
  const [note, setNote] = useState('');
  useEffect(() => {
    // handleBookTable();
  }, []);
  const handleBookTable = async () => {
    setIsRequest(true);
    const payload = {
      table_store_id: id,
      name: name,
      phone: phone,
      number_people: numberPeople,
      note: note,
    };
    try {
      const res = await api.bookTableWithStaff(payload);
      if (res.data.status == 1) {
        Alert.alert(
          'Thông báo',
          res.message,
          [
            {text: 'Hủy', onPress: () => {}},
            {
              text: 'Đồng ý',
              onPress: async () => {
                props.navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      }
      if (res.data.status == 0) {
        Alert.alert('Thông báo', res.data.message, {cancelable: false});
      }
    } catch (error) {
      console.log('fấd');
    } finally {
      setIsRequest(false);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TextInput
        value={name}
        style={{borderWidth: 1, marginTop: 10, height: 40}}
        onChangeText={(txt) => setName(txt)}
      />
      <TextInput
        value={phone}
        style={{borderWidth: 1, marginTop: 10, height: 40}}
        onChangeText={(txt) => setPhone(txt)}
      />
      <TextInput
        value={numberPeople}
        style={{borderWidth: 1, marginTop: 10, height: 40}}
        onChangeText={(txt) => setNumberPeople(txt)}
      />
      <TextInput
        value={note}
        style={{borderWidth: 1, marginTop: 10, height: 40}}
        onChangeText={(txt) => setNote(txt)}
      />
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={handleBookTable}>
        <Text>Đặt bàn</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableScreen);
