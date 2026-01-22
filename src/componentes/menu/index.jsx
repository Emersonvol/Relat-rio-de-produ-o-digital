import { Outlet } from "react-router-dom";
import LinksMenu from "../LinksMenu";
import "./styled.css"

function Menu() {

    return (
        <>

            <nav className="navbar navbar-dark  position-absolute">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Controle Skf</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                <LinksMenu to="relatorio" children={"📊 Relatorio de Producao"} />
                                <LinksMenu to="historico" children={"🧾 Historico"} />

                            </ul>

                        </div>
                    </div>
                </div>
            </nav>




            <Outlet />




        </>



    )

}

export default Menu