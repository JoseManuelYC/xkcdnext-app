import { Footer } from "./Footer.jsx"
import { Header } from "./Header.jsx"

export function Layout({children}){
    return(
        <>
        <Header />
        <main className='max-w-xl m-auto'>
            {children}
        </main>
        <Footer />
        </>
    )
}