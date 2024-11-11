// src/components/ExpenseList.jsx
import React, { useState, useRef } from 'react';
import { Card, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ExpenseList.css';

const categoryIcons = {
    food: { icon: <RestaurantIcon color="primary" />, label: 'Food & Beverage' },
    travel: { icon: <DirectionsCarIcon color="primary" />, label: 'Travel & Commute' },
    shopping: { icon: <ShoppingCartIcon color="primary" />, label: 'Shopping' },
    other: { icon: <LocalOfferIcon color="primary" />, label: 'Other' },
};

const ExpenseList = ({ expenses, onDelete }) => {
    // Create a ref for each expense
    const nodeRefs = useRef([]);

    return (
        <TransitionGroup>
            {expenses.map((expense, index) => {
                const { icon: categoryIcon, label: categoryLabel } = categoryIcons[expense.category] || categoryIcons.other;
                
                // Add a ref for each CSSTransition component
                if (!nodeRefs.current[index]) {
                    nodeRefs.current[index] = React.createRef();
                }

                return (
                    <CSSTransition
                        key={expense.id}
                        nodeRef={nodeRefs.current[index]} // Attach the nodeRef here
                        timeout={300}
                        classNames="expense"
                    >
                        <Card ref={nodeRefs.current[index]} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 1.5,
                            marginBottom: 1.5,
                            boxShadow: 1,
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {categoryIcon}
                                <Box sx={{ marginLeft: 2 }}>
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {expense.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1.1rem' }}>
                                        ¥ {expense.amount} • {expense.date}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {categoryLabel}
                                    </Typography>
                                </Box>
                            </Box>
                            <IconButton color="secondary" onClick={() => onDelete(expense.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Card>
                    </CSSTransition>
                );
            })}
        </TransitionGroup>
    );
};

export default ExpenseList;