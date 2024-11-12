// src/components/EditExpenseDialog.js

import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';

/**
 * EditExpenseDialog Component
 * 
 * This component renders a modal dialog for editing an expense. It includes fields
 * for description, amount, date, and category, allowing the user to modify existing
 * expense details and save changes.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls whether the dialog is open
 * @param {Function} props.onClose - Callback to close the dialog without saving
 * @param {Function} props.onSave - Callback to save the changes
 * @param {string} props.description - Current description of the expense
 * @param {Function} props.setDescription - Function to update description
 * @param {number} props.amount - Current amount of the expense
 * @param {Function} props.setAmount - Function to update amount
 * @param {string} props.date - Current date of the expense
 * @param {Function} props.setDate - Function to update date
 * @param {string} props.category - Current category of the expense
 * @param {Function} props.setCategory - Function to update category
 * 
 * @returns {JSX.Element} The rendered EditExpenseDialog component
 */

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
}) => {
    /**
     * Handles the save button click. Validates fields to ensure required information
     * is present before invoking the onSave callback.
     */
    const handleSave = () => {
        if (!description || !amount || !date || !category) {
            alert('Please fill out all fields.');
            return;
        }
        onSave();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle textAlign="center">Edit Expense</DialogTitle>
            <DialogContent>

                {/* Description Field */}
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                />
                
                {/* Amount Field */}
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
                
                {/* Date Field */}
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
                
                {/* Category Field */}
                <FormControl fullWidth margin="dense" variant="outlined">
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
            </DialogContent>
            
            {/* Action Buttons */}
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

// Prop types to enforce expected data types
EditExpenseDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    setDescription: PropTypes.func.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setAmount: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    setDate: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
};

export default EditExpenseDialog;
