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



        <footer className="footer">


          <div className="footer-content">



            <div className="footer-brand">


              <h2>
                🚀 Volando
              </h2>


              <p>
                Entregas rápidas,
                seguras y confiables.
              </p>


            </div>





            <div className="footer-links">


              <h3>
                Plataforma
              </h3>


              <a href="#">
                Inicio
              </a>


              <a href="#como-funciona">
                Cómo funciona
              </a>


              <a href="#quienes-somos">
                Quiénes somos
              </a>


              <a href="#contacto">
                Contacto
              </a>


            </div>





            <div className="footer-links">


              <h3>
                Servicios
              </h3>


              <a href="#">
                Solicitar entrega
              </a>


              <a href="#">
                Ser mensajero
              </a>


              <a href="#">
                Seguridad
              </a>


            </div>



          </div>





          <div className="footer-bottom">


            <p>
              © {new Date().getFullYear()} Volando. Todos los derechos reservados.
            </p>


            <small>
              Desarrollado por C. Reyes
            </small>



          </div>



        </footer>



      </main>


    </>

  )

}


export default Home