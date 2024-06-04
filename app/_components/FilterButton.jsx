export default function Button({ filter, filterName, children, handleFliter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 duration-500 ${
        filterName === filter ? 'bg-primary-700' : ''
      }`}
      onClick={() => handleFliter(filter)}
    >
      {children}
    </button>
  )
}
