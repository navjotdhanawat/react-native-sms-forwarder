import {
  HStack,
  Heading,
  VStack,
  Center,
  Avatar,
  View,
  ScrollView,
} from 'native-base'
import { Text, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import { routes } from '../constant'

export const SideMenu = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView padding={'10'}>
        <VStack
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          space={4}
          alignItems="center"
        >
          <Avatar
            size="128px"
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
            }}
          />
          <Heading size={'lg'}>Main menu</Heading>

          {routes.map(route => {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate(route.key)}
              >
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
      </ScrollView>
      <View>
        <Text style={{ textAlign: 'center' }}>App Version: v1.0.2</Text>
      </View>
    </View>
  )
}
