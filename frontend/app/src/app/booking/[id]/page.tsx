"use client"

import React from 'react';
import { useRouter, useParams} from 'next/navigation';
import Link from 'next/link';

interface Booking {
  id: number;
  doctor_name: string;
  service: string;
  date: string;
  start_time: string;
  end_time: string;
}

const BookingPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [booking, setBooking] = React.useState<Booking | null>(null);

  React.useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`, {
          cache: 'no-store'
        });
    
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
    
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking Details</h1>
      <p>
        This Booking is with {booking.doctor_name} For {booking.service} and it ends on {booking.end_time}
      </p>
      <Link href="/">
  <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default BookingPage;