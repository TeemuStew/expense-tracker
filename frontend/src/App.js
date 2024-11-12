// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ThemeProvider,
    CssBaseline,
    Box,
    Container,
    Avatar,
    Typography
} from '@mui/material';
import theme from './themes/theme';
import Sidebar from './components/Sidebar';
import ExpenseForm from './components/ExpenseForm';
import CategoryChart from './components/CategoryChart';
import MonthlySummaryChart from './components/MonthlySummaryChart';
import EditExpenseDialog from './components/EditExpenseDialog';
import NotificationSnackbar from './components/NotificationSnackbar';

/**
 * App Component
 * 
 * Main component that handles expense management, including fetching expenses, adding, editing,
 * and deleting them. It displays a sidebar with filters, a form to add expenses, 
 * and summary charts.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component
 */
function App() {

    // Expense data and form states
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [editId, setEditId] = useState(null);
    const [open, setOpen] = useState(false);

    // Snackbar state for showing messages
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Load expenses on initial render
    useEffect(() => {
        fetchExpenses();
    }, []);

    /**
     * Fetches expenses from the API and updates the state.
     */
    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/expenses');
            setExpenses(response.data.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            showError("Failed to load expenses.");
        }
    };

    /**
     * Adds or updates an expense.
     * 
     * Validates inputs, then adds a new expense or updates an existing one, 
     * depending on whether an editId is set.
     */
    const addExpense = async () => {
        if (!validateForm()) return;

        try {
            if (editId) {
                await axios.put(`http://localhost:4000/api/expenses/${editId}`, {
                    description,
                    amount: parseFloat(amount),
                    date,
                    category
                });
                showSuccess("Expense updated successfully!");
            } else {
                await axios.post('http://localhost:4000/api/expenses', {
                    description,
                    amount: parseFloat(amount),
                    date,
                    category
                });
                showSuccess("Expense added successfully!");
            }
            resetForm();
            fetchExpenses();
            setEditId(null);
        } catch (error) {
            console.error("Error saving expense:", error);
            showError("Failed to save expense.");
        }
    };

    /**
     * Prepares the form for editing an expense.
     * 
     * @param {Object} expense - The expense to edit
     */
    const editExpense = (expense) => {
        setDescription(expense.description);
        setAmount(expense.amount);
        setDate(expense.date);
        setCategory(expense.category);
        setEditId(expense.id);
        setOpen(true);
    };

    /**
     * Deletes an expense by ID and refreshes the list.
     * 
     * @param {number} id - The ID of the expense to delete
     */
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/expenses/${id}`);
            fetchExpenses();
            showSuccess("Expense deleted successfully!");
        } catch (error) {
            console.error("Error deleting expense:", error);
            showError("Failed to delete expense.");
        }
    };

    /**
     * Validates the form fields.
     * 
     * @returns {boolean} True if all fields are valid, otherwise false
     */
    const validateForm = () => {
        if (!description) {
            showError("Expense couldn't be added because description is missing.");
            return false;
        }
        if (!amount) {
            showError("Expense couldn't be added because amount is missing.");
            return false;
        }
        if (!date) {
            showError("Expense couldn't be added because date is missing.");
            return false;
        }
        if (!category) {
            showError("Expense couldn't be added because category is missing.");
            return false;
        }
        return true;
    };

    /**
     * Resets the form fields.
     */
    const resetForm = () => {
        setDescription('');
        setAmount('');
        setDate('');
        setCategory('');
    };

    /**
     * Handles closing the edit dialog.
     */
    const handleClose = () => {
        resetForm();
        setEditId(null);
        setOpen(false);
    };

    /**
     * Displays a success snackbar message.
     * 
     * @param {string} message - The success message to show
     */
    const showSuccess = (message) => {
        setSnackbarMessage(message);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
    };

    /**
     * Displays an error snackbar message.
     * 
     * @param {string} message - The error message to show
     */
    const showError = (message) => {
        setSnackbarMessage(message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
    };

    /**
     * Handles closing the snackbar.
     */
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eaeff1' }}>
                <Sidebar expenses={expenses} onEdit={editExpense} onDelete={deleteExpense} />
                <Container maxWidth="md" sx={{ marginTop: 4, padding: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
                    <Box display="flex" alignItems="center" marginBottom={3}>
                        <Avatar sx={{ width: 64, height: 64, marginRight: 2 }} src="/path/to/profile.jpg" />
                        <Typography variant="h6">Taro Yamada</Typography>
                    </Box>
                    <ExpenseForm
                        description={description}
                        amount={amount}
                        date={date}
                        category={category}
                        setDescription={setDescription}
                        setAmount={setAmount}
                        setDate={setDate}
                        setCategory={setCategory}
                        onAdd={addExpense}
                    />
                    <Box display="flex" gap={4} mt={3}>
                        <CategoryChart expenses={expenses} />
                        <MonthlySummaryChart expenses={expenses} />
                    </Box>
                </Container>
            </Box>

            {/* Edit Expense Dialog */}
            <EditExpenseDialog
                open={open}
                onClose={handleClose}
                onSave={() => {
                    addExpense();
                    setOpen(false);
                }}
                description={description}
                setDescription={setDescription}
                amount={amount}
                setAmount={setAmount}
                date={date}
                setDate={setDate}
                category={category}
                setCategory={setCategory}
            />

            {/* NotificationSnackbar Component */}
            <NotificationSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </ThemeProvider>
    );
}

export default App;
