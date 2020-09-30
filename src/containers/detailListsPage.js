import React from 'react';
import {
    SafeAreaView,
    View,
    Clipboard,
    TouchableOpacity,
    Text,
    ToastAndroid
  } from 'react-native';
import {s} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';
import {dateFormat, moneyFormat} from '../utils';
import {CustomView} from '../components/CustomView';
export default function detailListPage({route}) {
    const {data} = route.params;
    const nav = useNavigation()
    const copyToClipboard = (id) => {
      ToastAndroid.showWithGravity(
        "Copied to Clipboard!!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      Clipboard.setString(id)
    }
    
        return(
            <SafeAreaView style={{flex: 2}}>
              <View style={{backgroundColor:'white', paddingVertical: 20}}>
                <View style={{flexDirection:'row', alignItems:"center", padding: 20}}>
                  <Text style={s.Text6}>ID TRANSAKSI:#</Text>
                  <Text style={s.Text6}>{data.id}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(data.id)}>
                    <Icon name={'content-copy'} size={18} style={{paddingLeft: 5}} color={'orange'} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.1,
                  }}
                />
                <View style={{flexDirection:'row', alignItems:"center", padding: 20, justifyContent:'space-between'}}>
                  <Text style={s.Text6}>DETAIL TRANSAKSI</Text>
                  <TouchableOpacity onPress={()=>nav.goBack()}>
                    <Text style={{color:"orange"}}>Tutup</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.4,
                  }}
                />
                <View style={{padding: 20}}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                  <Text style={[s.Text2,{fontSize: 20}]}>{data.beneficiary_bank}</Text>
                  <IconOcticons name='arrow-right' size={20} color="black" />
                  <Text style={[s.Text2,{fontSize: 20}]}>{data.sender_bank}</Text>
                </View>
                <View style={{justifyContent:"space-between", flexDirection:'row'}}>
                  <View style={{ justifyContent:'space-between', paddingVertical: 10}}>
                    <CustomView 
                      header={data.beneficiary_name}
                      child={data.account_number}
                    />
                    <CustomView 
                      header={'BERITA TRANSFER'}
                      child={data.remark}
                    />
                    <CustomView 
                      header={'WAKTU DIBUAT'}
                      child={dateFormat(data.created_at)}
                    />
                    
                </View>

                  <View style={{padding: 10}}>
                      <CustomView 
                        header={'NOMINAL'}
                        child={moneyFormat(data.amount)}
                      />
                      <CustomView 
                        header={'KODE UNIK'}
                        child={data.unique_code}
                      />
                  </View>
                </View>
                </View>
              </View>
            </SafeAreaView>
        )
}

