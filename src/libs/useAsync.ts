import { useState, useEffect } from 'react'

export type AsyncState<U> = {
    running: boolean,
    result?:U,
    errored?: boolean,
}

export function useAsync<T extends Array<unknown>,U>(func:(...args: T)=>Promise<U>,args: T = [] as unknown as T,dependencies: Array<unknown> = []):AsyncState<U> {
    const [result,setResult] = useState({ running: true, errored: false } as AsyncState<U>)

    useEffect(()=>{
        func(...args).then(value=>{
        setResult({ running:false, result: value, errored: false })
        }).catch(reason=>{
        setResult({ running:false, result: reason, errored: true })
        })
    },dependencies)

    return result
}
