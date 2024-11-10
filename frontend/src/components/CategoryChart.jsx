// src/components/CategoryChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ expenses }) => {
    // Aggregate expenses by category
    const categoryTotals = expenses.reduce((totals, expense) => {
        const { category, amount } = expense;
        if (!totals[category]) {
            totals[category] = 0;
        }
        totals[category] += amount;
        return totals;
    }, {});

    // Prepare data for the chart
    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#FF6384', // Color for Food/Beverage
                    '#36A2EB', // Color for Travel/Commute
                    '#FFCE56', // Color for Shopping
                    '#4BC0C0'  // Color for Other
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ]
            }
        ]
    };

    return (
        <div style={{ width: '30%', marginTop: '20px', textAlign: 'center' }}>
            <h3>Spending by Category</h3>
            <Pie data={data} />
        </div>
    );
};

export default CategoryChart;
