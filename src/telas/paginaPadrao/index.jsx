import BarsDataset from "../../componentes/graficosMui";
import Header from "../../componentes/Header";
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

import "./styled.css"
const uData = [40, 30, 20, 27, 18, 23, 34];
const xLabels = [
  'Carol',
  'Grase',
  'Andresa',
  'Vanda',
 
];

function PaginaPadrao() {
  return (
    <>
      <Header />

      <section className="paginaPadrao">
        <BarsDataset />

        <div className="div-paginaPadrao">
          <h2>Relatorio de produção </h2>
          <img src="./logo-sem-fundo.png" />
          <h3>SKF</h3>
        </div>
        <Box sx={{ width: '50%', height: 700 }}>
          <BarChart
            series={[
              {
                data: uData,
                label: 'Saida diaria',
                id: 'uvId',
                yAxisId: 'rightAxisId',
              },
            ]}
            xAxis={[{ data: xLabels }]}
            yAxis={[
              { id: 'leftAxisId', width: 50 },
              { id: 'rightAxisId', position: 'right' },
            ]}
          />
        </Box>
      </section>
    </>
  )


}

export default PaginaPadrao;