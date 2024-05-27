import Image from 'next/image'

import about1 from '@/public/about-1.jpg'
import about2 from '@/public/about-2.jpg'
import Link from 'next/link'

export const metadata = {
  title: 'About',
}

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>
        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and confortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our 8 luxury cabins provide a cozy base, but the real freedom and
            peace you&apos;ll find is in the surrounding mountains. Wander
            through lush forests, breathe in the fresh air, and watch the stars
            twinkle above from the warmth of a campire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, sourrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>
      <div className="col-span-2">
        <Image
          src={about1}
          placeholder="blur"
          alt="Family sitting around a fire pint in front of a cabin"
        />
      </div>
      <div className="col-span-2">
        <Image
          src={about2}
          placeholder="blur"
          alt="Family taht manages The Wild Oasis"
        />
      </div>
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Manged by our family since 1962
        </h1>
        <div className="space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nutured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm and welcoming enviroment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visist
            is like coming home.
          </p>
          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transtion-all duration-500 ease-in-out"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
