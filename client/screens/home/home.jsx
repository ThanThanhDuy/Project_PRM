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
import { useRecoilValue } from 'recoil'
import { userState } from './../../store/user/user'
import { Link } from 'native-base'
export default function home() {
  const user = useRecoilValue(userState)
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Science - Technology',
      color: '#aed8af'
    },
    {
      id: 2,
      name: 'Business - Finance',
      color: '#dedede'
    },
    {
      id: 3,
      name: 'Music',
      color: '#fbd3d3'
    },
    {
      id: 4,
      name: 'Health',
      color: '#e2d1fd'
    },
    {
      id: 5,
      name: 'Lifestyle',
      color: '#efd6b9'
    },
    {
      id: 6,
      name: 'Others',
      color: '#fccc78'
    }
  ])
  const a = [
    {
      key: 1,
      title: 'Getting Things Done : The Art of Stress-Free Productivity',
      image:
        'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/9/7/9780143126560.jpg'
    },
    {
      key: 2,
      title: 'Blue Ocean Strategy, Expanded Edition',
      image:
        'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/i/m/image_181251.jpg'
    },
    {
      key: 3,
      title: `Help Them Grow Or Watch Them Go`,
      image:
        'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/i/m/image_194977.jpg'
    },
    {
      key: 4,
      title: 'Kỷ Luật Làm Nên Con Người',
      image:
        'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/k/l/kllncn.jpg'
    },
    {
      key: 5,
      title: 'Phá Vỡ Giới Hạn Để Không Hoài Phí Tuổi Trẻ ',
      image:
        'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/p/h/ph_-v_-gi_i-h_n-_-kh_ng-ho_i-ph_-tu_i-tr__b_a-1.jpg'
    }
  ]

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title1}>Hello, {user.familyName}!</Text>
          <Text style={styles.title2}>What book do you need?</Text>
        </View>
        <View>
          <Image source={notification} />
        </View>
      </View>
      {/* popular categories */}
      <View style={styles.mainCate}>
        <Text style={styles.popularCate}>Popular categories</Text>
        <View style={styles.boxCate}>
          {categories.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.5}
                onPress={() => console.log(item.id)}
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
        data={a}
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
              onPress={() => console.log(item.key)}
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
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log('add to cart')}
              style={{
                position: 'absolute',
                bottom: -14
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
  header: {
    marginTop: 60,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title1: {
    fontFamily: 'Roboto-bold',
    fontSize: 30
  },
  title2: {
    fontFamily: 'Roboto-regular',
    fontSize: 14,
    marginTop: 3
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
