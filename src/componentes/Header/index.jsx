import "./styled.css"

function Header({ tituloPagina }) {
    let dataAtual = new Date()
    let hora = dataAtual.getHours()
    let minutos = dataAtual.getMinutes()
    let segundos = dataAtual.getSeconds()

    let horaCompleta = `${hora}:${minutos}:${segundos}`
    return (

        <>
            <header>
                <p></p>
                <img src="./logo-sem-fundo.png" alt="logo do empresa" />
                <h2>{tituloPagina}</h2>
                <p>{horaCompleta} <br /> 12/11/2025</p>
            </header>
        </>
    )




}

export default Header