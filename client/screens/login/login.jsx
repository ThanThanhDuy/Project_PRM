import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import * as Google from 'expo-google-app-auth'
import Auth from '../../routes/auth/auth'
export default function login({ navigation }) {
  const handleGoogleSignIn = async () => {
    const config = {
      androidClientId:
        '966121416094-8mojvfgvqbrlidaiogbjqrob2di7p167.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    }

    Google.logInAsync(config)
      .then(result => {
        const { type, accessToken, user } = result
        if (type === 'success') {
          const { email, name, photoUrl } = user
          console.log(accessToken)
          console.log(user)
          navigation.navigate('Auth')
        } else {
          console.log('cancelled')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleGoogleSignIn} title="Google"></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeeff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
