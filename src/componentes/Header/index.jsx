import "./styled.css"
import { useEffect,  useState } from "react";

function Header({ tituloPagina }) {
    const [dataCompleta, setDataCompleta] = useState("")
    const [horaCompleta, setHoraCompleta] = useState("")
    useEffect(() => {
        let dataAtual = new Date()

       
        const intervaloAtt = setInterval(() => {
            setHoraCompleta(dataAtual.toLocaleTimeString())
            setDataCompleta(dataAtual.toLocaleDateString())  
        },1000)
        
        return () =>{
            clearInterval(intervaloAtt)
        }
        

    })
    return (

        <>
            <header>
                
                <img src="./logo-sem-fundo.png" alt="logo do empresa" />
                <h2>{tituloPagina}</h2>
                <p>{horaCompleta} <br /> {dataCompleta}</p>
            </header>
        </>
    )




}

export default Header