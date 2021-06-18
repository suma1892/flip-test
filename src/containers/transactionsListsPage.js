import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { s } from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
import Modal from 'react-native-modal';
import { transactionListActions } from '../Redux/actions/transactions-list.actions';
import RadioForm from 'react-native-simple-radio-button';
import { dateFormat, moneyFormat } from '../utils';

export default function transactionListsPage() {

  const navigation = useNavigation();
  let [searchText, setSearch] = useState('');
  let [data1, setData] = useState([]);
  let [isVisible, setIsVisible] = useState(false);
  const isFirstRender = useRef(true);
  const [loader, setLoader] = useState(false);

  var radio_props = [
    { label: 'URUTKAN', value: 0 },
    { label: 'NAMA A-Z', value: 1 },
    { label: 'NAMA Z-A', value: 2 },
    { label: 'Tanggal Terbaru', value: 3 },
    { label: 'Tanggal Terlama', value: 4 },
  ];

  let [radioValue, setRadioValue] = useState(radio_props[0]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      setSearch('');
      setLoader(true);
      setRadioValue(radio_props[0]);

      let res = await transactionListActions(); // FUNCTION DAPETIN DATA LIST

      console.log('res = ', res);
      setData(res);
      setLoader(false)
    } catch (e) {
      setLoader(false)
    }
  }

  const renderItem = ({ item, props }) => {
    return (
      <Item item={item} props={props} />
    )
  }

  const Item = ({ item, props }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('detail', { data: item[0] })} // navigation.navigate('NAMA-SCREEN ada di file navigation.js, cari Stack.Screen -> name '); untuk navigasi pindah screen
      style={[s.View2]} >

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={[s.View6, { backgroundColor: item[0].status == 'SUCCESS' ? 'green' : 'orange' }]} />
        <View style={{ justifyContent: 'center', padding: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={s.Text2}>{item[0].beneficiary_bank}</Text>
            <IconOcticons name='arrow-right' size={20} color="black" />
            <Text style={s.Text2}>{item[0].sender_bank}</Text>
          </View>
          <Text style={s.Text3}>{item[0].beneficiary_name}</Text>
          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <Text style={s.Text3}>{moneyFormat(item[0].amount)}</Text>
            <IconOcticons name='primitive-dot' size={20} color="black" />
            <Text style={s.Text3}>{dateFormat(item[0].created_at)}</Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <Text style={item[0].status == 'SUCCESS' ? s.Text4 : s.Text5}>{item[0].status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  function onChangeRadio(value) {
    setRadioValue(radio_props[value])
    setIsVisible(!isVisible)
    if (value == 1) {
      sorting(data1, 'asc')
    } else if (value == 2) {
      sorting(data1, 'desc')
    } else if (value == 3) {
      sortByDate(data1, 'latest');
    } else if (value == 4) {
      sortByDate(data1, 'oldest');
    } else {

    }
  }

  function sorting(data, ket) {
    if (ket == 'asc') {
      data.sort(function (a, b) {
        if (a[0].beneficiary_name < b[0].beneficiary_name) { return -1; }
        if (a[0].beneficiary_name > b[0].beneficiary_name) { return 1; }
        return 0;
      })
    } else {
      data.sort(function (a, b) {
        if (a[0].beneficiary_name > b[0].beneficiary_name) { return -1; }
        if (a[0].beneficiary_name < b[0].beneficiary_name) { return 1; }
        return 0;
      })
    }
    setData(data);
    return 0;
  }

  function sortByDate(data, ket) {
    if (ket == 'latest') {
      data.sort(function (a, b) {
        var dateA = a[0].created_at.replace(/-/gi, "/");
        var dateB = b[0].created_at.replace(/-/gi, "/");
        if (new Date(dateA).getTime() < new Date(dateB).getTime()) { return -1 }
        if (new Date(dateA).getTime() > new Date(dateB).getTime()) { return 1 }
        return 0;
      })
    } else {
      data.sort(function (a, b) {
        var dateA = a[0].created_at.replace(/-/gi, "/");
        var dateB = b[0].created_at.replace(/-/gi, "/");
        if (new Date(dateA).getTime() > new Date(dateB).getTime()) { return -1 }
        if (new Date(dateA).getTime() < new Date(dateB).getTime()) { return 1 }
        return 0;
      })
    }
    setData(data);
    return 0;
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={{ backgroundColor: 'transparent', }}>
        <ProgressBar indeterminate visible={loader} color={Colors.red800} />
      </View>
      <View style={{ justifyContent: "center" }}>
        <Modal isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
        >
          <View style={s.View5}>
            <View style={{ padding: 30 }}>
              <RadioForm
                radio_props={radio_props}
                initial={radioValue.value}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={'orange'}
                animation={true}
                onPress={(value) => onChangeRadio(value)}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={s.View4}>
        <View style={{ flex: 1 }}>
          <Icon name={'magnifying-glass'} size={20} color={'grey'} />
        </View>
        <View style={{ flex: 9 }}>
          <TextInput
            placeholder={'Cari nama, bank, atau nominal'}
            autoCapitalize="none"
            value={searchText}
            style={{ fontSize: 12 }}
            // onChange={setSearchText}
          />

        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setIsVisible(!isVisible)} >
          <Text style={{ color: 'orange', fontSize: 12 }}>{radioValue.label || 'URUTKAN'}</Text>
          <Icon name={'chevron-thin-down'} size={13} color={'orange'} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data1}
        renderItem={renderItem}
        onRefresh={getData}
        refreshing={loader}
        keyExtractor={(item) => item[0].id}
        ListFooterComponent={<View style={{ marginTop: 10 }} />}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <Text>data tidak tersedia</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}