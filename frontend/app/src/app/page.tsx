import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const Home: React.FC = async () => {

  const bookings = await getBookings()

  return (
    <div>
      <h1>Current booking count: {bookings.length}</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <Link href={`/booking/${booking.id}`}>
              A Booking on {booking.date} starting at {booking.start_time}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/api/bookings">
      <button>Create a new booking</button>
    </Link>
    </div>
  );
};

export default Home;