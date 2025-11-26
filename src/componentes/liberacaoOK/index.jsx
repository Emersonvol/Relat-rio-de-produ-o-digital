import "./styled.css"

export default function LibercaoOkNotOk({ componete }) {

    return (
        <div className="componente">
            <label htmlFor="flange">{componete}</label>
            <div className="componente-chbox">
                <input type="checkbox" id="flange" name="flange" />
                <label>ok</label>

                <input type="checkbox" id="parametroNaoOk" name="parametroNaoOk" />
                <label>not OK</label>
            </div>
        </div>
    )







}