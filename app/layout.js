import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Logo from './components/Logo'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Wild Oasis',
  description: 'Book luxuary cabins for your next vacation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Logo />
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
      <footer>
        <Footer />
      </footer>
    </html>
  )
}
