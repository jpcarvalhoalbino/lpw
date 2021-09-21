import React, {useState , useEffect} from "react";

import "./styles.css";

function Home() {
  const [IBGE, setIBGE] = useState('')
  const [município, setmunicípio] = useState('')
  const [estado, setestado] = useState('')
  const [Acao, setAcao] = useState('')
 const [Things, setThings] = useState([])


  function handleAddIBGE(event) {
    event.preventDefault();
    const data = {
      id: new Date().getTime(),
      IBGE,
      município,
      estado,
      Acao
    }
    if(IBGE === '' || município === '' || estado === ''){
      alert('Favor preencher o campo que está vazio.')
      return
    }
   
  console.log(data)

    setThings([...Things,data])
  setIBGE('')
  setmunicípio('')
  setestado('')
  setAcao('')
  }

  function handleDelete(id) {
    setThings(Things.filter(thing => thing.id !== id ))
  }

  useEffect(() =>{
    function loadData() {
      const storageThings = localStorage.getItem('@cadcthings:things')
      if (storageThings) {
        setThings(JSON.parse(storageThings))
      }
    }
    loadData()
  }, [])
  useEffect(() => {
    function saveData() {
      localStorage.setItem('@cadcthings:things', JSON.stringify(Things))
    }
    saveData()
  }, [Things])

  return (

    <div className="page">
      <form className="IBGE" onSubmit={handleAddIBGE}>
        <input
          name="IBGE"
          placeholder="Digite seu IBGE"
          type="text"
          value={IBGE}
          onChange={(event) => setIBGE(event.target.value)}
        />
        <input
          name="município"
          type="text"
          placeholder="Digite seu município"
          value={município}
          onChange={(event) => setmunicípio(event.target.value)}
        />
        
        <input
          name="estado"
          type="text"
          placeholder="Digite o seu estado"
          value={estado}
          onChange={(event) => setestado(event.target.value)}
        />
       
        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>IBGE</th>
            <th>município</th>
            <th>estado</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {Things.map(thing => (
            <tr key={thing.id}>
              <td>{thing.IBGE}</td>
              <td>{thing.município}</td>
              <td>{thing.estado}</td>
              <td>{thing.Açao}
              <button
                className="Excluir"
                onClick={() => handleDelete(thing.id)}
                >
                Excluir
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
    </div>
  );
}

export { Home };