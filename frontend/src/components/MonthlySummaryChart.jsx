// src/components/MonthlySummaryChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlySummaryChart = ({ expenses }) => {
    // Aggregate expenses by month
    const monthlyTotals = expenses.reduce((totals, expense) => {
        const month = dayjs(expense.date).format('YYYY-MM');
        if (!totals[month]) {
            totals[month] = 0;
        }
        totals[month] += expense.amount;
        return totals;
    }, {});

    // Prepare data for the chart
    const data = {
        labels: Object.keys(monthlyTotals),
        datasets: [
            {
                label: 'Monthly Expenses',
                data: Object.values(monthlyTotals),
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                align: 'center',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: '60%', marginTop: '20px', textAlign: 'center' }}>
            <h3>Monthly Summary</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default MonthlySummaryChart;
