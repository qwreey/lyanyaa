import { useColorScheme } from 'react-native';
import {
    createContext,
    useEffect,
    type PropsWithChildren,
    useState,
} from "react";
import ThemeBase from "../themes/ThemeBase"
import useStorage from "../libs/useStorage"

// import default themes
import DarkTheme from "../themes/Dark"
import LightTheme from "../themes/Light"

export interface Theme extends ThemeBase {}
const DummyTheme: Theme = {}

export const ThemeContext = createContext({} as Theme)

interface props extends PropsWithChildren {
    onReady?: (Theme:Theme)=>undefined,
}

export function ThemeProvider(props:props) {
    const systemColorScheme = useColorScheme()
    const themeSchema = useStorage("themeSchema") // custom, dark, light, system
    const [ theme, setTheme ] = useState(DummyTheme)

    // Load theme
    useEffect(()=>{
        if (themeSchema.read().running) return
        let newTheme
        switch (themeSchema.read().result) {
            case "custom":
                console.error("Currently, custom theme is not supported. use Light theme instead.")
                newTheme = new LightTheme()
                break
            case "dark":
                newTheme = new DarkTheme()
                break
            case "light":
                newTheme = new LightTheme()
                break
            case "system":
            default:
                newTheme =
                    systemColorScheme === "dark"
                    ? (new DarkTheme())
                    : (new LightTheme())
                break
        }
        setTheme(newTheme)
        if (props.onReady && theme === DummyTheme) props.onReady(newTheme)
    },[ themeSchema.read() ])

    return (
        <ThemeContext.Provider value={theme}>
            {(theme !== DummyTheme) && props.children}
        </ThemeContext.Provider>
    )
}
