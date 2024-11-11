import React, { useRef } from 'react';
import { Card, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    const nodeRefs = useRef([]);

    return (
        <TransitionGroup>
            {expenses.map((expense, index) => {
                if (!nodeRefs.current[index]) {
                    nodeRefs.current[index] = React.createRef();
                }

                return (
                    <CSSTransition
                        key={expense.id}
                        nodeRef={nodeRefs.current[index]}
                        timeout={300}
                        classNames="expense"
                    >
                        <Card ref={nodeRefs.current[index]} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1.5, marginBottom: 1.5, boxShadow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

export default ExpenseList;
