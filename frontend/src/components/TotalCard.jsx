// src/components/TotalCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';

/**
 * TotalCard Component
 * 
 * Displays the total sum of all expenses. It receives an array of expenses and
 * calculates the total amount, formatting it as a currency value.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.expenses - Array of expense objects, each containing an amount
 * 
 * @returns {JSX.Element} The rendered TotalCard component
 */
const TotalCard = ({ expenses }) => {
    
    // Calculate the total amount of all expenses
    const totalAmount = expenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2);

    return (
        <Card
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                padding: 2,
                marginY: 2,
                borderRadius: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h3">{totalAmount} ¥</Typography>
        </Card>
    );
};

// Prop types to enforce expected data types
TotalCard.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default TotalCard;
