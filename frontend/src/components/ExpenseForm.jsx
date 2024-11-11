// src/components/ExpenseForm.jsx
import React from 'react';
import { Box, Grid, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const ExpenseForm = ({ description, amount, date, category, setDescription, setAmount, setDate, setCategory, onAdd }) => {
    const handleDateChange = (e) => {
        const value = e.target.value;

        // Regex to match YYYY-MM-DD and restrict year to 4 digits
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(value)) {
            setDate(value); 
        } else {
            // If the year exceeds 4 digits, it gets  limited
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
                    <TextField
                        label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: <span>¥</span>
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
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
