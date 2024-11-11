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

function App() {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [editId, setEditId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await axios.get('http://localhost:4000/api/expenses');
        setExpenses(response.data.data);
    };

    const addExpense = async () => {
        if (!description || !amount || !date || !category) return;

        try {
            if (editId) {
                await axios.put(`http://localhost:4000/api/expenses/${editId}`, {
                    description,
                    amount: parseFloat(amount),
                    date,
                    category
                });
                setEditId(null);
            } else {
                await axios.post('http://localhost:4000/api/expenses', {
                    description,
                    amount: parseFloat(amount),
                    date,
                    category
                });
            }
            resetForm();
            fetchExpenses();
        } catch (error) {
            console.error("Error saving expense:", error);
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
        </ThemeProvider>
    );
}

export default App;
