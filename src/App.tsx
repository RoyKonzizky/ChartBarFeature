import {
    BarElement,
    CategoryScale,
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

    interface Tooltip {
        _active?: {
            element: {
                x: number;
            };
        }[];
    }

    interface Scales {
        y: {
            top: number;
            bottom: number;
        };
    }

    interface ChartContext {
        tooltip?: Tooltip;
        scales?: Scales;
        ctx?: CanvasRenderingContext2D | null;
    }

    interface Plugin {
        id: string;
        afterDraw: (chart: ChartContext) => void;
    }

    const plugins: Plugin[] = [
        {
            id: "id",
            afterDraw: (chart: ChartContext) => {
                if (chart.tooltip?._active && chart.tooltip._active.length > 0) {
                    // Ensure _active is present and has a length
                    const activePoint = chart.tooltip._active[0];
                    const { ctx, scales } = chart;

                    if (activePoint && ctx && scales?.y) {
                        const { x } = activePoint.element;
                        const topY = scales.y.top;
                        const bottomY = scales.y.bottom;

                        // Draw vertical line
                        const ctxNotNull = ctx as CanvasRenderingContext2D; // Asserting ctx is not null
                        ctxNotNull.save();
                        ctxNotNull.beginPath();
                        ctxNotNull.moveTo(x, topY);
                        ctxNotNull.lineTo(x, bottomY);
                        ctxNotNull.lineWidth = 1;
                        ctxNotNull.strokeStyle = 'rgba(255,255,255,0.5)';
                        ctxNotNull.stroke();
                        ctxNotNull.restore();
                    }
                }
            },
        },
    ];

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