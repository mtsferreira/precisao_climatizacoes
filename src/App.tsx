import Navbar from './components/Navbar'
import MainCarousel from './components/MainCarousel'
import Footer from './components/Footer'

function App() {
  return (
    <>
      {/* Navbar fixa no topo */}
      <Navbar />

      {/* Conteúdo principal — carrossel com todos os slides */}
      <main>
        <MainCarousel />
      </main>

      {/* Rodapé */}
      <Footer />
    </>
  )
}

export default App
