import './styled.css'
export default function Seletores({ area, nomes = [] }) {
    return (


        <div className='selecao'>
            <label>{area}</label>
            <select>
                {nomes.map((nome, index) => (<option key={index}>{nome}</option>))}
            </select>
        </div>


    )



}


