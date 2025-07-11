import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

type Props = {
    labels: string[];
    dataset1: number[];
    dataset2: number[];
    dataset3: number[];
    dataset4: number[];
};

export const LineChart: React.FC<Props> = ({labels, dataset1, dataset2, dataset3, dataset4}) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels,
            datasets: [
                {
                    label: 'Min Temperature',
                    data: dataset1,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Max Temperature',
                    data: dataset2,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                },
                {
                    label: 'Open Temperature',
                    data: dataset3,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    tension: 0.4
                },
                {
                    label: 'Close Temperature',
                    data: dataset4,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--gray-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [dataset1, dataset2, dataset3, dataset4, labels]);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}