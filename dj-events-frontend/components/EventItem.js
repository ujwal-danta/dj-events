import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.css'
export default function EventItem({ evt }) {
    const data = evt.attributes
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image src={data.image.data.attributes.formats.thumbnail.url ? data.image.data.attributes.formats.thumbnail.url : '/images/event-default.png'}
                    width={170} height={100} />
            </div>
            <div className={styles.info}>
                <span>
                    {new Date(data.date).toLocaleDateString('en-US')} at {data.time}
                </span>
                <h3>{data.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${evt.id}`}>
                    <a className='btn'>Details</a>
                </Link>
            </div>
        </div>
    )
}
