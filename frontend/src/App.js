// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, CssBaseline, Box, Container, Avatar, Typography } from '@mui/material';
import theme from './themes/theme';
import Sidebar from './components/Sidebar';
import ExpenseForm from './components/ExpenseForm';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await axios.get('http://localhost:4000/api/expenses');
        setExpenses(response.data.data);
    };

    const addExpense = async () => {
        if (!description || !amount || !date || !category) return;
        await axios.post('http://localhost:4000/api/expenses', {
            description,
            amount: parseFloat(amount),
            date,
            category
        });
        setDescription('');
        setAmount('');
        setDate('');
        setCategory('');
        fetchExpenses();
    };

    const deleteExpense = async (id) => {
        await axios.delete(`http://localhost:4000/api/expenses/${id}`);
        fetchExpenses();
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eaeff1' }}>
                <Sidebar expenses={expenses} onDelete={deleteExpense} />
                <Container maxWidth="md" sx={{
                    marginTop: 4,
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                }}>
                    <Box display="flex" alignItems="center" marginBottom={3}>
                        <Avatar sx={{ width: 64, height: 64, marginRight: 2 }} src="/path/to/profile.jpg" />
                        <Typography variant="h6">User Name</Typography>
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
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
