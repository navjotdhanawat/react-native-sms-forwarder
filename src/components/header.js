import { Heading, Button, Center, View, Text } from 'native-base'
import Icon from 'react-native-vector-icons/Feather'
import { StyleSheet } from 'react-native'

export default ({ title, navigation }) => {
  return (
    <View pl="2" pr="2" pb="3" style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', width: '50%' }}>
          <Center pr={'5'}>
            <Icon
              onPress={navigation.openDrawer}
              name={'menu'}
              size={30}
              color="white"
            />
          </Center>
          <Center>
            <Heading color={'white'} size="xl">
              {title}
            </Heading>
          </Center>
        </View>
        <View style={{ flexDirection: 'row-reverse', width: '50%' }}>
          <Center>
            <Button
              colorScheme={'white'}
              startIcon={<Icon color={'white'} name={'plus'} size={30} />}
              size="sm"
              variant="outline"
              onPress={() => navigation.navigate('ADDRULE')}
            >
              <Text color={'amber.100'}>Add Rule</Text>
            </Button>
          </Center>
        </View>
      </View>
    </View>

    // <View p="2" pt="10" pb="3">
    //   <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
    //     <Text>Hello, World!</Text>
    //   </View>
    //   <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
    //     <Text>Hello, World!</Text>
    //   </View>
    // </View>
    // <>
    //   <HStack space={5} p="2" pt="10" pb="3">
    //     <Center>
    //       <Icon onPress={navigation.openDrawer} name={'menu'} size={30} />
    //     </Center>
    //     <Center>
    //       <Heading size="xl">{title}</Heading>
    //     </Center>
    //   </HStack>
    //   <View>
    //     <Text style={{ textAlign: 'right' }}>Hello, World!</Text>
    //   </View>
    // </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '50%', // is 50% of container width
  },
})
