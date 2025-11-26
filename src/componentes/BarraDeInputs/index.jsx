import PkMultiplicadores from "./pkMultiplicadores"
import "./styled.css"

export default function BarraDeInputs({ Change, valor,valoOrdemAtual }) {
    
    return (
        <div className="container">
            <label htmlFor="opResponsavel">Nome do operador responsavel:</label>
            <input
                onChange={Change}
                type="text"
                value={valor}
                className="NomeDoOperador"
                id="opResponsavel"
                
            />

            <PkMultiplicadores/>

    

            <label>Lote:</label>
            <input
                type="Number"
                placeholder="Lote atual"
                className="NomeDoOperador"
                id="opResponsavel"
                
                
            />
            <label>Ordem:</label>
            <input
                type="text"
                placeholder="Ordem atual"
                className="NomeDoOperador"
                id="opResponsavel"

            />

            <div className="loteOrdem">
                <h3>Lote Atual:<strong>{valoOrdemAtual} </strong></h3>
                <h3>Ordem Atual :<strong>MC3T</strong></h3>
            </div>

        </div>


    )





}