import { Box, ScrollView } from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  Heading,
  Button,
  Center,
  View,
  Text,
  FormControl,
  Input,
  Divider,
  Badge,
  HStack,
  VStack,
  Flex,
  ZStack,
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ReviewRule = ({ navigation }) => {
  const [contacts, setContacts] = useState([
    {
      name: 'Parth (9090909090)',
      color: 100,
      id: 1,
    },
    {
      name: 'asdf (8080808080)',
      color: 200,
      id: 2,
    },
    {
      name: 'dfgfg (8080808080)',
      color: 300,
      id: 3,
    },
    {
      name: 'Navjasdot (8080808080)',
      color: 400,
      id: 4,
    },
    {
      name: 'asdfttt (8080808080)',
      color: 500,
      id: 5,
    },
    {
      name: 'Shweta (303030303030)',
      color: 600,
      id: 6,
    },
  ])

  const shuffleContact = () => {
    contacts.unshift(contacts.pop())
    console.log(contacts)
    setContacts([...contacts])
  }

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  return (
    <Box backgroundColor={'blue.500'} paddingTop="5" marginBottom={'100'}>
      <View
        pl="2"
        pr="2"
        pb="3"
        style={{ flexDirection: 'column', height: 50 }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', width: '50%' }}>
            <Center pr={'5'}>
              <Icon
                onPress={navigation.goBack}
                name={'arrow-left'}
                size={15}
                color="white"
              />
            </Center>
            <Center>
              <Heading color={'white'} size="md">
                {'Review rule'}
              </Heading>
            </Center>
          </View>
        </View>
      </View>

      <Box
        borderTopLeftRadius={'2xl'}
        borderTopRightRadius={'2xl'}
        backgroundColor={'white'}
        height="full"
        style={{
          padding: 10,
          paddingBottom: 0,
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <Center>
          <Heading size="md">{'Review rule'}</Heading>
        </Center>

        <Center>
          <Icon name={'android-messages'} size={60} />
        </Center>
        <Box>
          <Center h="40">
            <Box mt="-32">
              <ZStack mt="3" ml={-100}>
                {contacts.map((contact, i) => {
                  return (
                    <Box
                      onTouchStart={event => {
                        shuffleContact()
                      }}
                      key={contact.id}
                      bg={`blue.${contact.color}`}
                      mt={i * 4}
                      ml={i * 4}
                      padding={3}
                      rounded="lg"
                      width={150}
                      minHeight={70}
                      shadow={3}
                    >
                      {contact.name}
                    </Box>
                  )
                })}
              </ZStack>
            </Box>
          </Center>
        </Box>
        <Box mt={50}>
          <HStack space={3} justifyContent="center">
            <Center>
              <Icon name={'filter'} size={60} />
            </Center>
            <HStack t={2} flexWrap={'wrap'} space={3}>
              {[
                'asdf asdf',
                'asdf',
                'titutut',
                'asdf asdf',
                'asdf',
                'titutut',
              ].map(text => {
                return (
                  <VStack mt={2}>
                    <Button
                      borderRadius={15}
                      variant="outline"
                      bg={'info.100'}
                      p="2"
                      pt={1}
                      pb={1}
                      _text={{
                        fontSize: 12,
                      }}
                    >
                      {text}
                    </Button>
                  </VStack>
                )
              })}
            </HStack>
          </HStack>
        </Box>
        <Box>
          <Center h="40">
            <Box mt="-32">
              <ZStack mt="3" ml={-100}>
                {contacts.map((contact, i) => {
                  return (
                    <Box
                      onTouchStart={event => {
                        shuffleContact()
                      }}
                      key={contact.id}
                      bg={`blue.${contact.color}`}
                      mt={i * 4}
                      ml={i * 4}
                      padding={3}
                      rounded="lg"
                      width={150}
                      minHeight={70}
                      shadow={3}
                    >
                      {contact.name}
                    </Box>
                  )
                })}
              </ZStack>
            </Box>
          </Center>
        </Box>
      </Box>
    </Box>
  )
}

export default ReviewRule
