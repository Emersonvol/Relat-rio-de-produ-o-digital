import Header from "../../componentes/Header";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  useState } from "react";

export default function Historico() {
    const [criaTabela, setCriaTabela] = useState([])
    
    try {
        const dados = async () => {
            const tabela = await fetch("http://localhost:3001/dadosObservacao")
            const dadosTable = await tabela.json()
            setCriaTabela(dadosTable)
        }
        dados()
    } catch (error) {
            console.log(error)
    }
          

    return (
        <section>
            <Header tituloPagina={"Historico de observações"} />
           

            <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Data</TableCell>
                            <TableCell align="right">Nome</TableCell>
                            <TableCell align="right">Sequência</TableCell>
                            <TableCell align="right">horario de saida</TableCell>
                            <TableCell align="right">Ordem</TableCell>
                            <TableCell align="right">Pk</TableCell>
                            <TableCell align="right">Operador iniciou</TableCell>
                            <TableCell align="right">Operador finalizou</TableCell>
                            <TableCell align="right">observação</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {criaTabela.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" align="right" scope="row">{row.data}</TableCell>
                                <TableCell align="right" scope="row">{row.nome}</TableCell>
                                <TableCell align="right">{row.sequencia}</TableCell>
                                <TableCell align="right">{row.horario}</TableCell>
                                <TableCell align="right">{row.Ordem}</TableCell>
                                <TableCell align="right">{row.PK}</TableCell>
                                <TableCell align="right">{row.operadorInicial}</TableCell>
                                <TableCell align="right">{row.operadorFinal}</TableCell>
                                <TableCell align="right">{row.obs}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )


}
