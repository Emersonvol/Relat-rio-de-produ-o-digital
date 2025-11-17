import Formulario from "../../componentes/formulario"
import Header from "../../componentes/Header"
import "./styled.css"
export default function Liberacao() {
    
    return (
        <>
            <Header tituloPagina={"Liberacao de maquina"} />
            <section className="liberacao">

                <Formulario operacao={'m584'} />
                <Formulario operacao={'m600'} />
                <Formulario operacao={'m715'} />

            </section>
        </>
    )
}










