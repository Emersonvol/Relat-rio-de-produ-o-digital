import LibercaoOkNotOk from "../../componentes/liberacaoOK"
import Seletores from "../../componentes/selects"
import "./styled.css"
export default function Formulario({operacao}) {
    const submit = (e) =>{
        e.preventDefault();
    }
    return (
        <div className="formulario">
            <form className="liberacao-formulario" onSubmit={submit}>
                <h3>Opercao cod:{operacao}</h3>
                <Seletores area={"Preparador"} nomes={[" ","Emerson", "Paulo", "Danielly"]} />

                <Seletores area={"Numero do programa"} nomes={["01", "02", "03"]} />
                <Seletores area={"tipo anterior"} nomes={["01", "02", "03"]} />
                <Seletores area={"tipo posterior"} nomes={["01", "02", "03"]} />

                <LibercaoOkNotOk componete={"flange "} />
                <LibercaoOkNotOk componete={"grew Flow "} />
                <LibercaoOkNotOk componete={"componente condizem com o tipo "} />
                <LibercaoOkNotOk componete={"padrão de trinca "} />
                <LibercaoOkNotOk componete={"padrão de aprova "} />
                <LibercaoOkNotOk componete={"padrão de dureza "} />
                <button className="btn-enviar">Enviar</button>
            </form>

        </div>

    )

}










