import {
    StyleSheet,
    type ViewStyle, type TextStyle, type ImageStyle,
} from 'react-native';
import {
    Component,
    type PropsWithChildren,
} from 'react'

export type Styles = ViewStyle|TextStyle|ImageStyle
export interface Props extends PropsWithChildren {
    style?: Styles | Array<Styles>
}

export default function CreateStyledComponent(
    NativeComponent:typeof Component,
    stylesheet:ViewStyle|TextStyle|ImageStyle
) {
    const componentStyle = StyleSheet.create({ style: stylesheet }).style
    return (props:Props)=>{
        let propStyle = props.style
        let style
        if (propStyle) {
            if (Array.isArray(propStyle)) {
                propStyle.unshift(componentStyle)
                style = propStyle
            } else style = [componentStyle, propStyle]
        } else style = componentStyle
        return (
            <NativeComponent {...props} style={style}></NativeComponent>
        )
    }
}
