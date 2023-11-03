// CommonDialog.js
import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';

const CommonDialog = ({ open, onClose, onConfirm, description}) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="common-dialog-title">
            <DialogContent>
                <DialogContentText id="common-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button type="submit" onClick={onConfirm} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonDialog;
