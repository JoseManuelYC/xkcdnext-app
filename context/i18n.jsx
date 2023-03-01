import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from '../translation/es.json'
import en from '../translation/en.json'

const I18nContext=createContext()
const languages={es, en}

export function I18nProvider({children}){
    const {locale}=useRouter()
    
    const trans= useCallback((key)=>{
        return languages[locale][key]
    },[locale])

    return(
        <I18nContext.Provider value={{trans}}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18N(){
    const context=useContext(I18nContext)
    if(context===undefined){
        throw new Error("useI18N")
    }
    return context
}