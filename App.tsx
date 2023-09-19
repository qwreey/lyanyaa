// React / Native / i18n import
import {
  useRef,
} from 'react'
import {
  View,
} from 'react-native'

// Library
import Main from './src/Main'
import CreateStyledComponent from './src/libs/styledComponents'
import Translations from './scr/lang/translations'
import DefaultValues from './src/defaultValues'
import { StorageProvider } from './src/libs/useStorage'
import { ThemeProvider } from './src/providers/ThemeProvider'
import { NativeControllerProvider } from './src/libs/nativeController'
import { I18nProvider } from './src/providers/I18nProvider'

// Styled Components
const MainView = CreateStyledComponent(View,{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

export default function App() {
  return (
    <MainView>
      <StorageProvider defaultValues={DefaultValues}>
        <NativeControllerProvider>
          <I18nProvider translations={Translations}>
            <ThemeProvider>
              <Main/>
            </ThemeProvider>
          </I18nProvider>
        </NativeControllerProvider>
      </StorageProvider>
    </MainView>
  )
}
