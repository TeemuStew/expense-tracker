// src/components/ExpenseForm.jsx
import React from 'react';
import { Box, Grid, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const ExpenseForm = ({ description, amount, date, category, setDescription, setAmount, setDate, setCategory, onAdd }) => (
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
                    onChange={(e) => setDate(e.target.value)}
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

export default ExpenseForm;
