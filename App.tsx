import { StatusBar } from 'expo-status-bar'
// import changeNavigationBarColor from 'react-native-navigation-bar-color'

import {
  ColorSchemeName, // get native theme
  PlatformOSType, // get os type
  View,Text,Button,
  StatusBar as reactNativeStatusBar
} from 'react-native'
import CreateStyledComponent from './src/libs/styledComponents'
import { useStorage, StorageContext } from './src/libs/useStorage'
import { useRef } from 'react'
import { Main } from './src/Main'

const MainView = CreateStyledComponent(View,{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

const StatusBarBackground = CreateStyledComponent(View,{
  width: "100%",
})

export default function App() {
  const storage = useRef({
    cachedValues: {},
    updateTriggers: {},
    waitingReadPromises: {},
  })

  return (
    <MainView>
      <StorageContext.Provider value={storage.current}>
        <Main/>
      </StorageContext.Provider>
      {/* <ThemeContext.Provider value={true}>
        <StatusBarBackground style={{
          height: reactNativeStatusBar.currentHeight
        }}/>
      </ThemeContext.Provider> */}
      <StatusBar style="dark"/>
    </MainView>
  )
}
