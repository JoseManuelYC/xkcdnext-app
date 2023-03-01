import Link from "next/link";
import { useRouter } from "next/router";
import { useState,useRef } from "react";

export function Header(){

    const [results,setResults]=useState([])
    const searchRef=useRef()
    const {locale, locales}=useRouter()

    const handleChange=()=>{
        const q=searchRef.current.value
        fetch(`/api/search?q=${q}`)
            .then(res=>res.json())
            .then(searchResults=>{
                setResults(searchResults)
            })
    }

        const restOfLocales=locales.filter(l=>l!==locale)

    return(<header className='flex justify-between item-center p-3 max-w-xl m-auto'>
            <h1 className='font-bold'><Link href='/' className="hover:opacity-80">Next<span className='font-light'>XkCd</span></Link></h1>
            <nav>
                <ul className="flex flex-row gap-4 ">
                    <li className="text-sm font-semibold">
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link legacyBehavior href='/' locale={restOfLocales[0]}>
                        <a className="text-sm font-semibold">{restOfLocales[0]}</a>
                        </Link>
                    </li>
{/*                     <li className="text-sm font-semibold"><Link href='/search'>Search</Link></li> */}
 {/*                    <li>
                    <input ref={searchRef} className='px-5 py-1 border border-gray-300 rounded-3xl text-xs' placeholder="Buscar comics" type='search' onChange={handleChange} />
                    <div className='relative mt-1'>
                    {
                        Boolean(results.length)&&<div className='absolute top-0 left-0'>
                            <ul className='w-full border overflow-hidden border-gray-300 rounded-lg shadow-xl bg-gray-200'>
                                {results.map(result=>{
                                    return(
                                        <li className='p-1 border border-gray-300 m-0 hover:bg-gray-300' key={result.id}>
                                        <Link legacyBehavior href={`/comics/${result.id}`}>
                                        <a className='text-sm font-semibold'>{result.title}</a>
                                        </Link>
                                    </li>
                                    )
                                })}
                            </ul>

                        </div>
                    }
                    </div>
                    </li> */}
                </ul>
            </nav>
    </header>
    );
}