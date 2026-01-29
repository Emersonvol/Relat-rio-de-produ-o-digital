import BarsDataset from "../../componentes/graficosMui";
import Header from "../../componentes/Header";
import "./styled.css"

function PaginaPadrao() {
  return (
    <>
      <Header />

      <section className="paginaPadrao">
        <div className="div-paginaPadrao">
          <h2>Relatorio de produção </h2>
          <img src="./logo-sem-fundo.png" />
          <h3>SKF</h3>
        </div>
       
      </section>
    </>
  )


}


export default PaginaPadrao;

