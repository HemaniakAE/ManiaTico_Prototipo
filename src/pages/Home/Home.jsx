import './Home.css'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'

function Home() {
  return (
    <>
      <Header />
      <div className='home-layout'>
        <Sidebar />
        <div className="home-content">
          <img src="/Logo_ManiaTico.png" alt="Logo ManiaTico" className="logo" />
        </div>
      </div>  
    </>
  )
}

export default Home