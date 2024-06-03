// import { getCountries } from '@/app/_lib/data-service'
import { countryData } from '../_lib/countries'

function SelectCountry({ defaultCountry, name, id, className }) {
  // const countries = await getCountries()
  const countries = countryData
  const sortedCountries = countries.sort(function (a, b) {
    if (a.name.common < b.name.common) {
      return -1
    }
    if (a.name.common > b.name.common) {
      return 1
    }
    return 0
  })

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}`}
      className={className}
    >
      <option value="">Select country...</option>
      {sortedCountries.map((c) => (
        <option key={c.name.common} value={`${c.name.common}`}>
          {c.name.common}
        </option>
      ))}
    </select>
  )
}

export default SelectCountry
