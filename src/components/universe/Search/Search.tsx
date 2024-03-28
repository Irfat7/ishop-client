import './search.css'

const Search = () => {
    return (
        <form className="form bg-secondary w-32 sm:w-40 lg:w-56">
            <label htmlFor="search">
                <input required autoComplete='off' placeholder="search" id="search" type="text" />
                <button type="reset" className='icon'>
                    <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="swap-on">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                </button>
            </label>
        </form>
    );
};

export default Search;