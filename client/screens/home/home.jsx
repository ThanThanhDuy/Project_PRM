import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import notification from '../../assets/icons/bell_solid.png'

import userApi from '../../api/user/userApi'
import { useRecoilValue } from 'recoil'
import { userState } from './../../store/user/user'
export default function home() {
  const user = useRecoilValue(userState)

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title1}>Hello, {user.familyName}!</Text>
          <Text style={styles.title2}>Bạn cần cuốn sách nào thế?</Text>
        </View>
        <View>
          <Image source={notification} />
        </View>
      </View>
      {/* main content */}
      <View style={styles.main}>
        <Text style={styles.popularCate}>Danh mục phổ biến</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  main: {
    marginTop: 20,
    marginLeft: 25
  },
  popularCate: {
    fontFamily: 'Roboto-medium',
    fontSize: 20
  }
})
