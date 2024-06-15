'use client'

import { useOptimistic } from 'react'
import { deleteReservation } from '../_lib/actions'
import ReservationCard from './ReservationCard'

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId)
    }
  )

  async function handleDelete(bookdingId) {
    optimisticDelete(bookdingId)
    await deleteReservation(bookdingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  )
}

export default ReservationList
