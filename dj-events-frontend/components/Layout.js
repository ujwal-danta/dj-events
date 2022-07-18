import Head from 'next/Head'
import styles from '@/styles/Home.module.css'
import Footer from './Footer'
import Header from './Header'
import Showcase from './Showcase'
import { useRouter } from 'next/router'

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter()
    console.log(router)
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' description={description} />
                <meta name='keywords' keywords={keywords} />
            </Head>
            <Header />
            {router.pathname === '/' && <Showcase />}
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>

    )
}

Layout.defaultProps = {
    title: 'Find your DJ Events',
    keywords: ' dj, music concerts, parties',
    description: 'find all latest dj, music concerts, parties'
}