'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Add to Counter</button>
      <button onClick={() => setCount((c) => (c = 0))}>Clear Counter</button>
    </div>
  )
}
