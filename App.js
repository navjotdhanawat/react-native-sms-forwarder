/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import * as React from 'react'
import {
  NativeModules,
  PermissionsAndroid,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native'

import { NativeBaseProvider, extendTheme, Button } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import AppIntroSlider from 'react-native-app-intro-slider'

const Stack = createNativeStackNavigator()
// const Drawer = createDrawerNavigator()

import Inbox from './src/Inbox'
import { routes, slides } from './src/constant'
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

import * as BootSplash from 'react-native-bootsplash'
import { SideMenu } from './src/sidemenu'
import { Setting } from './src/setting'
const components = {
  INBOX: Inbox,
  SETTINGS: Setting,
}
const bootSplashLogo = require('./assets/bootsplash_logo.png')

const App = () => {
  const [showRealApp, setShowRealApp] = React.useState(false)
  const [bootSplashIsVisible, setBootSplashIsVisible] = React.useState(true)
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] =
    React.useState(false)
  const opacity = React.useRef(new Animated.Value(1))
  const translateY = React.useRef(new Animated.Value(0))

  const init = async () => {
    try {
      await BootSplash.hide()

      Animated.stagger(250, [
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: -50,
        }),
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: Dimensions.get('window').height,
        }),
      ]).start()

      Animated.timing(opacity.current, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
        delay: 550,
      }).start(() => {
        setBootSplashIsVisible(false)
      })
    } catch (error) {
      setBootSplashIsVisible(false)
    }
  }

  React.useEffect(() => {
    bootSplashLogoIsLoaded && init()
  }, [bootSplashLogoIsLoaded])

  const onDone = () => {
    setShowRealApp(true)
  }

  const RenderItem = ({ item }) => {
    return (
      <View style={{ ...styles.intro, backgroundColor: item.backgroundColor }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    )
  }

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

  React.useEffect(() => {
    requestCameraPermission()
  }, [])

  return (
    <>
      <>
        <StatusBar hidden={true} />
        {true ? (
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Home"
              >
                <Stack.Screen name="Home" component={Inbox} />
              </Stack.Navigator>

              {/* <Drawer.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="SETTING"
                drawerContent={({ navigation }) => (
                  <SideMenu navigation={navigation} />
                )}
              >
                {routes.map(route => {
                  return (
                    <Drawer.Screen
                      name={route.key}
                      component={components[route.key]}
                    />
                  )
                })}
              </Drawer.Navigator> */}
            </NavigationContainer>
          </NativeBaseProvider>
        ) : (
          <AppIntroSlider
            data={slides}
            renderItem={RenderItem}
            onDone={onDone}
            showSkipButton={true}
            onSkip={onDone}
          />
        )}
        {bootSplashIsVisible && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.bootsplash,
              { opacity: opacity.current },
            ]}
          >
            <Animated.Image
              source={bootSplashLogo}
              fadeDuration={0}
              resizeMode="contain"
              onLoadEnd={() => {
                console.log('setBootSplashLogoIsLoaded:.....')
                setBootSplashLogoIsLoaded(true)
              }}
              style={[
                styles.logo,
                { transform: [{ translateY: translateY.current }] },
              ]}
            />
          </Animated.View>
        )}
      </>

      {/* <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
          >
            <Stack.Screen name="Home" component={Inbox} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    margin: 20,
    lineHeight: 30,
    color: '#333',
    textAlign: 'center',
  },
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 89,
    width: 100,
  },
  intro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 100,
  },
})

export default App
