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
import { userState } from './../../store/user/user'
import { Link } from 'native-base'
import Header from '../../components/header/header'
import cateApi from '../../api/category/catetory'
import bookApi from '../../api/books/book'
import VARIABLES from '../../constants/index'
import { cateSelectedState } from '../../store/cate/cate'
export default function home({ navigation }) {
  const user = useRecoilValue(userState)

  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])

  const setCateSelect = useSetRecoilState(cateSelectedState)
  useEffect(() => {
    const getCate = async () => {
      // get categories
      const cate = await cateApi.getCate()
      const data = cate.map((item, index) => {
        return {
          ...item,
          color: VARIABLES.COLOR_CATE[index]
        }
      })
      setCategories(data)
      // get books
      const getBook = async () => {
        const book = await bookApi.getBook()
        setBooks(book)
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
        string1={`Hello, ${user.familyName}`}
        string2={'What book do you need?'}
      />
      {/* popular categories */}
      <View style={styles.mainCate}>
        <Text style={styles.popularCate}>Popular categories</Text>
        <View style={styles.boxCate}>
          {categories.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.5}
                onPress={() => handleCateSelected(item.id)}
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
                  <Text style={styles.textCate}>{item.name}</Text>
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
      <FlatList
        contentContainerStyle={{
          marginRight: 25,
          marginLeft: 25
        }}
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
          >
            <TouchableOpacity
              style={{ height: '100%', width: '100%' }}
              activeOpacity={0.7}
              onPress={() => console.log('book' + item.id)}
            >
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.image
                }}
              />
              <View style={{ width: '100%', alignItems: 'flex-start' }}>
                <Text
                  style={styles.textTitleBook}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name}
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
      />
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
