import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native'
// UI
import {
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Center,
  Spinner,
  Heading,
  Stack,
  Slide
} from 'native-base'
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
import {
  googleAccessTokenState,
  userGoogleState,
  userAppState
} from '../../store/user/user'
// variables
import VARIABLES from '../../constants/index'
import axiosUserApi from '../../api/user/axiosUserApi'
import axios from 'axios'

export default function login({ navigation }) {
  const setGoogleUser = useSetRecoilState(userGoogleState)
  const setAppUser = useSetRecoilState(userAppState)
  const setGoogleAccessToken = useSetRecoilState(googleAccessTokenState)
  const [modalVisible, setModalVisible] = useState(false)
  const [tostVisible, setToastVisible] = useState(false)

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
          setModalVisible(true)
          const param = {
            em: user.email
          }
          const data = axiosUserApi.checkUser(param)
          data
            .then(res => {
              console.log(JSON.parse(res.data))
              if (res && res.data) {
                if (JSON.parse(res.data).Role_id === 'ST') {
                  // change screen to home
                  setAppUser(JSON.parse(res.data))
                  setGoogleAccessToken(accessToken)
                  setGoogleUser(user)
                  setTimeout(() => {
                    navigation.navigate('Auth')
                    setModalVisible(false)
                  }, 1500)
                } else {
                  throw new Error('You are not student')
                }
              }
            })
            .catch(err => {
              setModalVisible(false)
              setToastVisible(true)
              console.log(err)
              setTimeout(() => {
                setToastVisible(false)
              }, 3000)
            })
        } else {
          setToastVisible(true)
          setTimeout(() => {
            setToastVisible(false)
          }, 3000)
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
        <View style={styles.boxNameApp}>
          <Text style={styles.txtNameApp}>
            <Text style={{ color: '#fccc78' }}>Library</Text>{' '}
            <Text style={{ color: '#fccc78' }}>Assistant</Text>
          </Text>
          <Text style={styles.txtNameApp}>
            <Text style={{ color: '#fccc78' }}>Student</Text>
          </Text>
        </View>
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
      {/* Modal waiting */}
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
      {/* tost */}
      <Slide in={tostVisible} style={{ alignItems: 'center' }}>
        <Center style={styles.tostBox}>
          <Stack space={3} w="90%" maxW="400">
            <Alert w="100%" status="warning">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <Center>
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon />
                      <Text fontSize="md" color="coolGray.800">
                        Log in Failed!
                      </Text>
                    </HStack>
                  </Center>
                  <IconButton
                    onPress={() => setToastVisible(false)}
                    style={{ marginRight: 8 }}
                    variant="unstyled"
                    icon={<CloseIcon size="3" color="coolGray.600" />}
                  />
                </HStack>
              </VStack>
            </Alert>
          </Stack>
        </Center>
      </Slide>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 95
  },
  logo: {
    width: 220,
    height: 60,
    marginBottom: 20
  },
  button: {
    height: 50,
    backgroundColor: '#88b484',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
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
  },
  boxNameApp: {
    alignItems: 'center'
  },
  txtNameApp: {
    fontFamily: 'Roboto-bold',
    fontSize: 25
  },
  tostBox: {
    position: 'absolute',
    bottom: 30
  }
})
