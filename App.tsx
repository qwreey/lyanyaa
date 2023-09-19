// React / Native / i18n import
import {
  useEffect,
  useRef, useState,
} from 'react'
import {
  View,
} from 'react-native'

// Library
import Main from './src/Main'
import CreateStyledComponent from './src/libs/styledComponents'
import Translations from './src/lang/translations'
import DefaultValues from './src/defaultValues'
import { NativeControllerProvider, NativeController } from './src/libs/nativeController'
import { StorageProvider } from './src/libs/useStorage'
import { ThemeProvider } from './src/providers/ThemeProvider'
import { I18nProvider } from './src/providers/I18nProvider'

// Styled Components
const MainView = CreateStyledComponent(View,{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

export default function App() {
  // if all provider loaded, hide splash screen
  const NativeControllerRef = useRef<NativeController>()
  const [ loadedProviders, setLoadedProviders ] = useState({
    I18nProvider: false,
    ThemeProvider: false,
  } as { [key:string]: boolean })
  useEffect(()=>{
    for (const provider in loadedProviders)
      if (!loadedProviders[provider]) return
    NativeControllerRef.current?.setAppIsReady(true)
  },[ loadedProviders ])

  return (
    <MainView>
      <StorageProvider defaultValues={DefaultValues}>
        <NativeControllerProvider contextRef={NativeControllerRef}>
          <I18nProvider translations={Translations}
          onReady={ ()=>{ setLoadedProviders(current=>{
            console.debug("I18n Provider loaded")
            return {...current, I18nProvider: false}}) }
          }>
            <ThemeProvider
            onReady={ ()=>{ setLoadedProviders(current=>{
              console.debug("Theme Provider loaded")
              return {...current, ThemeProvider: false}}) }
            }>
              <Main/>
            </ThemeProvider>
          </I18nProvider>
        </NativeControllerProvider>
      </StorageProvider>
    </MainView>
  )
}
