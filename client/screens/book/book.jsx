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
import {
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Center,
  Stack,
  Slide
} from 'native-base'
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
import { userAppState } from '../../store/user/user'
import axiosCateApi from '../../api/category/axiosCateApi'
import axiosBookApi from '../../api/books/axiosBookApi'
import ListBook from '../../components/listBook/listBook'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { bookSelectToAddState } from '../../store/book/book'
export default function book() {
  const [searchText, setSearchText] = React.useState('')
  const setCateSelect = useSetRecoilState(cateSelectedState)
  const [cate, setCate] = React.useState([])
  const [books, setBooks] = React.useState([])
  const myTextInput = React.createRef()
  const listCate = React.useRef()
  const cateSelected = useRecoilValue(cateSelectedState)
  const userApp = useRecoilValue(userAppState)
  const setBookSelectToAddState = useSetRecoilState(bookSelectToAddState)
  const [tostVisible, setToastVisible] = React.useState(false)
  const [statusToast, setStatusToast] = React.useState('warning')
  const [toastMessage, setToastMessage] = React.useState('')
  const handleWhenClearSearch = () => {
    myTextInput.current.clear()
    setSearchText('')
  }

  React.useEffect(() => {
    const getCate = async () => {
      // const cate = await cateApi.getCate()
      const responseCate = await axiosCateApi.getCatePopular(userApp.Token)
      const cate = JSON.parse(responseCate.data)

      cate.unshift({
        Id: 0,
        Name: 'All'
      })

      setCate(cate)
      if (cate) {
        let index = cate.findIndex(item => item.Id === cateSelected)
        console.log('index', index)
        listCate.current.scrollToIndex({
          animated: true,
          index: index,
          viewPosition: 0.5
        })
      }
    }
    getCate()
    // search book by cateId
    const getBookByCate = async () => {
      const params = {
        cateId: cateSelected
      }
      const responseBook = await axiosBookApi.getBookByCate(
        userApp.Token,
        params
      )
      setBooks(JSON.parse(responseBook.data))
    }
    getBookByCate()
  }, [cateSelected])

  const handleSearch = async () => {
    const params = {
      keyword: searchText,
      cateId: cateSelected
    }
    const responseBook = await axiosBookApi.getBookBySearch(
      userApp.Token,
      params
    )
    setBooks(JSON.parse(responseBook.data))
  }

  const handleAddBook = async book => {
    try {
      // clear
      // await AsyncStorage.clear()
      const jsonValue = await AsyncStorage.getItem('@myBag')
      let myBag = []
      // check in myBag have any book or not
      if (jsonValue) {
        myBag = JSON.parse(jsonValue)
        if (
          myBag.length < 5 &&
          myBag.findIndex(item => item.Id_nfc === book.Id_nfc) === -1
        ) {
          console.log('ok')
          myBag.push(book)
          setBookSelectToAddState(myBag)
          setToastMessage('Add to bag success')
          setStatusToast('success')
          setToastVisible(true)
          setTimeout(() => {
            setToastVisible(false)
          }, 1000)
        } else {
          console.log('not ok')
          setToastMessage('Add to bag fail')
          setStatusToast('warning')
          setToastVisible(true)
          setTimeout(() => {
            setToastVisible(false)
          }, 1000)
        }
      } else {
        console.log('ok')
        myBag.push(book)
        setBookSelectToAddState(myBag)
        setToastMessage('Add to bag success')
        setStatusToast('success')
        setToastVisible(true)
        setTimeout(() => {
          setToastVisible(false)
        }, 1000)
      }
      const json = JSON.stringify(myBag)
      await AsyncStorage.setItem('@myBag', json)
      // log temp
      const jsonValue2 = await AsyncStorage.getItem('@myBag')
      // console.log(JSON.parse(jsonValue2))
    } catch (e) {
      console.log('save local error')
    }
  }

  const handleSelectCate = cateId => {
    setCateSelect(cateId)
    handleWhenClearSearch()
  }

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        {/* header */}
        <Header string1={'Library'} string2={'Ready to read some books?'} />
        {/* Search */}
        <View style={styles.searchBar}>
          <View style={styles.boxSearch}>
            <TouchableOpacity activeOpacity={0.5} onPress={handleSearch}>
              <Image source={searchIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TextInput
              ref={myTextInput}
              style={styles.inputTextSearch}
              placeholder="Search"
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={handleSearch}
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.Id}
              activeOpacity={0.5}
              onPress={() => handleSelectCate(item.Id)}
              style={{ marginRight: 20 }}
            >
              <View>
                <Text
                  style={
                    item.Id === cateSelected
                      ? styles.textCateSelected
                      : styles.textCate
                  }
                >
                  {item.Name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
        {/* show book */}
        <ListBook books={books} handleAddBook={handleAddBook} />
        {/* toast */}
        <Slide in={tostVisible} style={{ alignItems: 'center' }}>
          <Center style={styles.tostBox}>
            <Stack space={3} w="90%" maxW="400">
              <Alert w="100%" status={statusToast}>
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    justifyContent="space-between"
                  >
                    <Center>
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon />
                        <Text fontSize="md" color="coolGray.800">
                          {toastMessage}
                        </Text>
                      </HStack>
                    </Center>
                    <IconButton
                      onPress={() => setToastVisible(false)}
                      style={{ marginRight: 8 }}
                      variant="unstyled"
                      icon={<CloseIcon size="3" color="coolGray.600" />}
                    />
                  </HStack>
                </VStack>
              </Alert>
            </Stack>
          </Center>
        </Slide>
      </View>
    </KeyboardAvoidingWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 95
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
    flexDirection: 'row',
    flexShrink: 0,
    flexGrow: 0
  },
  tostBox: {
    position: 'absolute',
    bottom: 30
  }
})
