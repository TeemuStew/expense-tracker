import React, { useState } from 'react';
import { Box, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import TotalCard from './TotalCard';
import ExpenseList from './ExpenseList';

const Sidebar = ({ expenses, onEdit, onDelete }) => { // Include onEdit here
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredExpenses = expenses.filter(expense => {
        const matchesName = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? expense.category === selectedCategory : true;
        return matchesName && matchesCategory;
    });

    return (
        <Box sx={{ width: '25%', backgroundColor: 'background.paper', padding: 3, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>Hello, Taro</Typography>
            <TotalCard expenses={expenses} />
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }} color="textSecondary">Breakdown</Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <TextField
                label="Search by Name"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel>Filter by Category</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Filter by Category"
                >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="food">Food/Beverage</MenuItem>
                    <MenuItem value="travel">Travel/Commute</MenuItem>
                    <MenuItem value="shopping">Shopping</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
            <ExpenseList expenses={filteredExpenses} onEdit={onEdit} onDelete={onDelete} />
        </Box>
    );
};

export default Sidebar;
