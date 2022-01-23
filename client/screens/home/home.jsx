import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import noti from '../../assets/icons/bell_solid.png'
export default function home() {
  return (
    <View style={styles.container}>
      <View style={styles.mainScreen}>
        <View>
          <Text style={styles.title1}>Hi, Duy!</Text>
          <Text style={styles.title2}>Ready to read some book?</Text>
        </View>
        <View>
          <Image source={noti} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mainScreen: {
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title1: {
    fontFamily: 'Poppins-bold',
    fontSize: 30
  },
  title2: {
    fontFamily: 'Poppins-regular',
    fontSize: 14
  }
})
