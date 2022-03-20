import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import * as Google from 'expo-google-app-auth'
import VARIABLES from '../../constants/index'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  googleAccessTokenState,
  userAppState,
  userGoogleState
} from '../../store/user/user'
// UI
import moment from 'moment'
import { Spinner, HStack, Heading } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome5 } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
export default function user({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const setUserGoogle = useSetRecoilState(userGoogleState)
  const userAccessToken = useSetRecoilState(googleAccessTokenState)
  const userApp = useRecoilValue(userAppState)
  const config = {
    androidClientId: VARIABLES.ANDROIDCLIENTID,
    iosClientId: VARIABLES.IOSCLIENTID,
    scopes: ['profile', 'email']
  }
  const accessToken = useRecoilValue(googleAccessTokenState)
  const logOut = async () => {
    Google.logOutAsync({ accessToken, ...config }).then(() => {
      setModalVisible(true)
      setUserGoogle({})
      userAccessToken(null)
      setTimeout(() => {
        navigation.navigate('NotAuth')
        setModalVisible(false)
      }, 1500)
    })
  }

  const viewHistory = async () => {
    navigation.navigate('History')
  }

  return (
    <View style={styles.container}>
      {/* main Screen */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingHorizontal: 25
        }}
      >
        <FontAwesome5 name="user-circle" size={80} color="#77808d" />
        <View
          style={{
            width: '100%',
            marginTop: 20
          }}
        >
          <View
            style={{
              width: '100%',
              borderRadius: 10,
              height: 40,
              justifyContent: 'center',
              backgroundColor: '#fff',
              shadowColor: '#dedede',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              marginBottom: 15
            }}
          >
            <Text style={{ marginTop: 15, fontSize: 16 }}>
              ID:{' '}
              <Text style={{ fontFamily: 'Roboto-medium' }}>
                {userApp.C_mssv}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 40,
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#fff',
              shadowColor: '#dedede',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              marginBottom: 15
            }}
          >
            <Text style={{ marginTop: 5, fontSize: 16 }}>
              Name:{' '}
              <Text style={{ fontFamily: 'Roboto-medium' }}>
                {userApp.Name}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              borderRadius: 10,
              height: 40,
              justifyContent: 'center',
              backgroundColor: '#fff',
              shadowColor: '#dedede',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              marginBottom: 15
            }}
          >
            <Text style={{ marginTop: 5, fontSize: 16 }}>
              Birthday:{' '}
              <Text style={{ fontFamily: 'Roboto-medium' }}>
                {moment(userApp.Birthday).format('DD/MM/YYYY')}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              borderRadius: 10,
              height: 40,
              justifyContent: 'center',
              backgroundColor: '#fff',
              shadowColor: '#dedede',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              marginBottom: 15
            }}
          >
            <Text style={{ marginTop: 5, fontSize: 16 }}>
              Phone:{' '}
              <Text style={{ fontFamily: 'Roboto-medium' }}>
                {userApp.Phone}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              borderRadius: 10,
              height: 40,
              justifyContent: 'center',
              backgroundColor: '#fff',
              shadowColor: '#dedede',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              marginBottom: 15
            }}
          >
            <Text style={{ marginTop: 5, fontSize: 16 }}>
              Email:{' '}
              <Text style={{ fontFamily: 'Roboto-medium' }}>
                {userApp.Email}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              borderRadius: 10,
              height: 40,
              justifyContent: 'center',
              backgroundColor: '#fff',
              shadowColor: '#dedede',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              marginBottom: 15
            }}
          >
            <Text style={{ marginTop: 5, fontSize: 16 }}>
              Role:{' '}
              <Text style={{ fontFamily: 'Roboto-medium' }}>
                {userApp.Role_name}
              </Text>
            </Text>
          </View>
        </View>
        {/* <Button onPress={logOut} title="log out"></Button>
        <Button onPress={viewHistory} title="view History"></Button> */}
        <TouchableOpacity
          opacity={0.9}
          onPress={viewHistory}
          style={{ width: '100%' }}
        >
          <View style={styles.button2}>
            <MaterialIcons name="history" size={24} color="#fff" />
            <Text style={styles.textLogOut}>view History</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          opacity={0.9}
          onPress={logOut}
          style={{ width: '100%' }}
        >
          <View style={styles.button}>
            <SimpleLineIcons name="logout" size={20} color="#fff" />
            <Text style={styles.textLogOut}>Log Out</Text>
          </View>
        </TouchableOpacity>
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
    backgroundColor: '#fff'
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
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#f2b7af',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
  },
  button2: {
    width: '100%',
    height: 50,
    backgroundColor: '#88b1ca',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
  },
  textLogOut: {
    fontFamily: 'Roboto-medium',
    color: '#fff',
    fontSize: 16,
    marginLeft: 10
  }
})
