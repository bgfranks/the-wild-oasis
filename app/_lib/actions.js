'use server'

import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from './auth'
import { supabase } from './supabase'

// AUTH
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
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

// DELETE
export async function deleteReservation(bookingId) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }
}
