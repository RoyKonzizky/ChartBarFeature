import {
    BarElement,
    CategoryScale, Chart,
    Chart as ChartJS, ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip, TooltipItem,
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

    const diffFinder = (tooltipItems:TooltipItem<'line'>[]) => {
        let difference = 0;
        if (tooltipItems.length > 1) {
            if (tooltipItems[0].parsed.y > tooltipItems[1].parsed.y) {
                difference = tooltipItems[0].parsed.y - tooltipItems[1].parsed.y;
            } else {
                difference = tooltipItems[1].parsed.y - tooltipItems[0].parsed.y;
            }
        }

        return 'Difference: ' + difference;
    };

    const plugins = [{
        id: "lineToolTip",
        afterDraw: (chart:Chart) => {
            if (chart.tooltip && chart.tooltip.opacity === 1) {
                const { ctx } = chart;
                const tooltipItems = chart.tooltip.dataPoints as TooltipItem<'line'>[];

                if (tooltipItems && tooltipItems.length >= 2) {
                    const startX = tooltipItems[0].element.x;
                    const startY = tooltipItems[0].element.y;
                    const endX = tooltipItems[1].element.x;
                    const endY = tooltipItems[1].element.y;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }];


    const options: ChartOptions<'line'> = {
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
                intersect: false,
                callbacks: {
                    footer: diffFinder,
                },
                mode: 'index',
                position: 'nearest',
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