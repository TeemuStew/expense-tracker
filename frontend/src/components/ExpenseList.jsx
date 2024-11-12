// src/components/ExpenseList.jsx

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ExpenseList.css'; 

// Map each category to an icon for easy access
const categoryIcons = {
    food: <RestaurantIcon color="primary" />,
    travel: <DirectionsCarIcon color="primary" />,
    shopping: <ShoppingCartIcon color="primary" />,
    other: <LocalOfferIcon color="primary" />
};

/**
 * ExpenseList Component
 * 
 * Displays a list of expense cards with transition animations. Each card shows
 * the expense description, amount, date, category icon, and includes edit and delete buttons.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.expenses - List of expense objects
 * @param {Function} props.onEdit - Callback function to handle editing an expense
 * @param {Function} props.onDelete - Callback function to handle deleting an expense
 * 
 * @returns {JSX.Element} The rendered ExpenseList component
 */
const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    const nodeRefs = useRef(new Map());

    return (
        <TransitionGroup>
            {expenses.map((expense) => {

                // Ensure each expense has a unique ref for transition animations
                if (!nodeRefs.current.has(expense.id)) {
                    nodeRefs.current.set(expense.id, React.createRef());
                }

                return (
                    <CSSTransition
                        key={expense.id}
                        nodeRef={nodeRefs.current.get(expense.id)}
                        timeout={300}
                        classNames="expense"
                    >
                        <Card
                            ref={nodeRefs.current.get(expense.id)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 1.5,
                                marginBottom: 1.5,
                                boxShadow: 1
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                {/* Display category icon */}
                                {categoryIcons[expense.category] || categoryIcons.other}
                                
                                <Box sx={{ marginLeft: 2 }}>
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {expense.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1.1rem' }}>
                                        ¥ {expense.amount} • {expense.date}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton color="primary" onClick={() => onEdit(expense)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => onDelete(expense.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    </CSSTransition>
                );
            })}
        </TransitionGroup>
    );
};

// Prop types to enforce expected data types
ExpenseList.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            description: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ExpenseList;
