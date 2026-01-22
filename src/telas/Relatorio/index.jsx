import { useEffect, useMemo, useRef, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "./styled.css";
import Header from "../../componentes/Header";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Relatorio() {
    let dataAtual = new Date()
    const dataCompleta = dataAtual.toLocaleDateString();
    const horaCompleta = dataAtual.toLocaleTimeString();

    const [sequencia, setSequencia] = useState(1);
    const [lote, setLote] = useState("");
    const [nomeOperador, setNomeOperador] = useState("");
    const [lista, setLista] = useState(() => {
        const storage = localStorage.getItem("lista");
        return storage ? JSON.parse(storage) : [];
    });
    const [btnDesativado, setBtnDesativado] = useState(false);
    const [ordemAtual, setOrdemAtual] = useState("");
    const [selecionePkMult, setSelecionePkMuilt] = useState("");
    const [selecionaTipo, setSelecionaTipo] = useState([]);
    const [somatoria, setSomatoria] = useState(0);
    const [habilita, setHabilita] = useState(true);
    const [historico, setHistorico] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [visualizadoHistorico, setVisualizadoHistorico] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mostraAlert, setMostraAlert] = useState(false);
    const [fraseAlert, setFraseAlert] = useState("");
    const [observacao, setObservacao] = useState("");
    const [operadorFinal, setOperadorFinal] = useState("");
    const [operadorInicial, setOperadorInicial] = useState("");
    const [turno, setTurno] = useState(1)
    const [listaServidor, setListaServidor] = useState([])


    const qtdPks = [
        { id: 1, pk: 'PK - 77', tipo: "Bar-0428A", mult: 210 },
        { id: 2, pk: 'PK - 75', tipo: "Bar-0428B", mult: 112 },
        { id: 3, pk: 'PK - 81', tipo: "Bar-5219", mult: 108 },
        { id: 4, pk: 'PK - 81', tipo: "Bar-5230", mult: 108 },
    ]


    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista))
    }, [lista])

    useEffect(() => {

        const intervalo = setInterval(() => {
            const zeraData = new Date()
            if (zeraData.getHours() === 6 && zeraData.getMinutes() === 0 && zeraData.getSeconds() === 0) {
                setShowModal(true);
                viradaTurno()
                setTurno(1)
            }
            if (zeraData.getHours() === 9 && zeraData.getMinutes() === 28 && zeraData.getSeconds() === 0) {
                setShowModal(true);
                viradaTurno()
                setTurno(2)

            }
        }, 1000)
        return () => clearInterval(intervalo);
    }, []);

    const data = useMemo(() => {
        if (visualizadoHistorico) {
            const pagina = historico[paginaAtual];
            return Array.isArray(pagina) ? pagina : [];
        }

        return Array.isArray(lista) ? lista : [];
    }, [lista, historico, paginaAtual, visualizadoHistorico]);


    const columns = useMemo(() => [
        { header: "Data", accessorKey: "data" },
        { header: "Nome", accessorKey: "nome" },
        { header: "Sequência", accessorKey: "sequencia" },
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

        if (nomeOperador.length === 0 || selecionePkMult === 0 || lote.length === 0 || ordemAtual.length === 0) {
            AbriShow()
            setFraseAlert("Preencha todos os campos antes de continuar ")

        } else {

            const valorAtual = Number(somatoria)
            const novaSomatoria = valorAtual + Number(selecionaTipo[1])



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
            setObservacao('')

            if (novaSomatoria > Number(lote)) {
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
            obs: observacao,
            lote,
            qtdPks

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

    const salvarEdicao = async () => {
        const observacoes = {
            data: dataCompleta,
            nome: nomeOperador,
            sequencia: sequencia,
            horario: horaCompleta,
            Ordem: ordemAtual,
            PK: selecionePkMult,
            obs: observacao,
            operadorInicial,
            operadorFinal,
        }

        try {
            const res = await fetch("http://localhost:3001/observacoes", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(observacoes)

            })
            await res.json();

        } catch (error) {
            console.log(error)
        }

        setHabilita(true)
        obser()


    }

    const viradaTurno = () => {

        setLista([]);
        setNomeOperador("")
    }

    const finilizar = () => {
        setHistorico(prev => [...prev, lista])
        setVisualizadoHistorico(false)
        setSomatoria(Number(somatoria))
        setOrdemAtual("")
        setNomeOperador("")
        setLote("")
        setSequencia(1)
        setLista([]);
        setBtnDesativado(false)
        AbriShow()
        setFraseAlert("Ordem finalizada e salva no historico")
    }

    const handleAdicionaLote = (e) => setLote(e.target.value)
    const handleInputChange = (e) => setNomeOperador(e.target.value)
    const handleOrdem = (e) => setOrdemAtual(e.target.value)
    const editarItem = () => setHabilita(false)
    const obser = (obsText) => setObservacao(obsText)
    const AbriShow = () => setMostraAlert(true);
    const fechaAlert = () => setMostraAlert(false);
    const handleClose = () => setShowModal(false);
    const opInicial = (inicio) => setOperadorInicial(inicio)
    const opFinal = (final) => setOperadorFinal(final)

    const setarTipo = (tipoEscolhido) => {
        const valor = JSON.parse(tipoEscolhido)
        setSelecionaTipo(valor)
        setSelecionePkMuilt(valor[0])
        setSomatoria(Number(valor[1]))

    }
    
    const excluirEsse = (index) => {

        const novaLista = lista.filter((_, item) => item !== index)
        const sequenciaNova = novaLista.map((item, i) => ({ ...item, sequencia: i + 1 }))

        let acumulado = Number(selecionaTipo[1])

        const somaRecalculada = sequenciaNova.map((item) => {
            const somatoriaAtual = acumulado
            acumulado += Number(selecionaTipo[1])

            return {
                ...item,
                somatoria: somatoriaAtual
            }
        })

        if (acumulado < lote) {
            setBtnDesativado(false)

        }
        setSequencia(somaRecalculada.length + 1)
        setLista(somaRecalculada)
        setSomatoria(acumulado)
    }

    const carregar = async () => {
        const res = await fetch("http://localhost:3001/dados");
        const lista = await res.json();



        const agrupado = lista.reduce((acumulador, item) => {
            if (!acumulador[item.Ordem]) acumulador[item.Ordem] = [];
            acumulador[item.Ordem].push(item);
            return acumulador;
        }, {});

        const tabelas = Object.values(agrupado);
        setHistorico(tabelas);



        setListaServidor(lista)

    };
    const anterior = async () => {
        if (paginaAtual >= 0) {
            setVisualizadoHistorico(true);
            setPaginaAtual(paginaAtual - 1);

        }


    };

    useEffect(() => {
        carregar();

    }, []);
    const proximo = () => {
        if (paginaAtual < historico.length - 1) {
            setVisualizadoHistorico(true);
            setPaginaAtual(paginaAtual + 1);
        } else {
            setVisualizadoHistorico(false);
        }

    };

    useEffect(() => {
        if (!listaServidor || listaServidor.length === 0) return
        carregarOrdemInacabada(listaServidor)
    })

    const carregarOrdemInacabada = (listaServidor) => {
        listaServidor.forEach((item) => {
            if (item.Ordem === ordemAtual) {
                const newSoma = item.lote - item.somatoria     
                setLote(newSoma)
                
            }
        })

    }


    return (
        <>
            <section className="relatorio" >
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


                    <label htmlFor="tipos" >tipo: </label>
                    <select name="tipos" id="tipos" onChange={(tipoEscolhido) => setarTipo(tipoEscolhido.target.value)}>
                        <optgroup label="Tipos" >
                            <option >Selecione o tipo</option>
                            {qtdPks.map((tipos, index) => (<option key={index} value={JSON.stringify([[tipos.pk], [tipos.mult]])}>{tipos.tipo}</option>))}
                        </optgroup>
                    </select>

                    <label htmlFor="pk">PK:</label>
                    <select disabled name="pk" id="pk" value={selecionaTipo[0]}>
                        <optgroup >

                            <option value={selecionaTipo[0]}>
                                {selecionaTipo[0]}
                            </option>
                        </optgroup>
                    </select>
                    <label htmlFor="malas" >Multiplus de mala: </label>
                    <select disabled id="malas" value={selecionaTipo[1]} >
                        <option value={selecionaTipo[1]} >{selecionaTipo[1]} </option>
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
                        className="ordem"
                        id="ordem"
                        minLength={0}
                        maxLength={4}
                    />
                        <label htmlFor="turno">Turno:</label>
                        <input className="turno" id="turno" value={turno} disabled />
                   

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
                                            textAlign: "center"
                                        }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>

                                    ))}
                                    <td hidden={habilita}>
                                        <label htmlFor="inicio">Iniciardo por:</label>
                                        <input type="text" className="inicio" name="inicio" id="inicio" onChange={(inicio) => opInicial(inicio.target.value)} minLength={0} maxLength={15} />
                                        <label htmlFor="final">Finalizado por:</label>
                                        <input type="text" className="final" name="final" id="final" onChange={(final) => opFinal(final.target.value)} minLength={0} maxLength={15} />

                                        <label htmlFor="obs">Observação:</label>
                                        <textarea name="observacao" className="observacao" onChange={(obsText) => obser(obsText.target.value)}></textarea>
                                        <button onClick={() => excluirEsse(row.index)}>Excluir</button>

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
                    <button onClick={finilizar}>Finalizar</button>
                    <button onClick={proximo}>Proximo</button>
                </div>
                {/*<button onClick={finilizar} disabled={!btnDesativado}>Finalizar</button> */}
            </section>

            {showModal && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Troca de turno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Fim do turno!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            fecha
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            <Modal show={mostraAlert} onHide={fechaAlert}>
                <Modal.Header closeButton>
                    <Modal.Title>{fraseAlert}</Modal.Title>
                </Modal.Header>
                <Modal.Body> <Button variant="secondary" onClick={fechaAlert}>
                    Fecha
                </Button></Modal.Body>
            </Modal>

        </>
    )

}


