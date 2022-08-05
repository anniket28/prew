import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Punjab Refrigeration</title>
      </Head>

      <Link href={'/book-appointment'}><a>Book Appointment</a></Link>
    </div>
  )
}
