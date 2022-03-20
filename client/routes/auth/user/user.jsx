import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()
import User from '../../../screens/user/user'
import History from './../../../screens/user/History/history'
export default function notAuth() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="User"
    >
      <Stack.Screen
        name="UserScreen"
        component={User}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
