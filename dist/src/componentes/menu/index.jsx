import { Outlet } from "react-router-dom";
import LinksMenu from "../LinksMenu";
import "./styled.css"

function Menu() {

    return (
        <>
            <nav>
                <ul>           
                    <LinksMenu to="Liberacao" children={"🧾 Liberacao"} />
                    <LinksMenu to="Relatorio" children={"📊 Relatorio de Producao"} />
                </ul>

            </nav>


            <Outlet />
        </>



    )

}

export default Menu