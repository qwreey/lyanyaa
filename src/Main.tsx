import { Button } from "react-native"
import { useStorage } from "./libs/useStorage"
import { useCallback, useState, useRef } from "react"

export default function Main() {
    const testStorage = useStorage('test')

    const onPress = useCallback(()=>{
        if (testStorage.read().running) return
        testStorage.write((parseInt(testStorage.read().result) || 0) + 1)
    },[])
    return (
        <Button
            title={
                testStorage.read().running ?
                "Loading . . ." :
                testStorage.read().result + ""
            }
            onPress={onPress}
        ></Button>
    )
}
