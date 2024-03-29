import Layout from "@/components/Layout"
import { API_URL } from '@/config/index'
import EventItem from "@/components/EventItem"
import qs from 'qs'
import { useRouter } from "next/router"
import Link from "next/link"


export default function SearchPage({ events }) {
    const router = useRouter()
    return (
        <Layout title='Search Results'>
            <Link href='/events'>Go Back</Link>
            <h1>Search Results for {router.query.term}</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    const { term } = query

    const queryString = qs.stringify({
        filters: {
            $or: [
                {
                    name: {
                        $contains: term,
                    },
                },
                {
                    performers: {
                        $contains: term,
                    },
                },
                {
                    description: {
                        $contains: term,
                    },
                },
                {
                    venue: {
                        $contains: term,
                    },
                },
            ],

        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });

    const res = await fetch(`${API_URL}/api/events?${queryString}&populate=*`)
    const events = await res.json()
    return {
        props: {
            events: events.data
        }
    }
}
