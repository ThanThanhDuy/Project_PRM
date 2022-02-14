import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/header/header'
export default function bag() {
  return (
    <View style={styles.container}>
      {/* header */}
      <Header string1="My Bag" string2="All book in here" />
      {/* my bag */}
      <View>
        {/* sub bag */}
        <View>
          <View>
            <Image source="" />
          </View>
          <View>
            <Text>TITLE1</Text>
            <Text>Author1</Text>
            <Text>Date Return: 2021/12/12</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 95
  }
})
