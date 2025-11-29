import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "./styled.css"
import Header from "../../componentes/Header";


function Relatorio() {

    let dataAtual = new Date()
    const dataCompleta = dataAtual.toLocaleDateString()
    const horaCompleta = dataAtual.toLocaleTimeString()

    const [sequencia, setSequencia] = useState(1)
    const [lote, setLote] = useState("")
    const [nomeOperador, setNomeOperador] = useState("")
    const [lista, setLista] = useState([])
    const [btnDesativado, setBtnDesativado] = useState(false)
    const [ordemAtual, setOrdemAtual] = useState("")
    const [selecionePkMult, setSelecionePkMuilt] = useState("")
    const [somatoria, setSomatoria] = useState("")
    const [habilita, setHabilita] = useState(true)
    const [historico, setHistorico] = useState([])
    const [paginaAtual, setPaginaAtual] = useState(0)
    const [visualizadoHistorico, setVisualizadoHistorico] = useState(false)

    const qtdPks = [
        { id: 1, pk: 'PK - 77', tipo: "Bar-0428", mult: 210 },
        { id: 2, pk: 'PK - 75', tipo: "Bar-0428", mult: 112 },
        { id: 3, pk: 'PK - 81', tipo: "Bar-5219", mult: 108 },
        { id: 4, pk: 'PK - 75', tipo: "Bar-5230", mult: 108 },
    ]

    const data = useMemo(() => {
        if (visualizadoHistorico) {
            return historico[paginaAtual] || []
        }
        return lista;
    }, [lista, historico, paginaAtual, visualizadoHistorico])



    const columns = useMemo(() => [
        { header: "Data", accessorKey: "data" },
        { header: "Nome", accessorKey: "nome" },
        { header: "Sequência de Malas", accessorKey: "sequencia" },
        { header: "Saída ", accessorKey: "horario" },
        { header: "Somatória", accessorKey: "somatoria" },
        { header: "Ordem", accessorKey: "Ordem" },
        { header: "PK", accessorKey: "PK" },

    ])

    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel()
    })

    const addMala = () => {

        if (nomeOperador.length === 0 || selecionePkMult.length === 0 || lote.length === 0 || ordemAtual.length === 0) {
            alert("Nome do operador e obrigatorio")

        } else {
            const valorAtual = somatoria
            const novaSomatoria = somatoria + Number(selecionePkMult)

            setLista(prev => [
                ...prev,
                {
                    data: dataCompleta,
                    nome: nomeOperador,
                    sequencia: sequencia,
                    horario: horaCompleta,
                    somatoria: valorAtual,
                    Ordem: ordemAtual,
                    PK: selecionePkMult,
                }
            ]);

            setSequencia(sequencia + 1)
            setSomatoria(novaSomatoria)

            if (novaSomatoria > lote) {
                setBtnDesativado(true)
                return;
            }
            enviarDados()
        }
    }

    const enviarDados = async () => {
        const dados = {

            data: dataCompleta,
            nome: nomeOperador,
            sequencia: sequencia,
            horario: horaCompleta,
            somatoria,
            Ordem: ordemAtual,
            PK: selecionePkMult,

        }


        const res = await fetch("http://localhost:3001/salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!res.ok) {
            console.log("Erro:", await res.text());
            return;
        }

        const json = await res.json();
        console.log(json);
    }


    const finilizar = () => {

        setHistorico(prev => [...prev, lista])
        setVisualizadoHistorico(false)
        setSomatoria(0)
        setOrdemAtual(0)
        setNomeOperador("")
        setLote(0)
        setSequencia(1)
        setLista([]);
        setBtnDesativado(false)
        setSelecionePkMuilt('')

        alert("Ordem finalizada e salva no historico");
    }

    const handleAdicionaLote = (e) => {
        setLote(e.target.value)

    }
    const handleInputChange = (e) => {
        setNomeOperador(e.target.value)

    }
    const handleOrdem = (e) => {
        setOrdemAtual(e.target.value)
    }
    const setarPK = (pksEscolhindo) => {

        setSelecionePkMuilt(pksEscolhindo)
        setSomatoria(Number(pksEscolhindo))



    }

    const excluirEsse = (index) => {

        const novaLista = lista.filter((_, item) => item !== index)
        const sequenciaNova = novaLista.map((item, i) => ({ ...item, sequencia: i + 1 }))

        let acumulado = Number(selecionePkMult)
        const somaRecalculada = sequenciaNova.map((item) => {
            acumulado += Number(item.PK)
            return {
                ...item,
                somatoria: acumulado - Number(item.PK)
            }

        })

        if (acumulado < lote) {
            setBtnDesativado(false)
        }

        setSequencia(somaRecalculada.length + 1)
        setLista(somaRecalculada)
        setSomatoria(acumulado)
    }

    const editarItem = () => {
        setHabilita(false)

    }
    const salvarEdicao = () => {
        setHabilita(true)

    }

    const anterior = () => {
        if (paginaAtual > 0) {
            setVisualizadoHistorico(true);
            setPaginaAtual(paginaAtual - 1);
        }
    };

    const proximo = () => {
        if (paginaAtual < historico.length - 1) {
            setVisualizadoHistorico(true);
            setPaginaAtual(paginaAtual + 1);
        } else {
            setVisualizadoHistorico(false);
        }
    };



    return (
        <>
            <section className="relatorio">
                <Header tituloPagina={"Relatorio de Producao"} />

                <div className="container">
                    <label htmlFor="opResponsavel">operador responsavel:</label>
                    <input
                        onChange={handleInputChange}
                        type="text"
                        value={nomeOperador}
                        className="NomeDoOperador"
                        id="opResponsavel"

                    />



                    <label htmlFor="pk">PK:</label>
                    <select name="pk" id="pk" onChange={(pksEscolhindo) => setarPK(pksEscolhindo.target.value)}>
                        <optgroup>
                            <option value="">Selecione o PK</option>
                            {qtdPks.map((pks, index) => (<option key={index} value={pks.mult}>{pks.pk} </option>))}
                        </optgroup>
                    </select>
                    <label htmlFor="malas" >Multiplus de mala: </label>
                    <select disabled id="malas">
                        <optgroup >
                            <option >{selecionePkMult}</option>
                        </optgroup>
                    </select>

                    <label htmlFor="lote-mes">Lote:</label>
                    <input
                        onChange={handleAdicionaLote}
                        type="number"
                        value={lote}
                        className="lote-mes"
                        id="lote-mes"

                    />
                    <label htmlFor="ordem">Ordem:</label>
                    <input
                        type="text"
                        onChange={handleOrdem}
                        value={ordemAtual}
                        className="NomeDoOperador"
                        id="ordem"
                        minLength={0}
                        maxLength={4}
                    />

                    <div className="loteOrdem">
                        <h3>Lote Atual:<strong>{lote} </strong></h3>
                        <h3>Ordem Atual :<strong>{ordemAtual}</strong></h3>
                    </div>

                </div>
                <div className="barraDeRolagem">
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
                                    <td hidden={habilita}>

                                        <button onClick={() => excluirEsse(row.index)} >Excluir</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="btns">
                    <button onClick={anterior}>anterior</button>
                    <button onClick={addMala} className="btn-adicionar" disabled={btnDesativado}>Adicionar</button>
                    <button onClick={editarItem} >Editar</button>
                    <button onClick={salvarEdicao} hidden={habilita}>Salvar</button>
                    <button onClick={finilizar} disabled={!btnDesativado}>Finalizar</button>
                    <button onClick={proximo}>Proximo</button>
                </div>
            </section>
        </>
    )

}

export default Relatorio








