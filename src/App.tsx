import Navbar from './components/Navbar'
import HeroText from './components/HeroText'
import MainCarousel from './components/MainCarousel'
import FeatureCards from './components/FeatureCards'
import WhatsAppCTA from './components/WhatsAppCTA'
import Footer from './components/Footer'

function App() {
  return (
    <>
      {/* Navbar fixa no topo */}
      <Navbar />

      {/* Nova estrutura vertcial com scroll */}
      <main>
        {/* Sessão inicial com título e texto principal */}
        <HeroText />

        {/* Carrossel exclusivo para o portfólio de fotos */}
        <MainCarousel />

        {/* Cards de vantagens / diferenciais */}
        <FeatureCards />

        {/* Chamada para ação final de WhatsApp */}
        <WhatsAppCTA />
      </main>

      {/* Rodapé */}
      <Footer />
    </>
  )
}

export default App
