import {
    useColorScheme,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from 'react-native'
import {
    createContext,
    useEffect,
    type PropsWithChildren,
    useState,
    Component,
    useContext,
} from "react"
import ThemeBase from "../themes/ThemeBase"
import useStorage from "../libs/useStorage"
import CreateStyledComponent,{
    Props as StyledComponentProps,
} from "../libs/styledComponents"

// import default themes
import DarkTheme from "../themes/Dark"
import LightTheme from "../themes/Light"

export interface Theme extends ThemeBase {}
const DummyTheme: Theme = {} as Theme

export const ThemeContext = createContext({} as Theme)

interface props extends PropsWithChildren {
    onReady?: (Theme:Theme)=>undefined,
}

export function CreateThemedComponent(
    NativeComponent:typeof Component,
    callback: (theme:Theme)=>(ViewStyle|TextStyle|ImageStyle)
) {
    return (props:Props)=>{
        const theme = useContext(ThemeContext)
    }
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
