import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React from 'react'
import addBag from '../../assets/icons/add.png'
export default function (props) {
  const { books, handleAddBook } = props

  const handleAddBookToBag = book => {
    handleAddBook(book)
  }

  return (
    <FlatList
      contentContainerStyle={{
        marginRight: 25,
        marginLeft: 25
      }}
      keyExtractor={(item, index) => index.toString()}
      data={books}
      renderItem={({ item, index }) => (
        <View
          style={{
            width: '47%',
            height: 250,
            borderRadius: 10,
            marginBottom: '7%',
            marginRight: index % 2 === 0 ? '3%' : '0%',
            marginLeft: index % 2 !== 0 ? '3%' : '0%',
            backgroundColor: '#fff',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            marginTop: 10
          }}
          key={item.Id_nfc}
        >
          <TouchableOpacity
            style={{ height: '100%', width: '100%' }}
            activeOpacity={0.7}
          >
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.Image
              }}
            />
            <View style={{ width: '100%', alignItems: 'flex-start' }}>
              <Text
                style={styles.textTitleBook}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.Name}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleAddBookToBag(item)}
            style={{
              position: 'absolute',
              bottom: -16
            }}
          >
            <Image source={addBag} />
          </TouchableOpacity>
        </View>
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10
  },
  textTitleBook: {
    fontFamily: 'Roboto-medium',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10
  }
})
