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
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet } from 'react-native'
import { PermissionsAndroid } from 'react-native'
import Contacts from 'react-native-contacts'
import MultiSelect from 'react-native-multiple-select'
import Header from '../components/header'
import { numbers } from '../constant'

const contacts = numbers.flatMap(contact => {
  return contact.phoneNumbers.map(n => {
    return {
      name: contact.name + ' ' + n.number.replace(/\D/g, ''),
      id: contact.name + ' ' + n.id,
    }
  })
})

const AddRule = ({ navigation }) => {
  const [incomingMultiSelect, setIncomingMultiSelect] = useState(null)
  const [forwardMultiSelect, setForwardMultiSelect] = useState(null)
  const [filteredText, setFilteredText] = useState([])
  const [filteredTextState, setFilteredTextState] = useState('')
  const [selectedIncomingItems, setSelectedIncomingItems] = useState([])
  const [selectedForwardItems, setSelectedForwardItems] = useState([])

  const [contactList, setContactList] = useState(contacts)

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
  }, [])

  useEffect(() => {
    Contacts.getAll()
      .then(contacts => {
        // work with contacts
        console.log(JSON.stringify(contacts))
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const onSelectedIncomingItemsChange = _selectedItems => {
    const selectedValue = _selectedItems[_selectedItems.length - 1]
    const index = contactList.findIndex(i => i.id === selectedValue)
    console.log('_selectedItems: ', _selectedItems, index)
    // setSelectedIncomingItems(_selectedItems)
    setSelectedIncomingItems(_selectedItems)
    if (index === -1) {
      setContactList([
        ...contactList,
        { id: selectedValue, name: selectedValue },
      ])
    }
  }

  const onSelectedForwardItemsChange = _selectedItems => {
    console.log('_selectedItems: ', _selectedItems)
    setSelectedForwardItems(_selectedItems)
  }

  const [formData, setData] = React.useState({})
  const [errors, setErrors] = React.useState({})

  const validate = () => {
    //TODO: need to add validation for incoming and forward email/number
    if (formData.name === undefined) {
      setErrors({ ...errors, name: 'Name is required' })
      return false
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: 'Name is too short' })
      return false
    }

    return true
  }

  const onSubmit = () => {
    navigation.navigate('REVIEWRULE')
    // validate() ? console.log('Submitted') : console.log('Validation Failed')
  }

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
                size={20}
                color="white"
              />
            </Center>
            <Center>
              <Heading color={'white'} size="xl">
                {'Add new rule'}
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
        style={{ padding: 10, paddingBottom: 0 }}
      >
        <ScrollView nestedScrollEnabled={true}>
          <Box>
            <FormControl mb="5" isRequired isInvalid={'name' in errors}>
              <FormControl.Label>Rule name</FormControl.Label>
              <Input
                placeholder="Rule name (Required)"
                onChangeText={value => setData({ ...formData, name: value })}
              />
              <FormControl.HelperText>
                Give your rule a name.
              </FormControl.HelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl mb="5">
              <FormControl.Label>SMS contains</FormControl.Label>
              <Input
                placeholder="eg: OTP (Optional)"
                onSubmitEditing={e => {
                  setFilteredTextState('')
                  setFilteredText([...filteredText, e.nativeEvent.text])
                }}
                onChange={e => {
                  setFilteredTextState(e.nativeEvent.text)
                }}
                value={filteredTextState}
                returnKeyType="next"
                returnKeyLabel="Add"
              />
              <FormControl.HelperText>
                You can add multiple text from SMS which you want to filter.
              </FormControl.HelperText>
              <Box>
                <HStack t={2} flexWrap={'wrap'} space={3}>
                  {filteredText.map(text => {
                    return (
                      <VStack mt={2}>
                        <Button
                          borderRadius={15}
                          variant="outline"
                          rightIcon={
                            <Icon name={'close'} size={14} color="red" />
                          }
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
              </Box>
            </FormControl>
          </Box>

          <Box>
            <FormControl mb="5" isRequired isInvalid={'incoming' in errors}>
              <FormControl.Label>Incoming SMS from contacts</FormControl.Label>
              <MultiSelect
                flatListProps={{ nestedScrollEnabled: true }}
                hideTags
                items={contactList}
                uniqueKey="id"
                ref={setIncomingMultiSelect}
                onSelectedItemsChange={onSelectedIncomingItemsChange}
                selectedItems={selectedIncomingItems}
                selectText="Select contacts"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                canAddItems={true}
                onAddItem={ad => {
                  console.log('ad: ', ad)
                  // setContactList(ad)
                }}
              />
              <View>
                {incomingMultiSelect?.getSelectedItemsExt(
                  selectedIncomingItems,
                )}
              </View>
            </FormControl>
          </Box>

          <Box>
            <FormControl mb="5" isRequired isInvalid={'forward' in errors}>
              <FormControl.Label>
                Forward SMS to contacts/Email
              </FormControl.Label>
              <MultiSelect
                flatListProps={{ nestedScrollEnabled: true }}
                hideTags
                items={contacts}
                uniqueKey="id"
                ref={setForwardMultiSelect}
                onSelectedItemsChange={onSelectedForwardItemsChange}
                selectedItems={selectedForwardItems}
                selectText="Select contacts"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                canAddItems={true}
              />
              {selectedForwardItems && (
                <View>
                  {forwardMultiSelect?.getSelectedItemsExt(
                    selectedForwardItems,
                  )}
                </View>
              )}
            </FormControl>
          </Box>
          <Box>
            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
              Create rule
            </Button>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  )
}

export default AddRule
