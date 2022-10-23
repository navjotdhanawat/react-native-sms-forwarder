/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { NativeModules, PermissionsAndroid } from 'react-native'

import { NativeBaseProvider, extendTheme } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import Inbox from './src/Inbox'
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
}
const theme = extendTheme({ colors: newColorTheme })

const { CalendarModule } = NativeModules
// enablePromise(true);

// const getDBConnection = async () => {
//   return openDatabase({ name: "AWESOME.DB", location: "default" });
// };

// const getData = async () => {
//   try {
//     const db = await getDBConnection();
//     const records = await db.executeSql(`SELECT SENDER, CONTENT FROM INBOX`);
//     const inboxItems = [];
//     records.forEach((record) => {
//       for (let index = 0; index < record.rows.length; index++) {
//         inboxItems.push(record.rows.item(index));
//       }
//     });
//     return inboxItems;
//   } catch (error) {
//     console.error(error);
//     throw Error("Failed to get inboxItems !!!");
//   }
// };

// const Section = ({ children, title }) => {
//   const onPress = async () => {
//     const r = await CalendarModule.createCalendarEvent("foo", "bar");
//     console.log("Native module: ", r);
//     const sms = await SInfo.getItem("SMS", {
//       sharedPreferencesName: "sharedPreference",
//     });
//     const Mobile = await SInfo.getItem("Mobile", {
//       sharedPreferencesName: "sharedPreference",
//     });
//     console.log("sms: ", sms);
//     console.log("Mobile: ", Mobile);
//     const data = await getData();
//     console.log("data: ", data);
//   };

//   return (
//     <Button
//       title="Click to invoke your native module!"
//       color="#841584"
//       onPress={onPress}
//     />
//   );
// };

const App = () => {
  const requestCameraPermission = async () => {
    try {
      await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        ],
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    requestCameraPermission()
  }, [])

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Inbox} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
export default App
