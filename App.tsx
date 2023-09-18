import { StatusBar } from 'expo-status-bar'
// import changeNavigationBarColor from 'react-native-navigation-bar-color'

import {
  ColorSchemeName, // get native theme
  PlatformOSType, // get os type
  View,Text,Button,
  StatusBar as reactNativeStatusBar
} from 'react-native'
import CreateStyledComponent from './src/libs/styledComponents'
import { useStorage, StorageContext, createStorage } from './src/libs/useStorage'
import { useRef } from 'react'
import { Main } from './src/Main'
import ThemeProvider from './src/themes/ThemeProvider'

const MainView = CreateStyledComponent(View,{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

const StatusBarBackground = CreateStyledComponent(View,{
  width: "100%",
})

export default function App() {
  const Storage = createStorage()

  return (
    <MainView>
      <Storage>
        <ThemeProvider loading={}>
          <Main/>
        </ThemeProvider>
      </Storage>
    </MainView>
  )
}

// <StatusBar style="dark"/>
/* <ThemeContext.Provider value={true}>
        <StatusBarBackground style={{
          height: reactNativeStatusBar.currentHeight
        }}/>
      </ThemeContext.Provider> */