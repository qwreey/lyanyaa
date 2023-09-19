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
    onLoaded?: (Theme:Theme)=>undefined,
}

export function ThemeProvider(props:props) {
    const systemColorScheme = useColorScheme()
    const themeSchema = useStorage("themeSchema") // custom, dark, light, system
    const [ theme, setTheme ] = useState(DummyTheme)

    // Load theme
    useEffect(()=>{
        if (themeSchema.read().running) return
        switch (themeSchema.read().result) {
            case "custom":
                console.error("Currently, custom theme is not supported. use Light theme instead.")
                setTheme(new LightTheme())
                break
            case "dark":
                setTheme(new DarkTheme())
                break
            case "light":
                setTheme(new LightTheme())
                break
            case "system":
            default:
                setTheme(
                    systemColorScheme === "dark"
                    ? (new DarkTheme())
                    : (new LightTheme())
                )
                break
        }
    },[ themeSchema.read() ])

    return (
        <ThemeContext.Provider value={theme}>
            {(theme !== DummyTheme) && props.children}
        </ThemeContext.Provider>
    )
}
