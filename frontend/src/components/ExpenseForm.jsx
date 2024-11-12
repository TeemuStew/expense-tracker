// src/components/ExpenseForm.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Grid,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography
} from '@mui/material';

/**
 * ExpenseForm Component
 * 
 * Renders a form to add an expense, including fields for description, amount, date,
 * and category. It validates input lengths and displays error messages when limits are reached.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.description - Current description of the expense
 * @param {Function} props.setDescription - Function to update description
 * @param {string | number} props.amount - Current amount of the expense
 * @param {Function} props.setAmount - Function to update amount
 * @param {string} props.date - Current date of the expense
 * @param {Function} props.setDate - Function to update date
 * @param {string} props.category - Current category of the expense
 * @param {Function} props.setCategory - Function to update category
 * @param {Function} props.onAdd - Callback to handle adding a new expense
 * 
 * @returns {JSX.Element} The rendered ExpenseForm component
 */
const ExpenseForm = ({
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    category,
    setCategory,
    onAdd
}) => {
    const [amountLimitReached, setAmountLimitReached] = useState(false);
    const [descriptionLimitReached, setDescriptionLimitReached] = useState(false);

    /**
     * Handles changes to the amount input field, updating the state and enforcing a character limit.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event for the amount input
     */
    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10) {
            setAmount(value);
            setAmountLimitReached(value.length === 10);
        }
    };

    /**
     * Handles changes to the description input field, updating the state and enforcing a character limit.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event for the description input
     */
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 15) {
            setDescription(value);
            setDescriptionLimitReached(value.length === 15);
        }
    };

    /**
     * Handles changes to the date input field, ensuring the date is in correct format.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event for the date input
     */
    const handleDateChange = (e) => {
        const value = e.target.value;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(value)) {
            setDate(value);
        } else {
            const parts = value.split("-");
            if (parts[0].length > 4) {
                parts[0] = parts[0].slice(0, 4);
                setDate(parts.join("-"));
            }
        }
    };

    return (
        <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: 3 }}>
            <Grid container spacing={2}>
                
                {/* Amount Field */}
                <Grid item xs={12} sm={3}>
                    <Box position="relative">
                        {amountLimitReached && (
                            <Typography 
                                color="error" 
                                variant="caption" 
                                sx={{ position: 'absolute', top: -23, left: 10 }}
                            >
                                Limit reached: 10 characters max
                            </Typography>
                        )}
                        <TextField
                            label="Amount"
                            value={amount}
                            onChange={handleAmountChange}
                            type="number"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: <span>¥</span>,
                            }}
                            inputProps={{
                                maxLength: 10,
                            }}
                        />
                    </Box>
                </Grid>

                {/* Description Field */}
                <Grid item xs={12} sm={3}>
                    <Box position="relative">
                        {descriptionLimitReached && (
                            <Typography 
                                color="error" 
                                variant="caption" 
                                sx={{ position: 'absolute', top: -23, left: 10 }}
                            >
                                Limit reached: 15 characters max
                            </Typography>
                        )}
                        <TextField
                            label="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                maxLength: 15,
                            }}
                        />
                    </Box>
                </Grid>

                {/* Date Field */}
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Date"
                        value={date}
                        onChange={handleDateChange} 
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                    />
                </Grid>

                {/* Category Field */}
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Category"
                        >
                            <MenuItem value="food">Food</MenuItem>
                            <MenuItem value="travel">Travel</MenuItem>
                            <MenuItem value="shopping">Shopping</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onAdd}
                        fullWidth
                        sx={{ paddingY: 1.5, fontWeight: 'bold', boxShadow: 2 }}
                    >
                        Add to Expense
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

// Prop types to enforce expected data types
ExpenseForm.propTypes = {
    description: PropTypes.string.isRequired,
    setDescription: PropTypes.func.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setAmount: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    setDate: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default ExpenseForm;
