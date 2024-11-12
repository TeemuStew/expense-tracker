// src/components/Sidebar.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    Divider,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import TotalCard from './TotalCard';
import ExpenseList from './ExpenseList';

/**
 * Sidebar Component
 * 
 * Displays a sidebar with a total card, filter options, and an expense list. 
 * Allows the user to filter expenses by name and category.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.expenses - Array of expense objects with description, category, and amount
 * @param {Function} props.onEdit - Callback function to handle editing an expense
 * @param {Function} props.onDelete - Callback function to handle deleting an expense
 * 
 * @returns {JSX.Element} The rendered Sidebar component
 */
const Sidebar = ({ expenses, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    /**
     * Filters expenses based on the search term and selected category.
     * 
     * @returns {Array} The filtered list of expenses
     */
    const filteredExpenses = expenses.filter((expense) => {
        const matchesName = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? expense.category === selectedCategory : true;
        return matchesName && matchesCategory;
    });

    return (
        <Box
            sx={{
                width: '25%',
                backgroundColor: 'background.paper',
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                Hello, Taro
            </Typography>
            <TotalCard expenses={expenses} />
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }} color="textSecondary">
                Breakdown
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {/* Search Bar */}
            <TextField
                label="Search by Name"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Category Filter */}
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel>Filter by Category</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Filter by Category"
                >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="travel">Travel</MenuItem>
                    <MenuItem value="shopping">Shopping</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>

            {/* Filtered Expense List */}
            <ExpenseList expenses={filteredExpenses} onEdit={onEdit} onDelete={onDelete} />
        </Box>
    );
};

// Prop types to enforce expected data types
Sidebar.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Sidebar;
