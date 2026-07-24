import { useNavigate } from 'react-router-dom'


function Hero() {

  const navigate = useNavigate()


  return (
    <section className="hero">

      <div className="hero-text">

        <h1>
          Entregas rápidas.
          <br />
          Trabajo para todos.
        </h1>

        <p>
          Volando conecta personas que necesitan
          enviar algo con personas listas para entregar.
        </p>


        <div className="hero-buttons">

          <button 
            className="primary"
            onClick={() => navigate('/client')}
          >
            Solicitar envío
          </button>


          <button 
            className="secondary"
            onClick={() => navigate('/messenger')}
          >
            Hacer mensajeria
          </button>


        </div>

      </div>


      <div className="hero-visual">

        <div className="map-box">

          <div className="route">

            <span className="point">
              📍
            </span>

            <span className="line"></span>

            <span className="bike">
              🛵
            </span>

            <span className="line"></span>

            <span className="point">
              📍
            </span>

          </div>


          <p>
            Entrega en movimiento
          </p>

        </div>

      </div>

    </section>
  )
}


export default Hero