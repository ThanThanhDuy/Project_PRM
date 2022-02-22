import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Google from 'expo-google-app-auth'
import VARIABLES from '../../constants/index'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { googleAccessTokenState, userGoogleState } from '../../store/user/user'
// UI
import { Spinner, HStack, Heading } from 'native-base'

export default function user({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const setUserGoogle = useSetRecoilState(userGoogleState)
  const userAccessToken = useSetRecoilState(googleAccessTokenState)

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

  return (
    <View style={styles.container}>
      <Text>User Screen</Text>
      <Button onPress={logOut} title="log out"></Button>
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
    alignItems: 'center',
    justifyContent: 'center'
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
