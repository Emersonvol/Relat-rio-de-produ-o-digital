import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import Menu from "./componentes/menu";
import "./styled.css"
import Relatorio from "./telas/Relatorio";
import PaginaPadrao from "./telas/paginaPadrao";
import Erro from "./telas/Erro";
import Liberacao from "./telas/Liberacao";

function App() {

  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route>
            <Route path="/" element={<PaginaPadrao />} />
            <Route path="Relatorio" element={<Relatorio />} />
            <Route path="Liberacao" element={<Liberacao />}></Route>
            <Route path="*" element={<Erro />} />
          </Route>
        </Routes>
        <Menu />

      </BrowserRouter>
    </main>
  )
}

export default App
