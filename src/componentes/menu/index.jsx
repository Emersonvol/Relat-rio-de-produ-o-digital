import { Outlet } from "react-router-dom";
import LinksMenu from "../LinksMenu";
import "./styled.css"
// <LinksMenu to="Liberacao" children={"🧾 Liberacao"} />
function Menu() {

    return (
        <>
            <nav>
                <ul>
                   
                    <LinksMenu to="Relatorio" children={"📊 Relatorio de Producao"} />
                </ul>

            </nav>


            <Outlet />
        </>



    )

}


export default Menu
