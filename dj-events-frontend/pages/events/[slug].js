import { API_URL } from "@/config/index"
export default function EventPage({ post }) {
    console.log(post)
    return (
        <div>{post.name}</div>
    )
}


export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()
    console.log(events)
    const paths = events.map(evt => ({
        params: { slug: evt.slug }
    }))
    return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${API_URL}/api/events/${params.slug}`)
    const post = await res.json()

    // Pass post data to the page via props
    return { props: { post: post[0] } }
}
