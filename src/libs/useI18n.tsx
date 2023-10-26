import AsyncStorage from '@react-native-async-storage/async-storage'
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import {
    createContext,
    type PropsWithChildren,
    useEffect,
    useState,
    useRef,
    useCallback,
} from 'react'
import { AppState } from 'react-native'

const I18nContext = createContext({} as I18n)

const DummyI18n:I18n = {} as I18n

interface props extends PropsWithChildren {
    onReady?: (Language: I18n)=>undefined,
    translations?: I18n["translations"],
    language: string,
}

export function I18nProvider({ language, translations, onReady, children }: props) {
    const [ i18n, setI18n ] = useState(DummyI18n)
    const currentLanguage = useRef("")

    // update i18n
    const updateLanguage = useCallback(()=>{
        const newLanguage =
            language === "system"
            ? Localization.locale
            : language
        if (currentLanguage.current === newLanguage) return
        currentLanguage.current = newLanguage

        const newI18n = new I18n(translations)
        newI18n.locale = newLanguage
            
        setI18n(newI18n)
        if (onReady && i18n === DummyI18n) onReady(newI18n)
    },[ language ])
    useEffect(updateLanguage,[ language ])

    // handle app state updates
    useEffect(()=>{
        const subscription = AppState.addEventListener("change",updateLanguage)
        return subscription.remove.bind(subscription) 
    },[])

    return (
        <I18nContext.Provider value={i18n}>
            {(i18n !== DummyI18n) && children}
        </I18nContext.Provider>
    )
}
