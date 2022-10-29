import {
  Box,
  Heading,
  FlatList,
  Spacer,
  HStack,
  Avatar,
  VStack,
  Text,
  Center,
} from 'native-base'
import React, { useEffect } from 'react'
// import { NativeEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import { actionTypes } from '../constant'
import Header from '../components/header'

const avatarUrl =
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

const Inbox = ({
  getInbox,
  onRefresh,
  inbox: { records, pages, currentPage, isFetching },
  navigation,
}) => {
  // to get native event once insert is made in SQLite
  // useEffect(() => {
  //   const eventEmitter = new NativeEventEmitter()
  //   const nativeEvent = eventEmitter.addListener('notificationReceived', () => {
  //     onRefresh()
  //   })

  //   return () => {
  //     nativeEvent.remove()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    getInbox({ page: 1 })
  }, [getInbox])

  const onEndReached = () => {
    if (currentPage < pages) {
      getInbox({ page: currentPage + 1 })
    }
  }

  return (
    <Box backgroundColor={'blue.500'} paddingTop="5" marginBottom={'120'}>
      <Header title="Inbox" navigation={navigation} />
      <Box
        borderTopLeftRadius={'2xl'}
        borderTopRightRadius={'2xl'}
        backgroundColor={'white'}
        height="full"
        style={{ padding: 10, paddingBottom: 0 }}
      >
        <FlatList
          onRefresh={onRefresh}
          refreshing={isFetching}
          ListEmptyComponent={() => <Text>No message received!!!</Text>}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={records}
          onEndReachedThreshold={0.2}
          onEndReached={onEndReached}
          renderItem={({ item }) => (
            <Box backgroundColor={'gray.200'} borderRadius={10} m="1" p="3">
              <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar
                  size="48px"
                  source={{
                    uri: avatarUrl,
                  }}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.sender}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {item.id}:{item.content}
                  </Text>
                </VStack>
                <Spacer />
                <Text
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {'10:21'}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={item => {
            return item.id
          }}
        />
      </Box>
    </Box>
  )
}

const mapStateToProps = (state, props) => {
  // console.log('state.inbox: ', state.inbox)
  return {
    inbox: state.inbox,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRefresh: payload => {
      dispatch({
        type: actionTypes.INBOX.REFRESH,
        payload: { page: 1 },
      })
    },
    getInbox: payload => {
      dispatch({
        type: actionTypes.INBOX.REQUEST,
        payload,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)
