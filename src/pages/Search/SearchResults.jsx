import './SearchResults.css'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import SearchResultsCatalog from '../../Components/SearchResultsCatalog'

function SearchResults() {
  return (
    <>
      <Header />
      <div className='search-layout'>
        <Sidebar />
        <div className="search-content">
        <SearchResultsCatalog />
        </div>
      </div>  
    </>
  )
}

export default SearchResults