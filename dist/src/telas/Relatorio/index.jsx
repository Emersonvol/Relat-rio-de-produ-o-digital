import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, reSplitAlphaNumeric } from "@tanstack/react-table";
import "./styled.css"
import Header from "../../componentes/Header";
import Modal from "../../componentes/modal";


function Relatorio() {
    let dataAtual = new Date()
    let dia = dataAtual.getDate()
    let mes = dataAtual.getMonth() + 1
    let ano = dataAtual.getFullYear()


    let dataCompleta = `${dia}/${mes}/${ano}`

    const hora = dataAtual.getHours()
    const minutos = dataAtual.getMinutes() + 1
    const segundos = dataAtual.getSeconds()

    const horaCompleta = `${hora}:${minutos}:${segundos}`

    const [sequencia, setSequencia] = useState(1)
    const [somatoria, setSomatoria] = useState(150)
    const [lista, setLista] = useState([])
    const [nomeOperador, setNomeOperador] = useState("")
    const [ordem, SetOrdem] = useState({
        ordensDoMes: [
            { id: 0, valor: 1800 },
            { id: 1, valor: 4950 },
            { id: 2, valor: 19500 },
            { id: 3, valor: 1500 },
            { id: 4, valor: 950 },

        ],
        ordemAtual: { id: 0, valor: 1800 }
    })
    const [btnDesativado, setBtnDesativado] = useState(false)

    const data = useMemo(() => lista, [lista])

    const columns = useMemo(() => [
        { header: "Data", accessorKey: "data" },
        { header: "Nome", accessorKey: "nome" },
        { header: "Sequência de Malas", accessorKey: "sequencia" },
        { header: "Horário de Saída de Cada Mala", accessorKey: "horario" },
        { header: "Somatória", accessorKey: "somatoria" },

    ])

    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel()
    })


    const addMala = () => {

        if (nomeOperador.length === 0) {
            alert("Nome do operador e obrigatorio")


        } else {
            const valorAtual = somatoria
            const novaSomatoria = somatoria + 150




            setLista(prev => [
                ...prev,
                {
                    data: dataCompleta,
                    nome: nomeOperador,
                    sequencia: sequencia,
                    horario: horaCompleta,
                    somatoria: valorAtual,
                }
            ]);

            setSequencia(sequencia + 1)
            setSomatoria(novaSomatoria)

            if (novaSomatoria > ordem.ordemAtual.valor) {
                setBtnDesativado(true)
                return;
            }

        }
    }

    const finilizar = () => {


        SetOrdem(prev => {
            const novasOrdens = prev.ordensDoMes.filter(newOrdem => newOrdem.id !== prev.ordemAtual.id)
            const proxima = novasOrdens[0] || null

            return {
                ordensDoMes: novasOrdens,
                ordemAtual: proxima
            }


        })


        const proximaOrdem = ordem.ordensDoMes[0]
        if (!proximaOrdem) {
            alert("Nao a mas ordem para esse mes")
            return
        }

        setSomatoria(150)
        setSequencia(1)
        setLista([]);
        setBtnDesativado(false)
        alert("Nova ordem definida");
    }
    const handleInputChange = (e) => {
        setNomeOperador(e.target.value)

    }
    return (
        <>
            <Header tituloPagina={"Relatorio de Producao"} />
            <section className="relatorio">
                <label htmlFor="opResponsavel">Nome do operador responsavel</label>
                <input
                    onChange={handleInputChange}
                    type="text"
                    value={nomeOperador}
                    className="NomeDoOperador"
                    id="opResponsavel"
                />
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}
                                        style={{
                                            border: "1px solid #1e3a8a",
                                            padding: "8px",
                                            background: "#e0e7ff",
                                            color: "#1e3a8a",
                                            textAlign: "center",
                                        }}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                    </th>
                                ))}
                            </tr>

                        ))}

                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}  >
                                {row.getVisibleCells().map((cell) => (


                                    <td key={cell.id} style={{
                                        border: "1px solid #1e3a8a",
                                        padding: "8px",
                                        background: "#ebedf5",
                                        color: "#0130b1",
                                        textAlign: "center",
                                    }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>



                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="btns">


                    <button onClick={addMala} className="btn-adicionar" disabled={btnDesativado}>Adicionar</button>
                    <button onClick={finilizar}>Finalizar</button>

                </div>
            </section>
        </>
    )

}

export default Relatorio








