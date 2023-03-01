import { Layout } from "../../components/Layout.jsx"
import Head from "next/head"
import { search } from "@/services/search.jsx"
import Link from "next/link"
import Image from "next/image"

export default function Component({query,results}) {
  return (
    <>
        <Head>
            <title>XkCd - Results for {query}</title>
            <meta name="description" content={`Search results for ${query}`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Layout>
            <h1>{results.length} Resultados para {query}</h1>
            {
                results.map(result=>{
                    return(
                        <Link legacyBehavior href={`/comic/${result.id}`} key={result.id}>
                            <a className="flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-50">
                                <Image width='50' height='50' src={result.img} alt={result.alt} className='rounded-full' />
                                <div>
                                    <h2>{result.title}</h2>
                                </div>
                            </a>
                        </Link>
                    )
                })
            }
        </Layout>
    </>
  )
}
export async function getServerSideProps(context){
    /**Forma correcta de trabajar los microservicios en Next, mismo codigo de el search de la api */
    const {query}=context
    const {q =''}=query

    const {results}=await search({query:q})
/* 
    const response= await fetch('https://localhost:3000/api/search?q=' + q)
    const results= await response.json() MALA PRACTICA*/
    
    //SE PUEDE USAR FETCH SOLO PARA SERVICIOS EXTERNOS, NO PARA DIRECCIONES LOCALES de next o el mismo hot

    //LLAMAR API DE ANGOLIA PARA BUSCAR RESULTS
    return{
        props:{
            query: q,
            results
        }
    }

}
