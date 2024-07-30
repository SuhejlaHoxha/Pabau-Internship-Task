import { useState } from 'react';
import { useRouter } from 'next/router';

const NewBooking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      name,
      email,
      date,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      const response = await fetch('/api/newbooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fields = [
    {
      name: 'doctor_name',
      label: 'Name',
      type: 'text',
      value: name,
      onChange: setName,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: email,
      onChange: setEmail,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      value: date,
      onChange: setDate,
    },
    {
      name: 'tart_time',
      label: 'Start Time',
      type: 'time',
      value: startTime,
      onChange: setStartTime,
    },
    {
      name: 'end_time',
      label: 'End Time',
      type: 'time',
      value: endTime,
      onChange: setEndTime,
    },
  ];
  
  return (
    <div>
      <h1>Create a new booking</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name}>
            {field.label}:
            <input
              type={field.type}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
            />
            {errors[field.name] && (
              <div style={{ color: 'ed' }}>{errors[field.name]}</div>
            )}
          </label>
        ))}
        <br />
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}

export default NewBooking;