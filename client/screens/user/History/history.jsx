import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import {
  Button,
  Text,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider
} from 'native-base'
import calendar from '../../../assets/icons/calendar.png'
import calendar1 from '../../../assets/icons/calendar_1.png'
import arrow_right from '../../../assets/icons/arrow-right.png'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListBook from '../../../components/listBook/listBook'
export default function history({ navigation }) {
  const [history, setHistory] = React.useState([])
  const [bag, setBag] = React.useState([])
  const [showModal, setShowModal] = React.useState(false)
  React.useEffect(() => {
    const getHistory = async () => {
      const jsonValue = await AsyncStorage.getItem('@testHis2')
      if (jsonValue) {
        let history = JSON.parse(jsonValue)
        // console.log(history)
        setHistory(history)
      }
    }
    getHistory()
  }, [])
  return (
    <View style={{ flex: 1, paddingHorizontal: 25, paddingBottom: 95 }}>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('UserScreen')
          }}
        >
          <Ionicons name="arrow-back" size={32} color="#77808d" />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{
          marginRight: 5,
          marginLeft: 5
        }}
        keyExtractor={(item, index) => index.toString()}
        data={history}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: '100%',
              // height: 60,
              borderRadius: 10,
              marginBottom: '7%',
              backgroundColor: '#fff',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              marginTop: 10
            }}
            key={item.Id_nfc}
          >
            <TouchableOpacity
              onPress={() => {
                setBag(item.bag)
                setShowModal(true)
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Roboto-medium', fontSize: 18 }}>
                  {index}{' '}
                </Text>
                <FontAwesome5 name="hashtag" size={16} color="#fccc78" />
                <Text
                  style={{
                    fontSize: 16,
                    width: 250,
                    marginTop: 10,
                    paddingBottom: 10,
                    marginLeft: 5
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.idBag}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                  paddingHorizontal: 5
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 18, height: 18 }} source={calendar} />
                  <Text style={styles.txtDate1}>{item.dateBorrow}</Text>
                </View>
                <View>
                  <Image
                    style={{ width: 18, height: 18, marginHorizontal: 10 }}
                    source={arrow_right}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 18, height: 18 }} source={calendar1} />
                  <Text style={styles.txtDate1}>{item.dateReturn}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <FlatList
            style={{
              flexGrow: 0,
              flexShrink: 0
            }}
            // contentContainerStyle={{ height: 250 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={bag}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <View style={{ marginRight: 10 }}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri: item.Image
                    }}
                  />
                </View>
                <View style={{ width: '60%' }}>
                  <Text
                    style={styles.titleCard}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.Name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.txtAuthor}
                  >
                    {item.Author}
                  </Text>
                </View>
              </View>
            )}
          />
        </Modal>
      </Center>
    </View>
  )
}

const styles = StyleSheet.create({
  txtDate1: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
    marginBottom: 15,
    marginLeft: 10
  },
  card: {
    paddingTop: 12,
    paddingBottom: 12,
    shadowColor: '#77808d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 10
  },
  titleCard: {
    fontFamily: 'Roboto-medium',
    fontSize: 18,
    width: '100%'
  },
  txtAuthor: {
    fontFamily: 'Roboto-regular',
    fontSize: 14,
    color: '#77808d',
    marginTop: 5
  }
})
