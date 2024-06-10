import { auth } from '../_lib/auth'

export const metadata = {
  title: 'Account',
}

export default async function Page() {
  const session = await auth()
  const {
    user: { name },
  } = session
  const firstName = name.split(' ').at(0)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {firstName}
      </h2>
    </div>
  )
}
