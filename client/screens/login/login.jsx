import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native'
// UI
import { Spinner, HStack, Heading } from 'native-base'
// Icon
import { Ionicons } from '@expo/vector-icons'

import React, { useEffect, useState } from 'react'
// google
import * as Google from 'expo-google-app-auth'
// logo
import logo from '../../assets/image/logo_fpt.png'
// state
import { useSetRecoilState } from 'recoil'
// state user data
import { userAccessTokenState, userState } from '../../store/user/user'
// variables
import VARIABLES from '../../constants/index'

export default function login({ navigation }) {
  const setUser = useSetRecoilState(userState)
  const userAccessToken = useSetRecoilState(userAccessTokenState)
  const [modalVisible, setModalVisible] = useState(false)

  //handle login
  const handleGoogleSignIn = async () => {
    const config = {
      androidClientId: VARIABLES.ANDROIDCLIENTID,
      iosClientId: VARIABLES.IOSCLIENTID,
      scopes: ['profile', 'email']
    }

    Google.logInAsync(config)
      .then(result => {
        const { type, accessToken, user } = result
        if (type === 'success') {
          setUser(user)
          userAccessToken(accessToken)
          setModalVisible(true)
          // change screen to home
          setTimeout(() => {
            navigation.navigate('Auth')
            setModalVisible(false)
          }, 1500)
        } else {
          Alert.alert('Log in Failed', 'Please check again', [
            {
              text: 'OK'
            }
          ])
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxLogin}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity opacity={0.9} onPress={handleGoogleSignIn}>
          <View style={styles.button}>
            <Ionicons name="logo-google" size={24} color="#fff" />
            <Text style={styles.textLogin}>Login with @fpt.edu.vn</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.boxVersion}>
        <Text style={styles.textVersion}>Version 0.0.1</Text>
      </View>
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.modal}>
          <HStack space={2} justifyContent="center" style={styles.boxModal}>
            <Spinner color="#fff" />
            <Heading color="#fff" fontSize="md">
              Please wait...
            </Heading>
          </HStack>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  logo: {
    width: 220,
    height: 60,
    marginBottom: 20
  },
  button: {
    height: 50,
    backgroundColor: '#19224C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  textLogin: {
    fontFamily: 'Roboto-medium',
    color: '#fff',
    fontSize: 16,
    marginLeft: 10
  },
  boxLogin: {
    flex: 1,
    justifyContent: 'center'
  },
  boxVersion: {
    bottom: 100
  },
  textVersion: {
    fontFamily: 'Roboto-medium',
    fontSize: 14
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxModal: {
    top: '50%'
  }
})
