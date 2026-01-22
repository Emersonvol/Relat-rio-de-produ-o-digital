import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from './dataset';

const chartSetting = {
    yAxis: [
        {
            label: 'produção por malas',
            width: 100,
        },
    ],
    height: 700,
};

export default function BarsDataset() {
    return (
        <div className='grafico-pag'>
            <BarChart
                dataset={dataset}
                xAxis={[{ dataKey: 'month' }]}
                series={[
                    { dataKey: 'Carol', label: 'Carol', valueFormatter },
                    { dataKey: 'Grase', label: 'Grase', valueFormatter },
                    { dataKey: 'Andresa', label: 'Andresa', valueFormatter },
                    { dataKey: 'Vanda', label: 'Vanda', valueFormatter },
                ]}
                {...chartSetting}
            />
        </div>
    );
}