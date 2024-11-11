// src/components/EditExpenseDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const EditExpenseDialog = ({
    open,
    onClose,
    onSave,
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    category,
    setCategory
}) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="dense"
                variant="outlined"
            />
            <TextField
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                fullWidth
                margin="dense"
                variant="outlined"
                InputProps={{
                    startAdornment: <span>¥</span>
                }}
            />
            <TextField
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
            />
            <FormControl fullWidth margin="dense" variant="outlined">
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
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button onClick={onSave} color="primary">Save</Button>
        </DialogActions>
    </Dialog>
);

export default EditExpenseDialog;
