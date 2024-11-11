// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, CssBaseline, Box, Container, Avatar, Typography } from '@mui/material';
import theme from './themes/theme';
import Sidebar from './components/Sidebar';
import ExpenseForm from './components/ExpenseForm';
import CategoryChart from './components/CategoryChart';
import MonthlySummaryChart from './components/MonthlySummaryChart';
import EditExpenseDialog from './components/EditExpenseDialog';
import NotificationSnackbar from './components/NotificationSnackbar'; // Import the new component

function App() {
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
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await axios.get('http://localhost:4000/api/expenses');
        setExpenses(response.data.data);
    };

    const addExpense = async () => {
        // Validate form inputs
        if (!description) {
            showError("Expense couldn't be added because description is missing.");
            return;
        }
        if (!amount) {
            showError("Expense couldn't be added because amount is missing.");
            return;
        }
        if (!date) {
            showError("Expense couldn't be added because date is missing.");
            return;
        }
        if (!category) {
            showError("Expense couldn't be added because category is missing.");
            return;
        }

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
            showError("Failed to save expense due to a server error.");
        }
    };

    const editExpense = (expense) => {
        setDescription(expense.description);
        setAmount(expense.amount);
        setDate(expense.date);
        setCategory(expense.category);
        setEditId(expense.id);
        setOpen(true); // Open the dialog for editing
    };

    const resetForm = () => {
        setDescription('');
        setAmount('');
        setDate('');
        setCategory('');
    };

    const deleteExpense = async (id) => {
        await axios.delete(`http://localhost:4000/api/expenses/${id}`);
        fetchExpenses();
    };

    const handleClose = () => {
        resetForm();
        setEditId(null);
        setOpen(false); // Close the dialog
    };

    // Snackbar control functions
    const showSuccess = (message) => {
        setSnackbarMessage(message);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
    };

    const showError = (message) => {
        setSnackbarMessage(message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
    };

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
