import { FormEvent, useEffect, useState } from "react";
import "./search.css";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [defaultValue, setDefaultValue] = useState<string>('')

  useEffect(() => {
    if (location.pathname === '/search') {
      if (!defaultValue) {
        const searchParams = new URLSearchParams(location.search);
        const name = searchParams.get('name') || '';
        const nameArray = name.split('+')
        const nameWithSpace = nameArray.join(" ")
        setDefaultValue(nameWithSpace)
      }
    }
  }, [location.pathname])

  const searchProductHandler = (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const searchParams = form.search.value
    if (searchParams.length === 0) {
      return
    }
    const searchParamsArray = searchParams.split(' ')
    const searchQuery = searchParamsArray.join('+')

    navigate(`/search?name=${searchQuery}`)
  }
  return (
    <form onSubmit={(e) => searchProductHandler(e)} className="form w-32 bg-secondary sm:w-40 lg:w-56">
      <label htmlFor="search">
        <input
          required
          defaultValue={defaultValue}
          name="search"
          autoComplete="off"
          placeholder="search"
          id="search"
          type="text"
        />
        <button type="submit" className="icon">
          <svg
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="swap-on"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      </label>
    </form>
  );
};

export default Search;
