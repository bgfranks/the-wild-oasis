'use server'

import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from './auth'
import { supabase } from './supabase'
import { getBookings } from './data-service'
import { redirect } from 'next/navigation'

// AUTH
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}

// CREATE
export async function createReservation(bookingData, formData) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  }

  const { error } = await supabase.from('bookings').insert([newBooking])

  if (error) {
    console.error(error)
    throw new Error('Booking could not be created')
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`)
  redirect('/cabins/thankyou')
}

// UPDATE
export async function updateProfile(formData) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const nationalID = formData.get('nationalID')
  const nationality = formData.get('nationality')

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid national ID')

  const updateData = { nationality, nationalID }

  console.log(updateData)
  console.log(session.user.guestId)

  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)

  if (error) throw new Error('Guest could not be updated')

  revalidatePath('/account/profile')
}

export async function updateReservation(formData) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const numGuests = formData.get('numGuests')
  const observations = formData.get('observations').slice(0, 1000)
  const reservationId = formData.get('reservationId')

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingsIds = guestBookings.map((booking) => String(booking.id))

  console.log(guestBookingsIds)

  if (!guestBookingsIds.includes(reservationId))
    throw new Error('You are not allowed to edit this booking')

  const updateData = { numGuests, observations }

  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', reservationId)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }

  revalidatePath('/account/reservations')
  revalidatePath(`/account/reservations/${reservationId}`)
  redirect('/account/reservations')
}

// DELETE
export async function deleteReservation(bookingId) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingsIds = guestBookings.map((booking) => booking.id)

  if (!guestBookingsIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking')

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId)

  if (error) throw new Error('Booking could not be deleted')

  revalidatePath('/account/reservations')
}
