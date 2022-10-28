import {
  Box,
  Heading,
  FlatList,
  Spacer,
  HStack,
  Avatar,
  VStack,
  Text,
} from 'native-base'
import React, { useEffect, useState } from 'react'
// import { NativeEventEmitter } from 'react-native'

import DB from '../../DB'
const db = new DB()

const avatarUrl =
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

const Setting = () => {
  const [inbox, setInbox] = useState([])
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(Infinity)
  const [isFetching, setIsFetching] = useState(false)
  // const myStateRef = React.useRef(page)

  // const _setPage = data => {
  //   myStateRef.current = data
  //   setPage(data)
  // }

  const fetchDate = async ({ page }) => {
    setIsFetching(true)
    const data = await db.fetchMessages({ page })
    console.log('Fetching...', page, data.pages)
    setPages(data.pages)
    setInbox([...inbox, ...data.records])
    setIsFetching(false)
  }

  // to get native event once insert is made in SQLite
  // useEffect(() => {
  //   const eventEmitter = new NativeEventEmitter()
  //   const nativeEvent = eventEmitter.addListener(
  //     'notificationReceived',
  //     event => {
  //       console.log('event.eventProperty')
  //       fetchDate({ page: myStateRef.current })
  //     },
  //   )

  //   return () => {
  //     nativeEvent.remove()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    fetchDate({ page })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const onEndReached = () => {
    if (pages - 1 > page) {
      console.log('onEndReached:.. ', page)
      setPage(page + 1)
    }
  }

  return (
    <Box backgroundColor={'gray.200'} paddingTop="5" marginBottom={'160'}>
      <Heading p="5" pt="10" pb="3" size="lg">
        Setting
      </Heading>
      <Box
        borderTopLeftRadius={'2xl'}
        borderTopRightRadius={'2xl'}
        backgroundColor={'white'}
        height="full"
        style={{ padding: 10 }}
      ></Box>
    </Box>
  )
}

export default Setting
