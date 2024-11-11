// src/components/NotificationSnackbar.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationSnackbar = ({
    open,
    message,
    severity,
    onClose,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    width = '400px', 
    fontSize = '1rem', 
    padding = '16px' 
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{
                    width: width, 
                    fontSize: fontSize, 
                    padding: padding, 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationSnackbar;
