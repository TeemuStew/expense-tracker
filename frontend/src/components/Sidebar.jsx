// src/components/Sidebar.jsx
import React from 'react';
import { Box, Typography, Card, Divider } from '@mui/material';
import TotalCard from './TotalCard';
import ExpenseList from './ExpenseList';

const Sidebar = ({ expenses, onDelete }) => (
    <Box sx={{
        width: '25%',
        backgroundColor: 'background.paper',
        padding: 3,
        boxShadow: 3,
    }}>
        <Typography variant="h5" gutterBottom>Hello, Taro</Typography>
        <TotalCard expenses={expenses} />
        <Typography variant="subtitle1" color="textSecondary">Breakdown</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <ExpenseList expenses={expenses} onDelete={onDelete} />
    </Box>
);

export default Sidebar;
