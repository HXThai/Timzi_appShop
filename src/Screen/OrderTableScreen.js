import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import api from '../Redux/Service/orderOfflineService';
import Color from '../Theme/Color';
export const OrderTableScreen = (props) => {
  const id = props.route.params.id;
  const [isRequest, setIsRequest] = useState(false);
  const [name, setName] = useState('Khách vãng lai');
  const [phone, setPhone] = useState('');
  const [numberPeople, setNumberPeople] = useState('');
  const [note, setNote] = useState('');
  useEffect(() => {
    // handleBookTable();
    // return () => {
    //   console.log('thai meo');
    // };
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
        reactotron.log(res);
        Alert.alert(
          'Thông báo',
          res.data.message,
          [
            {text: 'Hủy', onPress: () => {}},
            {
              text: 'Đồng ý',
              onPress: async () => {
                // props.navigation.goBack();
                props.navigation.reset({
                  routes: [{name: 'Utilities'}],
                });
                props.navigation.navigate('Utilities');
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
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10}}>
      <Text style={{marginTop: 15}}>Tên người đặt (Bắt buộc)</Text>
      <TextInput
        value={name}
        style={{
          borderWidth: 1,
          marginTop: 5,
          height: 40,
          padding: 5,
          borderRadius: 6,
        }}
        onChangeText={(txt) => setName(txt)}
      />
      <Text style={{marginTop: 15}}>Số điện thoại</Text>
      <TextInput
        value={phone}
        style={{
          borderWidth: 1,
          marginTop: 5,
          height: 40,
          padding: 5,
          borderRadius: 6,
        }}
        onChangeText={(txt) => setPhone(txt)}
      />
      <Text style={{marginTop: 15}}>Số người</Text>
      <TextInput
        value={numberPeople}
        style={{
          borderWidth: 1,
          marginTop: 5,
          height: 40,
          padding: 5,
          borderRadius: 6,
        }}
        onChangeText={(txt) => setNumberPeople(txt)}
      />
      <Text style={{marginTop: 15}}>Ghi chú</Text>
      <TextInput
        multiline={true}
        value={note}
        style={{
          borderWidth: 1,
          marginTop: 5,
          height: 80,
          padding: 5,
          borderRadius: 6,
        }}
        onChangeText={(txt) => setNote(txt)}
      />
      <Text></Text>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          borderRadius: 8,
          backgroundColor: Color.main,
          padding: 5,
          height: 40,
        }}
        onPress={handleBookTable}>
        <Text style={{color: Color.white}}>Đặt bàn</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableScreen);
