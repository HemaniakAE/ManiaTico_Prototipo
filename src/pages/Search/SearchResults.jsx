import './SearchResults.css'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import SearchResultsCatalog from '../../Components/SearchResultsCatalog'
import SettingsPanel from '../../Components/SettingsPanel'

function SearchResults() {
  return (
    <>
      <Header />
      <div className='search-layout'>
        <Sidebar />
        <div className="search-content">
        <SearchResultsCatalog />
        <SettingsPanel />
        </div>
      </div>  
    </>
  )
}

export default SearchResults