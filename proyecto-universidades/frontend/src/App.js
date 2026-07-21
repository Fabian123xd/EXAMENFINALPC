import { useEffect, useState } from "react";

function App() {

  const [texto, setTexto] = useState("");
  const [universidades, setUniversidades] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    setCargando(true);
    setError("");

   fetch(`http://potential-memory-gxqpv449xv3p4xj-3001.app.github.dev/api/universidades`)
      .then(res => res.json())
      .then(data => {
        setUniversidades(data);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al consultar.");
        setCargando(false);
      });

  }, [texto]);

  return (

    <div style={{padding:20}}>

      <h1>Universidades del Perú</h1>

      <input
        type="text"
        placeholder="Buscar universidad"
        value={texto}
        onChange={(e)=>setTexto(e.target.value)}
      />

      {cargando && <p>Cargando...</p>}

      {error && <p>{error}</p>}

      {universidades.map((u)=>(

        <div key={u.paginaWeb}>

          <h3>{u.nombre}</h3>

          <p>{u.pais}</p>

          <p>{u.dominio}</p>

          <a href={u.paginaWeb}>{u.paginaWeb}</a>

          <hr/>

        </div>

      ))}

    </div>

  );

}

export default App;