import { HStack, Heading, VStack, Center } from 'native-base'
import { Text, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

const routes = [
  {
    key: 'INBOX',
    Icon: 'inbox',
    name: 'Inbox',
  },
  {
    key: 'SETTINGS',
    Icon: 'settings',
    name: 'Settings',
  },
]

export const Setting = ({ navigation }) => {
  return (
    <VStack
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      space={4}
      alignItems="center"
    >
      <Heading size={'lg'}>Main menu</Heading>

      {routes.map(route => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate(route.key)}>
            <HStack space={2} justifyContent="center">
              <Center>
                <Icon name={route.Icon} size={18} />
              </Center>
              <Heading size={'md'} color="gray.500">
                {route.name}
              </Heading>
            </HStack>
          </TouchableOpacity>
        )
      })}
    </VStack>
  )
}
