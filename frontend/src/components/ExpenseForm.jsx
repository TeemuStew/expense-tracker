// src/components/ExpenseForm.jsx
import React, { useState } from 'react';
import { Box, Grid, TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

const ExpenseForm = ({ description, amount, date, category, setDescription, setAmount, setDate, setCategory, onAdd }) => {
    const [amountLimitReached, setAmountLimitReached] = useState(false);
    const [descriptionLimitReached, setDescriptionLimitReached] = useState(false);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10) {
            setAmount(value);
            setAmountLimitReached(value.length === 10); // Show message when limit is reached
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 15) {
            setDescription(value);
            setDescriptionLimitReached(value.length === 15); // Show message when limit is reached
        }
    };

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
                <Grid item xs={12} sm={3}>
                    <Box position="relative">
                        {amountLimitReached && (
                            <Typography 
                                color="error" 
                                variant="caption" 
                                sx={{ position: 'absolute', top: -23, left: 10 }} // Positioning message above input
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
                                maxLength: 10, // Limit amount to 10 characters
                            }}
                        />
                    </Box>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                    <Box position="relative">
                        {descriptionLimitReached && (
                            <Typography 
                                color="error" 
                                variant="caption" 
                                sx={{ position: 'absolute', top: -23, left: 10 }} // Positioning message above input
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
                                maxLength: 15, // Limit description to 15 characters
                            }}
                        />
                    </Box>
                </Grid>
                
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
                
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Category"
                        >
                            <MenuItem value="food">Food/Beverage</MenuItem>
                            <MenuItem value="travel">Travel/Commute</MenuItem>
                            <MenuItem value="shopping">Shopping</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                
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

export default ExpenseForm;
