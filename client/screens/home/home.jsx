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
export default function home({ navigation }) {
  const userGoogle = useRecoilValue(userGoogleState)
  const userApp = useRecoilValue(userAppState)
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])

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
    }
    getCate()
  }, [])
  // handle category selected
  const handleCateSelected = async id => {
    setCateSelect(id)
    setTimeout(() => {
      navigation.navigate('Book')
    }, 400)
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
      {/* <FlatList
        contentContainerStyle={{
          marginRight: 25,
          marginLeft: 25
        }}
        keyExtractor={(item, index) => index.toString()}
        data={books}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: '47%',
              height: 250,
              borderRadius: 10,
              marginBottom: '7%',
              marginRight: index % 2 === 0 ? '3%' : '0%',
              marginLeft: index % 2 !== 0 ? '3%' : '0%',
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
              style={{ height: '100%', width: '100%' }}
              activeOpacity={0.7}
              onPress={() => console.log('book' + item.Id_nfc)}
            >
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.Image
                }}
              />
              <View style={{ width: '100%', alignItems: 'flex-start' }}>
                <Text
                  style={styles.textTitleBook}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.Name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log('add to cart')}
              style={{
                position: 'absolute',
                bottom: -16
              }}
            >
              <Image source={addBag} />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      /> */}
      <ListBook books={books} />
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
