import {createContext, useContext, useState} from "react"
type Global = {
    isLoggedIn: boolean,
    setIsLoggedIn: (data:boolean)=>void
}

const ContextVariable = createContext({} as Global)

export const useGlobalContext = ()=>useContext(ContextVariable)

export const ContextComponent = ({children}:{children:React.ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  return <ContextVariable.Provider value={{isLoggedIn, setIsLoggedIn}}>
    {children}
  </ContextVariable.Provider>
}
