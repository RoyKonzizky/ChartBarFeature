import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
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

    const dataLabels1 = labels.map(() => faker.number.int({ min: -1000, max: 1000 }));
    const dataLabels2 = labels.map(() => faker.number.int ({ min: -1000, max: 1000 }));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const diffFinder = (tooltipItems) => {
        let difference = 0;
        const cutBarsTooltipItems = [tooltipItems[0],tooltipItems[1]];
        if (cutBarsTooltipItems.length > 1) {
            if(cutBarsTooltipItems[0].parsed.y > cutBarsTooltipItems[1].parsed.y){
                difference = cutBarsTooltipItems[0].parsed.y - cutBarsTooltipItems[1].parsed.y;
            }
            else{
                difference = cutBarsTooltipItems[1].parsed.y - cutBarsTooltipItems[0].parsed.y;
             }
        }

        return 'Difference: ' + difference;
    };

    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-expect-error
    // const barFilter = (tooltipItems) => {
    //     return [tooltipItems[0], tooltipItems[1]];
    // }

    const plugins = [
        {
            afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any }) => {
                // eslint-disable-next-line no-underscore-dangle
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    // find coordinates of tooltip
                    const activePoint = chart.tooltip._active[0];
                    const { ctx } = chart;
                    const { x } = activePoint.element;
                    const topY = chart.scales.y.top;
                    const bottomY = chart.scales.y.bottom;

                    // draw vertical line
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#1C2128';
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
                // content:{
                //     callbacks: {
                //         footer: barFilter
                //     }
                // },
                // content:{
                //     filter:"bar",
                // },
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

    // const barDatasets = labels.map((label, index) => {
    //     return {
    //         label: null,
    //         type: 'bar',
    //         data: [
    //             {
    //                 x: label,
    //                 y: [dataLabels1[index], dataLabels2[index]],
    //             },
    //         ],
    //         borderColor: 'rgb(0, 255, 0)',
    //         backgroundColor: 'rgb(0, 255, 0)',
    //         borderWidth: 0.1,
    //         barThickness: 0.1,
    //     };
    // });
    //
    // const updatedDatasets = [...data.datasets, ...barDatasets];
    //
    // const updatedData = {
    //     ...data,
    //     datasets: updatedDatasets,
    // };

    return (
        <Line style={styleChart} plugins={plugins} options={options} data={data}/>
    );
}

export default App;