// React / Native / i18n import
import {
    createContext,
    useEffect,
    useRef,
    useState,
    type PropsWithChildren,
} from "react"
import {
    Platform, // get os type
} from 'react-native'

// Expo import
import * as ExpoStatusBar from 'expo-status-bar'
import * as ExpoNavigationBar from 'expo-navigation-bar'
import {
    preventAutoHideAsync,
    hideAsync,
} from 'expo-splash-screen';

// Native Controllers
interface NativeController {
    setAppIsReady: (ready: boolean)=>undefined,
    setStatusBarColor: (color: string)=>undefined,
    setNavigationBarColor: (color:string)=>undefined,
}
const NativeControllerContext = createContext({} as NativeController)

export function NativeControllerProvider(props: PropsWithChildren) {
    // Splash screen
    const [ appIsReady, setAppIsReady ] = useState(false)
    useEffect(()=>{
        if (appIsReady) hideAsync()
        else preventAutoHideAsync()
    },[ appIsReady ])

    // Statusbar color
    const [ statusBarColor, setStatusBarColor ] = useState("")
    useEffect(()=>{
        if (statusBarColor === "") return
        if (Platform.OS === "android" || Platform.OS === "ios") {
            ExpoStatusBar.setStatusBarBackgroundColor(statusBarColor,true)
            ExpoStatusBar.setStatusBarStyle("auto")
        }
    },[ statusBarColor ])

    // NavigationBar color
    const [ navigationBarColor, setNavigationBarColor ] = useState("")
    useEffect(()=>{
        if (navigationBarColor === "") return
        if (Platform.OS === "android" || Platform.OS === "ios") {
            ExpoNavigationBar.setBackgroundColorAsync(navigationBarColor)
        }
    },[ navigationBarColor ])

    // Controllers
    const NativeControllerRef = useRef({
        setAppIsReady,
        setStatusBarColor,
        setNavigationBarColor,
    } as NativeController)

    return (
        <NativeControllerContext.Provider value={NativeControllerRef.current}>
            {props.children}
        </NativeControllerContext.Provider>
    )
}
