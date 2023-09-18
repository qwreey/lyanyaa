import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
    useRef,
    type PropsWithChildren,
} from 'react'

export type TransactionState<U> = {
    running: boolean,
    result?:U,
    errored?: boolean,
}

export type ValueHandler<KEY = string> = {
    prefetch():       undefined,
    read():           TransactionState<any>,
    write(value:any,errorHandler?:(error:string)=>undefined): TransactionState<any>,
}

export const StorageContext = createContext({
    cachedValues: {},
    updateTriggers: {},
    waitingReadPromises: {},
} as {
    cachedValues: {
        [key: string]: TransactionState<any>
    },
    updateTriggers: {
        [key: string]: Array<React.Dispatch<React.SetStateAction<any>>>
    },
    waitingReadPromises: {
        [key: string]: Promise<object>|undefined
    }
})

export const createStorage = ()=>{
    const storage = useRef({
        cachedValues: {},
        updateTriggers: {},
        waitingReadPromises: {},
    })

    return ({children}: PropsWithChildren)=>(
        <StorageContext.Provider value={storage.current}>
            {children}
        </StorageContext.Provider>
    )
}

export const useStorage = (key: string) => {
    const storageCache = useContext(StorageContext)
    const [ _, updateTrigger ] = useState({})
    const updateTriggerMemoed = useCallback(updateTrigger,[])

    useEffect(()=>{
        let updateTriggers = storageCache.updateTriggers[key]
        if (updateTriggers === undefined)
            updateTriggers = storageCache.updateTriggers[key] = []
        updateTriggers.push(updateTriggerMemoed)
        return ()=>{
            updateTriggers.splice(updateTriggers.indexOf(updateTriggerMemoed),1)
        }
    },[])

    const storage = useCallback(({
        read() {
            let value = storageCache.cachedValues[key]
            if (value) return value
            if (storageCache.waitingReadPromises[key]) return { running: true }
            AsyncStorage.getItem(key).then(value=>{
                storageCache.cachedValues[key] = { running: false, result: JSON.parse(value ?? "null"), errored: false }
            }).catch(error=>{
                storageCache.cachedValues[key] = { running: false, result: error, errored: true }
            }).finally(()=>{
                if (storageCache.updateTriggers[key])
                    for (const trigger of storageCache.updateTriggers[key])
                        trigger({})
            })
            return { running: true }
        },
        write(value, errorHandler) {
            AsyncStorage.setItem(key,JSON.stringify(value)).then(()=>{
                storageCache.cachedValues[key] = { running: false, result: value, errored: false }
                if (storageCache.updateTriggers[key])
                    for (const trigger of storageCache.updateTriggers[key])
                        trigger({})
            }).catch(errorHandler||(error=>{console.error(error)}))
        }
    } as ValueHandler) as unknown as Function,[]) as unknown as ValueHandler<typeof key>

    return storage
}
