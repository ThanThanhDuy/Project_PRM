import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import KeyboardAvoidingWrapper from '../../components/keyboardAvoid/keyboardAvoidingWapper'
import { Input } from 'native-base'
import React from 'react'
import searchIcon from '../../assets/icons/search.png'
import deleteIcon from '../../assets/icons/delete.png'
import Header from '../../components/header/header'
import cateApi from '../../api/category/catetory'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cateSelectedState } from '../../store/cate/cate'
export default function book() {
  const [searchText, setSearchText] = React.useState('')
  const setCateSelect = useSetRecoilState(cateSelectedState)
  const [cate, setCate] = React.useState([])
  const myTextInput = React.createRef()
  const listCate = React.useRef()
  const cateSelected = useRecoilValue(cateSelectedState)
  const handleWhenClearSearch = () => {
    myTextInput.current.clear()
    setSearchText('')
  }

  React.useEffect(() => {
    const getCate = async () => {
      const cate = await cateApi.getCate()
      cate.unshift({
        id: 0,
        name: 'All'
      })
      setCate(cate)
      let index = cate.findIndex(item => item.id === cateSelected)
      listCate.current.scrollToIndex({
        animated: true,
        index: index,
        viewPosition: 0.5
      })
    }
    getCate()
  }, [cateSelected])

  React.useEffect(() => {}, [cateSelected])

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        {/* header */}
        <Header string1={'Library'} string2={'Ready to read some books?'} />
        {/* Search */}
        <View style={styles.searchBar}>
          <View style={styles.boxSearch}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                console.log(searchText)
              }}
            >
              <Image source={searchIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TextInput
              ref={myTextInput}
              style={styles.inputTextSearch}
              placeholder="Search"
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={() => {
                console.log(searchText)
              }}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleWhenClearSearch}
              >
                <Image source={deleteIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* filter category */}
        <FlatList
          style={styles.boxCateBook}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={cate}
          ref={listCate}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.5}
              onPress={() => setCateSelect(item.id)}
              style={{ marginRight: 20 }}
            >
              <View>
                <Text
                  style={
                    item.id === cateSelected
                      ? styles.textCateSelected
                      : styles.textCate
                  }
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </KeyboardAvoidingWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 95
  },
  searchBar: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15
  },
  boxSearch: {
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f6f6f6',
    borderRadius: 50
  },
  inputTextSearch: {
    fontFamily: 'Roboto-regular',
    fontSize: 14,
    flexShrink: 1,
    paddingTop: 13,
    paddingBottom: 13,
    width: '100%',
    marginLeft: 10
  },
  titleScreen: {
    fontFamily: 'Roboto-bold',
    fontSize: 30
  },
  textCate: {
    fontFamily: 'Roboto-regular',
    color: '#77808d'
  },
  textCateSelected: {
    fontFamily: 'Roboto-medium',
    color: '#ff9c99'
  },
  boxCateBook: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
    flexDirection: 'row'
  }
})
