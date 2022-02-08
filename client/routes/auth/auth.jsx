import { Animated, Dimensions, StyleSheet, View, Image } from 'react-native'
import React, { useRef } from 'react'
//navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//init Tab
const Tab = createBottomTabNavigator()
//Screen
import Home from '../../screens/home/home'
import Book from '../../screens/book/book'
import Chat from '../../screens/chat/chat'
import User from '../../screens/user/user'

//icons
import home_solid from '../../assets/icons/home_solid.png'
import home_line from '../../assets/icons/home_line.png'
import book_solid from '../../assets/icons/book_solid.png'
import book_line from '../../assets/icons/book_line.png'
import comment_line from '../../assets/icons/comment_line.png'
import comment_solid from '../../assets/icons/comment_solid.png'
import user_line from '../../assets/icons/user_line.png'
import user_solid from '../../assets/icons/user_solid.png'

export default function auth() {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Home') {
              return (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={focused ? home_solid : home_line}
                />
              )
            } else if (route.name === 'Book') {
              return (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={focused ? book_solid : book_line}
                />
              )
            } else if (route.name === 'Chat') {
              return (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={focused ? comment_solid : comment_line}
                />
              )
            } else if (route.name === 'User') {
              return (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={focused ? user_solid : user_line}
                />
              )
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
          tabBarLabel: () => {
            return null
          },
          tabBarStyle: styles.tab,
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Book" component={Book} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
    height: 65,
    paddingBottom: 0,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: '#19224C',
    marginBottom: 30,
    borderTopWidth: 0,
    borderRadius: 15
  }
})