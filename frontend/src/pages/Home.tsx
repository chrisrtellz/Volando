import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import WhyVolando from '../components/WhyVolando'

function Home() {

  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <HowItWorks />

        <WhyVolando />

      </main>
    </>
  )

}

export default Home