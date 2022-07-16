import Head from 'next/Head'
import styles from '../styles/Home.module.css'
import Footer from './Footer'
import Header from './Header'
export default function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' description={description} />
                <meta name='keywords' keywords={keywords} />
            </Head>
            <Header />
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>

    )
}

Layout.defaultProps = {
    title: 'Find all dj events',
    keywords: ' dj, music concerts, parties',
    description: 'find all latest dj, music concerts, parties'
}