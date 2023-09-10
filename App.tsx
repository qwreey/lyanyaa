import { StatusBar } from 'expo-status-bar'
// import changeNavigationBarColor from 'react-native-navigation-bar-color'

import {
  // ColorSchemeName, // get native theme
  // PlatformOSType // get os type
  View,Text,
  StatusBar as reactNativeStatusBar
} from 'react-native'
import CreateStyledComponent from './src/libs/styledComponents'
import { createContext } from 'react'

const MainView = CreateStyledComponent(View,{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

const StatusBarBackground = CreateStyledComponent(View,{
  width: "100%",
})

export default function App() {
  const ThemeContext = createContext({})

  return (
    <MainView>
      <ThemeContext.Provider value={true}></ThemeContext.Provider>
      <StatusBar style="dark"/>
      <StatusBarBackground style={{
        height: reactNativeStatusBar.currentHeight
      }}/>
    </MainView>
  )
}
