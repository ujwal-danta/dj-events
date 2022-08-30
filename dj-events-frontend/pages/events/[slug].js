import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from "@/config/index"
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Event.module.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Layout from "@/components/Layout"
import { useRouter } from 'next/router'


export default function EventPage({ post, id }) {
    const router = useRouter()
    const deleteEvent = async (e) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${id}`,
                {
                    method: 'DELETE'
                })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
            }
            else {
                router.push(`/events`)
            }
        }


    }
    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete}
                        onClick={deleteEvent}
                    >
                        <FaTimes /> Delete Event
                    </a>
                </div>
                <span>
                    {post.date} at {post.time}
                </span>
                <h1>{post.name}</h1>
                {post.image && (
                    <div className={styles.image}>
                        <Image src={post.image.data ? post.image.data.attributes.formats.medium.url : '/images/event-default.png'}
                            width={960} height={600} />
                    </div>
                )}
                <h3>Peformers:</h3>
                <p>{post.performers}</p>
                <h3>Description:</h3>
                <p>{post.description}</p>
                <h3>Venue: {post.venue}</h3>
                <p>{post.address}</p>

                <Link href={`/events`}>
                    <a className={styles.back}>
                        {"<"}   Go Back
                    </a>
                </Link>
            </div>
        </Layout>
    )
}


export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()
    const paths = events.data.map(evt => ({
        params: { slug: evt.id.toString() }
    }))
    return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${API_URL}/api/events/${params.slug}/?populate=*`)
    const post = await res.json()

    // Pass post data to the page via props
    return { props: { post: post.data.attributes, id: post.data.id } }
}
