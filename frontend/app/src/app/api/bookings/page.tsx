"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BookingForm: React.FC = () => {
  const [service, setService] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter(); // for client-side navigation

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bookingData = {
      service,
      doctor_name: doctorName,
      start_time: `${date}T${startTime}`,
      end_time: `${date}T${endTime}`,
      date
    };

    try {
      const response = await fetch('http://host.docker.internal:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
        // Removed mode: 'no-cors'
      });

      if (response.ok) {
        setSuccessMessage('Booking created successfully!');
        setService('');
        setDoctorName('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setErrors({});
        router.push('/'); // Redirect to the main page
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.error || 'An error occurred. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred while submitting the booking.' });
    }
  };

  const inputStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid white',
    padding: '8px',
    marginBottom: '10px'
  };

  return (
    <div>
      <h2>Create a new booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Service:
            <input
              type="text"
              value={service}
              onChange={(event) => setService(event.target.value)}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <div>
          <label>
            Doctor Name:
            <input
              type="text"
              value={doctorName}
              onChange={(event) => setDoctorName(event.target.value)}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <div>
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <div>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              required
              style={inputStyle}
            />
          </label>
        </div>
        {errors.general && (
          <div style={{ color: 'red' }}>{errors.general}</div>
        )}
        {successMessage && (
          <div style={{ color: 'green' }}>{successMessage}</div>
        )}
        <br />
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
