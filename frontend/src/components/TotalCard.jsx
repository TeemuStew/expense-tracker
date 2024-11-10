// src/components/TotalCard.jsx
import React from 'react';
import { Card, Typography } from '@mui/material';

const TotalCard = ({ expenses }) => (
    <Card sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: 2,
        marginY: 2,
        borderRadius: 2,
    }}>
        <Typography variant="h6"sx={{ textAlign: 'center' }}>Total:</Typography>
        <Typography variant="h3"sx={{ textAlign: 'center' }}>{expenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2)} ¥</Typography>
    </Card>
);

export default TotalCard;
