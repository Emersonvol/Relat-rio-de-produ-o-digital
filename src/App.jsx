import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./componentes/menu";
import "./styled.css"
import Relatorio from "./telas/Relatorio";
import PaginaPadrao from "./telas/paginaPadrao";
import Erro from "./telas/Erro";
import Historico from "./telas/Historico";


function App() {

  return (
    <main>
      <BrowserRouter>
        
        <Routes>
          <Route>
            <Route path="/" element={<PaginaPadrao/>} />
            <Route path="relatorio" element={<Relatorio />} />
            <Route path="historico" element={<Historico/>}/>
            <Route path="*" element={<Erro />} />
          </Route>
        </Routes>
        <Menu />

      </BrowserRouter>
    </main>
  )
}

export default App
