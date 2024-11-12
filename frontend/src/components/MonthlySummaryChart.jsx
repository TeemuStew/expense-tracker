// src/components/MonthlySummaryChart.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * MonthlySummaryChart Component
 * 
 * Displays a bar chart summarizing total expenses for each month. 
 * Aggregates expenses by month and uses Chart.js to visualize the data.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.expenses - List of expense objects with date and amount properties
 * 
 * @returns {JSX.Element} The rendered MonthlySummaryChart component
 */
const MonthlySummaryChart = ({ expenses }) => {

    /**
     * Aggregates the total amount spent in each month.
     * 
     * @returns {Object} An object with months as keys (formatted as 'YYYY-MM') and total amounts as values
     */
    const getMonthlyTotals = () => {
        return expenses.reduce((totals, expense) => {
            const month = dayjs(expense.date).format('YYYY-MM');
            totals[month] = (totals[month] || 0) + expense.amount;
            return totals;
        }, {});
    };

    const monthlyTotals = getMonthlyTotals();

    // Chart data configuration
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

    // Chart options configuration
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Expenses Summary',
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
                title: {
                    display: true,
                    text: 'Expense Amount',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
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

// Prop types to validate expected data types
MonthlySummaryChart.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default MonthlySummaryChart;
