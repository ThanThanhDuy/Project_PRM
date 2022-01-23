import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from './auth/auth'

const Root = createNativeStackNavigator()

export default function index() {
  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Root.Screen name="Auth" component={Auth} />
      </Root.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
