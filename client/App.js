import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Routes from './routes/index'

export default function App() {
  const [loaded] = useFonts({
    'Poppins-regular': require('./assets/Font/Poppins-Regular.ttf'),
    'Poppins-bold': require('./assets/Font/Poppins-Bold.ttf'),
    'Poppins-medium': require('./assets/Font/Poppins-Medium.ttf')
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
