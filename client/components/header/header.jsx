import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import notification from '../../assets/icons/bell_solid.png'
export default function header(props) {
  const { string1, string2 } = props
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title1}>{string1}</Text>
        <Text style={styles.title2}>{string2}</Text>
      </View>
      <View>
        <Image source={notification} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
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
  }
})
