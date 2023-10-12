// CommonDialog.js
import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';

const CommonDialog = ({ open, onClose, onConfirm, title, description}) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="common-dialog-title">
            <DialogContent>
                <DialogContentText id="common-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={onConfirm} autoFocus>
                    {title}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonDialog;
