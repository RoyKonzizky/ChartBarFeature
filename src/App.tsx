import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import 'chartjs-plugin-zoom';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, zoomPlugin);

const styleChart = {
    width: '90vw',
    height: '80vh',
};

export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
    plugins:{
        tooltip: {
            intersect: false,
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'x',
            }
        },
    },
};

export const data = {
    datasets: [
        {
            label: 'A dataset',
            data: Array.from({ length: 100 }, () => ({
                x: faker.number.int({ min: -100, max: 100 }),
                y: faker.number.int({ min: -100, max: 100 }),
            })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ],
};

function App() {
    return <Scatter options={options} data={data} style={styleChart} />;
}

export default App;