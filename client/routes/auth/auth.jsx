import { Animated, Dimensions, StyleSheet, View, Image } from 'react-native'
import React, { useRef } from 'react'
//navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//init Tab
const Tab = createBottomTabNavigator()
//Screen
import Home from '../../screens/home/home'
import Book from '../../screens/book/book'
import Bag from '../../screens/bag/bag'
import User from '../../screens/user/user'

//icons
import home_solid from '../../assets/icons/home_solid.png'
import home_line from '../../assets/icons/home_line.png'
import book_solid from '../../assets/icons/book_solid.png'
import book_line from '../../assets/icons/book_line.png'
import shopping_line from '../../assets/icons/shopping_line.png'
import shopping_solid from '../../assets/icons/shopping_solid.png'
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
            } else if (route.name === 'Bag') {
              return (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={focused ? shopping_solid : shopping_line}
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
          tabBarLabel: () => {
            return null
          },
          tabBarStyle: styles.tab,
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Book" component={Book} />
        <Tab.Screen name="Bag" component={Bag} />
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
    height: 65,
    paddingBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#fff',
    marginBottom: 30,
    borderTopWidth: 0,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    position: 'absolute'
  }
})
