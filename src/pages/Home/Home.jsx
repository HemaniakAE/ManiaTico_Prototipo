import './Home.css'
import Header from '../../Components/Header'

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <img src="/Logo_ManiaTico.png" alt="Logo ManiaTico" className="logo" />
      </div>
    </>
  )
}

export default Home