import './Home.css'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Catalog from '../../Components/Catalog'
import SettingsPanel from '../../Components/SettingsPanel'

function Home() {
  return (
    <>
      <Header />

      <div className='home-layout'>
        <Sidebar />
        <div className="home-content">
          <Catalog />
        </div>
      </div>
      <SettingsPanel />
    </>
  )
}

export default Home;
