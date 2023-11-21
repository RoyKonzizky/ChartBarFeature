import {
    BarElement, BubbleDataPoint,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement, Plugin,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
// import {useState} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
);

function App() {
    // const [posHoverOn, setPosHoverOn] = useState<number|null>(null);

    const styleChart = {
        width: '90vw',
        height: '80vh',
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const dataLabels1 = labels.map(() => faker.number.int({min: -1000, max: 1000}));
    const dataLabels2 = labels.map(() => faker.number.int({min: -1000, max: 1000}));

    const diffFinder = (tooltipItems) => {
        let difference = 0;
        // const cutBarsTooltipItems = [tooltipItems[0],tooltipItems[1]];
        if (tooltipItems.length > 1) {
            if (tooltipItems[0].parsed.y > tooltipItems[1].parsed.y) {
                difference = tooltipItems[0].parsed.y - tooltipItems[1].parsed.y;
            } else {
                difference = tooltipItems[1].parsed.y - tooltipItems[0].parsed.y;
            }
        }

        return 'Difference: ' + difference;
    };
    const plugins: Plugin<'line'>[] = [
        {
            id: "id",
            afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any; }) => {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    // find coordinates of tooltip
                    const activePoint = chart.tooltip._active[0];
                    const {ctx} = chart;
                    const {x} = activePoint.element;
                    const topY = chart.scales.y.top;
                    const bottomY = chart.scales.y.bottom;

                    // draw vertical line
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'rgb(0,255,0)';
                    ctx.stroke();
                    ctx.restore();
                }
            },
        },
    ];


    const options = {
        responsive: true,
        plugins: {
            legend: {
                // position: 'top' as const,
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
            tooltip: {
                position: 'nearest',
                mode: 'index',
                intersect: true,
                callbacks: {
                    footer: diffFinder,
                },
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataLabels1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: dataLabels2,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Line style={styleChart} plugins={plugins} options={options} data={data}/>
    );
}

export default App;