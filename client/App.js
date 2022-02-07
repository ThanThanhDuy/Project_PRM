import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Routes from './routes/index'

export default function App() {
  const [loaded] = useFonts({
    'Roboto-regular': require('./assets/Font/Roboto-Regular.ttf'),
    'Roboto-bold': require('./assets/Font/Roboto-Bold.ttf'),
    'Roboto-medium': require('./assets/Font/Roboto-Medium.ttf')
  })

  if (!loaded) {
    return null
  }
  return (
    <View style={styles.root}>
      <Routes />
      <StatusBar barStyle="light-content" />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
