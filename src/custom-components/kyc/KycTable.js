import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import {RouterLink} from 'src/components/router-link';
import {SeverityPill} from "@/components/severity-pill";
import {TableContainer, TableSortLabel} from "@mui/material";
import * as React from "react";
import {visuallyHidden} from "@mui/utils";

const getTableHeaders = () => {
    return [

        {key: "name", label: "Business Name"},
        {key: "user.firstName", label: "Name"},
        {key: "user.emailId", label: "Email"},
        {key: "user.phoneNumber", label: "Phone"},
    ];

};


export const KycTable = (props) => {
    let location = window.location.href.split("/")[4];
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onRowsPerPageChange,
        sortOn,
        handleSort,
        sortOrder,
        onSelectAll,
        onSelectOne,
        role,
        page = 0,
        rowsPerPage = 0,
        selected = [],
    } = props;
    const tableHeaders = getTableHeaders();
    return (
        <Box sx={{position: 'relative'}}>

            <TableContainer sx={{maxHeight: 557}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {tableHeaders.map((header, index) => (
                                <TableCell key={index} sx={{textAlign: "left"}}>
                                    <TableSortLabel
                                        active={sortOn === header.key}
                                        direction={sortOn === header.key ? sortOrder : 'asc'}
                                        onClick={() => handleSort(header.key)}
                                    >
                                        {header.label}
                                        {sortOn === header.key ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell sx={{textAlign: "left"}}>Status</TableCell>
                            <TableCell sx={{textAlign: "left"}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((customer) => {
                            return (
                                <TableRow
                                    hover
                                    key={customer.id}
                                >
                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer?.name}
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer.user?.firstName} {" "}
                                        {customer.user?.lastName}
                                    </TableCell>

                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer.user?.emailId}
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer.user?.phoneNumber}
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer?.user.kycStatus.status === "verified" ? (
                                                <SeverityPill color="success">VERIFIED</SeverityPill>) :
                                            (customer?.user.kycStatus.status === "rejected" ? (<SeverityPill
                                                color="error">REJECTED</SeverityPill>) : (
                                                <SeverityPill
                                                    color="warning">PENDING</SeverityPill>))}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            component={RouterLink}
                                            href={`/kycVerification/${location}/${customer.id}`}
                                        >View Details</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={count}
                onPageChange={(e, v) => props.handlePageChange(e, v)}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </Box>
    );
};

KycTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array
};
