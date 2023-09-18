import { Component, createContext, type PropsWithChildren } from "react";
import ThemeBase from "./ThemeBase"
import { useStorage } from "../libs/useStorage";

export type Theme = ThemeBase

export const ThemeContext = createContext({})

interface props extends PropsWithChildren {
    loading: typeof Component
}

export default function ThemeProvider(props:props) {
    const themeSchema = useStorage("themeSchema")
    const customTheme = useStorage("customTheme")
    let theme:Theme;

    if (customTheme.read().running || themeSchema.read().running)
        return (<>{props.loading}</>)

    return (
        <ThemeContext.Provider value={{}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

// export interface props extends PropsWithChildren {
//     initTheme: Theme
// }

// export default class ThemeProvider extends Component {
//     private theme: Theme

//     public constructor( props: props ) {
//         super(props)

//         this.theme = 
//     }

//     public updateTheme(theme: Theme) {
//         this.theme = theme
//         this.forceUpdate()
//     }

//     public getCurrentTheme():Theme {
//         return this.theme
//     }

//     public render(): ReactNode {
//         return (
//             <ThemeContext.Provider value={this.theme}>

//             </ThemeContext.Provider>
//         )
//     }
//     // loadTheme: (themeData)=>undefined;
// }

