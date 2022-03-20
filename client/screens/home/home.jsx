import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'

import React, { useState, useEffect } from 'react'
import notification from '../../assets/icons/bell_solid.png'
import addBag from '../../assets/icons/add.png'
import userApi from '../../api/user/userApi'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAppState, userGoogleState } from './../../store/user/user'
import { Link } from 'native-base'
import Header from '../../components/header/header'
import cateApi from '../../api/category/catetory'
import bookApi from '../../api/books/book'
import VARIABLES from '../../constants/index'
import { cateSelectedState } from '../../store/cate/cate'
import axiosCateApi from '../../api/category/axiosCateApi'
import axiosBookApi from '../../api/books/axiosBookApi'
import ListBook from '../../components/listBook/listBook'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { bookSelectToAddState } from '../../store/book/book'
export default function home({ navigation }) {
  const userGoogle = useRecoilValue(userGoogleState)
  const userApp = useRecoilValue(userAppState)
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])
  const [tostVisible, setToastVisible] = useState(false)
  const setBookSelectToAddState = useSetRecoilState(bookSelectToAddState)

  const setCateSelect = useSetRecoilState(cateSelectedState)
  useEffect(() => {
    const getCate = async () => {
      // get categories
      // axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
      const responseCate = await axiosCateApi.getCatePopular(userApp.Token)
      // const cate = await cateApi.getCate()
      const cateTmp = JSON.parse(responseCate.data)
      const data = cateTmp.map((item, index) => {
        return {
          ...item,
          color: VARIABLES.COLOR_CATE[index]
        }
      })
      setCategories(data && data.length > 6 ? data.slice(0, 6) : data)
      // get books
    }
    getCate()
    const paramApiBook = {
      pageSize: 20,
      pageIndex: 0
    }
    const getBook = async () => {
      // const book = await bookApi.getBook()
      // const responseCate = await axiosCateApi.getCatePopular(userApp.Token)
      const book = await axiosBookApi.getBookPopular(
        userApp.Token,
        paramApiBook
      )
      // console.log(book.data)
      setBooks(JSON.parse(book.data))
    }
    getBook()
  }, [])
  // handle category selected
  const handleCateSelected = async id => {
    setCateSelect(id)
    setTimeout(() => {
      navigation.navigate('Book')
    }, 400)
  }

  const handleAddBook = async book => {
    try {
      // clear
      // await AsyncStorage.clear()
      const jsonValue = await AsyncStorage.getItem('@myBag')
      let myBag = []
      // check in myBag have any book or not
      if (jsonValue) {
        myBag = JSON.parse(jsonValue)
        myBag.push(book)
        setBookSelectToAddState(myBag)
      } else {
        myBag.push(book)
        setBookSelectToAddState(myBag)
      }
      const json = JSON.stringify(myBag)
      await AsyncStorage.setItem('@myBag', json)
      // log temp
      const jsonValue2 = await AsyncStorage.getItem('@myBag')
      // console.log(JSON.parse(jsonValue2))
    } catch (e) {
      console.log('save local error')
    }
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Header
        string1={`Hello, ${userGoogle.familyName}`}
        string2={'What book do you need?'}
      />
      {/* popular categories */}
      <View style={styles.mainCate}>
        <Text style={styles.popularCate}>Popular categories</Text>
        <View style={styles.boxCate}>
          {categories.map(item => {
            return (
              <TouchableOpacity
                key={item.Id}
                activeOpacity={0.5}
                onPress={() => handleCateSelected(item.Id)}
              >
                <View
                  style={{
                    marginRight: 8,
                    marginBottom: 10,
                    backgroundColor: item.color,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 14,
                    paddingRight: 14,
                    borderRadius: 10
                  }}
                >
                  <Text style={styles.textCate}>{item.Name}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      {/* popular books */}
      <View style={styles.mainBook}>
        <Text style={styles.popularBook}>Popular books</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('see all')}
        >
          <View>
            <Text style={styles.textSeeAll}>See all</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* list book */}
      <ListBook books={books} handleAddBook={handleAddBook} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 95
  },

  mainCate: {
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25
  },
  mainBook: {
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  popularCate: {
    fontFamily: 'Roboto-medium',
    fontSize: 20,
    marginBottom: 10
  },
  popularBook: {
    fontFamily: 'Roboto-medium',
    fontSize: 20
  },
  boxCate: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textCate: {
    fontFamily: 'Roboto-medium',
    fontSize: 14,
    color: '#000',
    opacity: 0.7
  },
  textSeeAll: {
    textDecorationLine: 'underline',
    fontFamily: 'Roboto-regular'
  },
  tinyLogo: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10
  },
  textTitleBook: {
    fontFamily: 'Roboto-medium',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10
  }
})
