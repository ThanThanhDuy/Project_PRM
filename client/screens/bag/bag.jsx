import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React from 'react'
import Header from '../../components/header/header'
import trash from '../../assets/icons/trash.png'
import axiosBookApi from '../../api/books/axiosBookApi'
import { userAppState } from '../../store/user/user'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import calendar from '../../assets/icons/calendar.png'
import calendar1 from '../../assets/icons/calendar_1.png'
import arrow_right from '../../assets/icons/arrow-right.png'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { bookSelectToAddState } from '../../store/book/book'
export default function bag({ navigation }) {
  const [books, setBooks] = React.useState([])
  let bookSelectToAdd = useRecoilValue(bookSelectToAddState)
  const setBookSelectToAddState = useSetRecoilState(bookSelectToAddState)
  const [dateBorrow, setDateBorrow] = React.useState(
    moment(new Date()).format('YYYY-MM-DD')
  )
  const [dateReturn, setDateReturn] = React.useState(
    moment(dateBorrow).add(6, 'days').format('YYYY-MM-DD')
  )
  const userApp = useRecoilValue(userAppState)

  React.useEffect(() => {
    const getMyBag = async () => {
      const jsonValue = await AsyncStorage.getItem('@myBag')
      const myBag = JSON.parse(jsonValue)
      // console.log(bookSelectToAdd ? true : false)
      setBooks(
        myBag &&
          bookSelectToAdd &&
          myBag.length > 0 &&
          myBag.length > bookSelectToAdd.length
          ? myBag
          : bookSelectToAdd
      )
    }
    getMyBag()
  }, [bookSelectToAdd])

  // handle remove book in bag
  const handleRemoveBook = async id_nfc => {
    console.log(id_nfc)
    const jsonValue = await AsyncStorage.getItem('@myBag')
    let myBag = JSON.parse(jsonValue)
    myBag.forEach(item => {
      if (item.Id_nfc === id_nfc) {
        myBag.splice(myBag.indexOf(item), 1)
      }
    })
    const json = JSON.stringify(myBag)
    await AsyncStorage.setItem('@myBag', json)
    let bookSelectToAddTmp = [...bookSelectToAdd]
    bookSelectToAddTmp.forEach(item => {
      if (item.Id_nfc === id_nfc) {
        bookSelectToAddTmp.splice(bookSelectToAddTmp.indexOf(item), 1)
      }
    })
    setBookSelectToAddState(bookSelectToAddTmp)
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Header string1="My Bag" string2="All book in here" />
      {/* my bag */}
      <FlatList
        style={{
          marginLeft: 15,
          marginRight: 15,
          padding: 10,
          marginTop: 10,
          Bottom: 20
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={books}
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleRemoveBook(item.Id_nfc)}
              style={{
                position: 'absolute',
                bottom: 15,
                right: 15
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20
                }}
                source={trash}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {books && books.length > 0 && (
        <View
          style={{
            backgroundColor: '#fff',
            height: 120,
            shadowColor: '#ccc',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            backgroundColor: '#fff',
            paddingLeft: 25,
            paddingRight: 25
          }}
        >
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
              <Text style={styles.txtDate1}>{dateBorrow}</Text>
            </View>
            <View>
              <Image
                style={{ width: 18, height: 18, marginHorizontal: 10 }}
                source={arrow_right}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image style={{ width: 18, height: 18 }} source={calendar1} />
              <Text style={styles.txtDate1}>{dateReturn}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('Book')
              }}
            >
              <View style={styles.btnAddMore}>
                <Text style={{ color: '#ff9c99', fontFamily: 'Roboto-medium' }}>
                  Add more
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.btnBorrow}>
                <Text style={{ color: '#fff', fontFamily: 'Roboto-medium' }}>
                  Borrow
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 95
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
  },
  txtDate1: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
    marginBottom: 15,
    marginLeft: 10
  },
  txtDate2: {
    fontFamily: 'Roboto-regular',
    fontSize: 16
  },
  btnChekcOut: {
    backgroundColor: '#f7b731',
    borderRadius: 10,
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5
  },
  btnAddMore: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    borderColor: '#ff9c99'
  },
  btnBorrow: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ff9c99',
    width: 150,
    alignItems: 'center',
    borderColor: '#ff9c99'
  }
})
