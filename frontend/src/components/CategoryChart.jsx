// src/components/CategoryChart.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * CategoryChart Component
 * 
 * This component renders a pie chart that displays the total expenses by category.
 * It aggregates the expenses by category and visualizes the totals using Chart.js.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.expenses - Array of expense objects with category and amount properties
 * 
 * @returns {JSX.Element} The rendered CategoryChart component
 */

const CategoryChart = ({ expenses }) => {

    /**
     * Aggregates the total amount spent in each category.
     * @returns {Object} An object with category names as keys and total amounts as values
     */
    const getCategoryTotals = () => {
        return expenses.reduce((totals, expense) => {
            const { category, amount } = expense;
            totals[category] = (totals[category] || 0) + amount;
            return totals;
        }, {});
    };

    const categoryTotals = getCategoryTotals();

    // Chart data configuration
    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#FF6384', // Color for Food
                    '#36A2EB', // Color for Traveling
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

// Prop types to validate expected data types
CategoryChart.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default CategoryChart;
