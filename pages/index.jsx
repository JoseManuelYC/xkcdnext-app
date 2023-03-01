import Head from 'next/head'
import fs from 'fs/promises'
import Link from 'next/link'
import Image from 'next/image'
import { Layout } from '@/components/Layout.jsx'
import { useI18N } from '@/context/i18n'



export default function Home({latestComics}) {
  const {trans}=useI18N()
  return (
    <>
      <Head>
        <title>XkCd - Comic</title>
        <meta name="description" content="Comics for developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
      <main>
        <h2 className='text-3xl font-bold text-center mb-10'>{trans('LATEST_COMICS')}</h2>
        <section className='grid grid-cols-1 gap-4 max-w-md m-auto pt-4 sm:grid-cols-2 md:grid-cols-3'>
        {
          latestComics.map(comic=>{
            return(
              <Link legacyBehavior href={`/comic/${comic.id}`} key={comic.id}>
            <a className='mb-4 pb-4 m-auto'>
              <h3 className='font-bold text-sm text-center pb-2'>{comic.title}</h3>
            <Image className='aspect-square' width={comic.width} height={comic.height} src={comic.img} alt={comic.alt}/>
            </a>
            </Link>
            )
          })
        }
        </section>
      </main>
      </Layout>
    </>
  )
}
export async function getStaticProps(context){
  const files= await fs.readdir('./comics')
  const latestComicsFiles=files.slice(-10, files.length)

  const promisesReadFiles=latestComicsFiles.map(async(file)=>{
  const content= await fs.readFile(`./comics/${file}`,'utf-8')
    return JSON.parse(content)
        })

   const latestComics = await Promise.all(promisesReadFiles)//esperar las promesas

  return{
    props:{
      latestComics
    }
  }
}
