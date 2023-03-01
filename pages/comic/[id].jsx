import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {readFile, stat, readdir} from 'fs/promises'
import Link from 'next/link'
import { basename } from 'path'
import { Layout } from '@/components/Layout'

export default function Comic ({img, title, width, height, alt, hasNext,hasPrevius,prevId,nextId}) {
  return (
    <>
     <Head>
        <title>XkCd - Comic</title>
        <meta name="description" content="Comics for developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      <Layout>
          <main>
            <section className='max-w-lg m-auto'> 
              <h1 className='font-bold text-center mb-6 mt-10 text-xl'>{title}</h1>
              <Image layout='responsive' width={width} height={height} src={img} alt={alt}/>
              <p>{alt}</p>

              <div className='flex justify-between mt-4 font-bold '>
              {
                hasPrevius&&<Link legacyBehavior href={`./${prevId}`}>
                  <a className='text-gray-600'>👈Previus</a>
                </Link>
              }
              {
                hasNext&&<Link legacyBehavior href={`./${nextId}`}>
                  <a className='text-gray-600'>Next👉</a>
                </Link>
              }
              </div>
            </section>
          </main>
      </Layout>


    </>
  )
}
export async function getStaticPaths({locales}){

   const files= await readdir('./comics')//Leer el directorio donde estan los comics

   let paths=[]

   //locales=>['es','en'], esto porque al cambiar de idioma error 404 por la direccion de la page

   locales.forEach(locale=>{
    paths= paths.concat(files.map(file=>{

      const id=basename(file,'.json')
   
       return{params:{id}, locale}
      }))
   
   })
/* 
   const paths=files.map(file=>{

   const id=basename(file,'.json')

    return{params:{id}}
   })
 */
  return{
    paths,
    fallback: false //se ejectuta en el BG, usar false o blocking
  }
}


export async function getStaticProps({params}){

  const {id}=params

  const content= await readFile(`./comics/${id}.json`, 'utf-8')
  const comic= JSON.parse(content)

  const idNum= +id
  const prevId=idNum-1
  const nextId=idNum+1

  const [prevResult, nextResult]=await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevius= prevResult.status==='fulfilled'
  const hasNext= nextResult.status==='fulfilled'
    
  /* const promisesReadFiles=latestComicsFiles.map(async(file)=>{
    const content= await fs.readFile(`./comics/${file}`,'utf-8')
      return JSON.parse(content)
          })
  
     const latestComics = await Promise.all(promisesReadFiles)//esperar las promesas
   */

    return{
      props:{
        ...comic,
        hasNext,
        hasPrevius,
        nextId,
        prevId,
      }
    }
}
