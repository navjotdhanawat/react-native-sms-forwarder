import { HStack, Heading, VStack, Center, Avatar } from 'native-base'
import { Text, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import { routes } from './constant'

export const SideMenu = ({ navigation }) => {
  return (
    <VStack
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      space={4}
      alignItems="center"
    >
      <Avatar
        marginTop={'-20'}
        size="128px"
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
        }}
      />
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
