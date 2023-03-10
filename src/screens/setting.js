import { Box } from 'native-base'
import React from 'react'
import Header from '../components/header'

const Setting = ({ navigation }) => {
  return (
    <Box backgroundColor={'blue.500'} paddingTop="5" marginBottom={'160'}>
      <Header title="Setting" navigation={navigation} />
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
