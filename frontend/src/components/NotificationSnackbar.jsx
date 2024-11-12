// src/components/NotificationSnackbar.js

import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';

/**
 * NotificationSnackbar Component
 * 
 * Displays a snackbar notification with customizable message, severity, position,
 * and styling options.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls whether the snackbar is open
 * @param {string} props.message - The message to display in the snackbar
 * @param {string} props.severity - Severity level for the snackbar (e.g., 'success', 'error', 'warning', 'info')
 * @param {Function} props.onClose - Callback to handle closing the snackbar
 * @param {Object} [props.anchorOrigin={ vertical: 'bottom', horizontal: 'left' }] - Position of the snackbar on the screen
 * @param {string} [props.width='400px'] - Width of the snackbar
 * @param {string} [props.fontSize='1rem'] - Font size of the message text
 * @param {string} [props.padding='16px'] - Padding inside the snackbar
 * 
 * @returns {JSX.Element} The rendered NotificationSnackbar component
 */
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
                    width, 
                    fontSize, 
                    padding,
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

// Prop types to enforce expected data types and provide default values
NotificationSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
    onClose: PropTypes.func.isRequired,
    anchorOrigin: PropTypes.shape({
        vertical: PropTypes.oneOf(['top', 'bottom']),
        horizontal: PropTypes.oneOf(['left', 'center', 'right']),
    }),
    width: PropTypes.string,
    fontSize: PropTypes.string,
    padding: PropTypes.string,
};

export default NotificationSnackbar;
