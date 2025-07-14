import {createContext, useState} from 'react'

export let CounterContext = createContext(0)

export default function CounterContextProvider(props){
   const[counter,setCounter]= useState(0)
   const[user,setUser]= useState('ahmed')

   return <CounterContext.Provider value={{counter , setCounter , user ,setUser}}>
    {props.children}
    </CounterContext.Provider>
}