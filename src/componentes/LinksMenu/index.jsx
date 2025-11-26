import {  NavLink } from "react-router-dom";
import "./styled.css"

function LinksMenu({to,children}) {
    return (
      
            <li >
                <NavLink  className={({ isActive }) => (isActive ?'link-ativo':'')}   to={to}>{children}</NavLink>
            </li>
       

    )


}

export default LinksMenu