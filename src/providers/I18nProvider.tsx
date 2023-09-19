import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import {
    createContext,
    type PropsWithChildren,
    useEffect,
    useState,
} from 'react';
import useStorage from '../libs/useStorage';

const I18nContext = createContext({} as I18n)

const DummyI18n:I18n = {} as I18n

interface props extends PropsWithChildren {
    onReady?: (Language: I18n)=>undefined,
    translations?: I18n["translations"],
}

export function I18nProvider(props: props) {
    const language = useStorage("language")
    const [ i18n, setI18n ] = useState(DummyI18n)

    // Load i18n
    useEffect(()=>{
        if (language.read().running) return
        const newI18n = new I18n(props.translations)
        newI18n.locale = Localization.locale
            // language.read().result === "system"
            // ? Localization.locale
            // : language.read().result
        setI18n(newI18n)
        if (props.onReady && i18n === DummyI18n) props.onReady(newI18n)
    },[ language.read() ])

    return (
        <I18nContext.Provider value={i18n}>
            {(i18n !== DummyI18n) && props.children}
        </I18nContext.Provider>
    )
}
