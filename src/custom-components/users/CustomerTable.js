import numeral from 'numeral';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import {RouterLink} from 'src/components/router-link';
import {paths} from 'src/paths';
import {SeverityPill} from "@/components/severity-pill";
import {TableContainer, TableSortLabel} from "@mui/material";
import {ArrowDownward, ArrowUpward, ToggleOffOutlined, ToggleOnOutlined} from "@mui/icons-material";
import CommonDialog from "../CommonDialog";
import * as React from "react";
import {useState} from "react";
import {endpoints} from "@/endpoints";
import {useRouter} from "next/router";
import Tooltip from "@mui/material/Tooltip";
import Cookies from "js-cookie";
import {patchMethod} from "@/utils/util";
import {status} from "nprogress";
import {visuallyHidden} from "@mui/utils";
import RoleBasedView from "@/contexts/roleAut/RoleBasedView";

const getTableHeaders = () => {
    let location = window.location.href.split("/")[4];
    if (location === 'employees') {
        return [
            {key:"user.firstName",label:"Name"},
            {key:"user.emailId",label:"Email"},
            {key:"user.phoneNumber",label:"Phone"},
            {key:"user.role.name",label:"Role"},
            {key:"createdAt",label:"Created"},
            {key:"updatedAt",label:"Updated"},
        ];
    } else if (location === 'customers') {
        return [
            {key:"user.firstName",label:"Name"},
            {key:"name",label:"Business Name"},
            {key:"user.emailId",label:"Email"},
            {key:"user.phoneNumber",label:"Phone"},
            {key:"user.role.name",label:"Role"},
            {key:"createdAt",label:"Created"},
            {key:"updatedAt",label:"Updated"},
        ];
    } else {
        // Default headers
        return [
            {key:"user.firstName",label:"Name"},
            {key:"name",label:"Business Name"},
            {key:"user.emailId",label:"Email"},
            {key:"user.phoneNumber",label:"Phone"},
            {key:"createdAt",label:"Created"},
            {key:"updatedAt",label:"Updated"},
        ];
    }
};


export const CustomerTable = (props) => {
    const [status, setStatus] = useState("");
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
    const activate_deactivate = async (id, temp) => {
        const path = location === 'employees' ? endpoints.userManagement.employees.index : location === 'customers' ? endpoints.userManagement.customers.index :endpoints.userManagement.vendors.index
        const json = await patchMethod(id,temp,path)
        setStatus(json.status);
        props.getCustomers(page, rowsPerPage, props.isActive, role);
    };

    const tableHeaders = getTableHeaders();
    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);
    const enableBulkActions = selected.length > 0;
    const [activateOpenAll, setActivateOpenAll] = React.useState(false);
    const [deactivateOpenAll, setDeactivateOpenAll] = React.useState(false);


    const handleAllActivateClickOpen = () => {
        setActivateOpenAll(true);
    };

    const handleAllActivateClose = () => {
        setActivateOpenAll(false);
    };

    const handleAllDeactivateClickOpen = () => {
        setDeactivateOpenAll(true);
    };

    const handleAllDeactivateClose = () => {
        setDeactivateOpenAll(false);
    };


    const [commonDialogData, setCommonDialogData] = React.useState({
        customerIsActive: false,
        customerId: '',
        dialogIsOpen: false,
        customerName: ''
    })

    return (
        <Box sx={{position: 'relative'}}>
            {enableBulkActions && (
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                            ? 'neutral.800'
                            : 'neutral.50',
                        display: enableBulkActions ? 'flex' : 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        px: 2,
                        py: 0.5,
                        zIndex: 10
                    }}
                >
                    <Checkbox
                        checked={selectedAll}
                        indeterminate={selectedSome}
                        onChange={(event) => {
                            if (event.target.checked) {
                                onSelectAll?.();
                            } else {
                                onDeselectAll?.();
                            }
                        }}
                    />
                    <Button
                        onClick={handleAllActivateClickOpen}
                        color="inherit"
                        size="small"
                    >
                        Activate
                    </Button>
                    <CommonDialog onConfirm={() => {
                        setActivateOpenAll(false)
                        selected.forEach((item) => activate_deactivate(item, true));
                    }} onClose={handleAllActivateClose} open={activateOpenAll}
                                  description="Are you sure! Do you want to Activate?"/>

                    <Button
                        onClick={handleAllDeactivateClickOpen}
                        color="inherit"
                        size="small"
                    >
                        Deactivate
                    </Button>
                    <CommonDialog  onConfirm={() => {
                        setDeactivateOpenAll(false)
                        selected.forEach((item) => activate_deactivate(item, false));
                    }} onClose={handleAllDeactivateClose} open={deactivateOpenAll}
                                  description="Are you sure! Do you want to Deactivate?"/>
                </Stack>
            )}
            <TableContainer sx={{maxHeight: 557}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={selectedSome}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            onSelectAll?.();
                                        } else {
                                            onDeselectAll?.();
                                        }
                                    }}
                                />
                            </TableCell>
                            {tableHeaders.map((header, index) => (
                                <TableCell key={index} sx={{ textAlign: "left" }}>
                                    <TableSortLabel
                                        active={sortOn === header.key}
                                        direction={sortOn === header.key ? sortOrder : 'asc'}
                                        onClick={() => handleSort(header.key)}
                                    >
                                        {header.label}
                                        {sortOn ===  header.key ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell sx={{textAlign: "left"}}>Status</TableCell>
                            <TableCell sx={{textAlign: "center", right: 0}} width="15%">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((customer) => {
                            const isSelected = selected.includes(customer.id);
                            return (
                                <TableRow
                                    hover
                                    key={customer.id}
                                    selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    onSelectOne?.(customer?.id);
                                                } else {
                                                    onDeselectOne?.(customer?.id);
                                                }
                                            }}
                                            value={isSelected}
                                        />
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        <Tooltip title="View">
                                            <div>
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    href={`/users/${location}/${customer.id}`}
                                                >
                                                    {customer.user?.firstName} {" "}
                                                    {customer.user?.lastName}
                                                </Link>
                                            </div>
                                        </Tooltip>

                                    </TableCell>

                                    { location!=='employees' ?
                                    customer.name != null
                                        ? <TableCell sx={{textAlign: "left"}}>
                                            {customer?.name}
                                        </TableCell>
                                        :
                                        <TableCell sx={{textAlign: "left"}}>
                                            ---
                                        </TableCell>
                                   :'' }
                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer.user?.emailId}
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer.user?.phoneNumber}
                                    </TableCell>
                                    { location!=='vendors' ?
                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer.user?.role.name}
                                    </TableCell>
                                        :""}
                                    {/*<TableCell sx={{textAlign: "left"}}>*/}
                                    {/*    {customer?.createdBy}*/}
                                    {/*</TableCell>*/}
                                    <TableCell sx={{textAlign: "left"}}>
                                        {new Date(customer?.createdAt).toLocaleDateString(undefined, {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </TableCell>
                                    {/*<TableCell sx={{textAlign: "left"}}>*/}
                                    {/*    {customer?.updatedBy}*/}
                                    {/*</TableCell>*/}
                                    <TableCell sx={{textAlign: "left"}}>
                                        {new Date(customer?.updatedAt).toLocaleDateString(undefined, {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}

                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {customer?.isActive ? (
                                            <SeverityPill color="success">&nbsp;&nbsp;Active&nbsp;&nbsp;</SeverityPill>
                                        ) : (
                                            <SeverityPill color="error">Inactive</SeverityPill>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: "center",
                                            right: "0",
                                            position: "sticky",
                                            backgroundColor: 'white',
                                            "&:hover": {
                                                backgroundColor: "#F5f5f5",
                                            },
                                        }}
                                    >
                                        <RoleBasedView permissions={ location ==="vendors"?["ADMIN","VENDOR MANAGER","SALES MANAGER"]:location ==="customers"?["ADMIN","SALES MANAGER"]:["ADMIN"]}>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                disabled={!customer?.isActive}
                                                component={RouterLink}
                                                href={`/users/${location}/edit/${customer.id}`}
                                            >
                                                <SvgIcon>
                                                    <Edit02Icon/>
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                        {customer?.isActive ? (
                                            <Tooltip title="Deactivate">
                                                <IconButton
                                                    sx={{color: "#0b8059"}}
                                                    // onClick={handleDeactivateClickOpen} sx={{color:"#0b8059"}}
                                                    onClick={() => {
                                                        setCommonDialogData({
                                                            customerIsActive: customer?.isActive,
                                                            dialogIsOpen: true,
                                                            customerName: customer.user?.firstName,
                                                            customerId: customer?.id
                                                        })
                                                    }}

                                                >
                                                    <SvgIcon>
                                                        <ToggleOnOutlined/>
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Reactivate">
                                                <IconButton
                                                    sx={{color: "#b32318"}}
                                                    // onClick={handleActivateClickOpen} sx={{color:"#b32318"}}
                                                    onClick={() => setCommonDialogData({
                                                        customerIsActive: false,
                                                        dialogIsOpen: true,
                                                        customerName: customer.user?.firstName,
                                                        customerId: customer?.id
                                                    })}
                                                >
                                                    <SvgIcon>
                                                        <ToggleOffOutlined/>
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        </RoleBasedView>
                                        <Tooltip title="View">
                                            <IconButton
                                                component={RouterLink}
                                                href={`/users/${location}/${customer.id}`}
                                            >
                                                <SvgIcon>
                                                    <ArrowRightIcon/>
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <CommonDialog
                        onConfirm={() => {
                            // Action to perform when confirmed
                            // You can add your activate or deactivate logic here
                            if (commonDialogData.customerIsActive) {
                                // console.log("Deactivate", commonDialogData.customerName, commonDialogData.customerId)
                                // Deactivate logic
                                activate_deactivate(commonDialogData.customerId, "false");
                            } else {
                                // console.log("Activate", commonDialogData.customerName, commonDialogData.customerId)
                                // Activate logic
                                activate_deactivate(commonDialogData.customerId, "true");
                            }
                            setCommonDialogData({
                                customerIsActive: false,
                                dialogIsOpen: false,
                                customerName: '',
                                customerId: ''
                            })
                        }}
                        onClose={() => {
                            setCommonDialogData({
                                customerIsActive: false,
                                dialogIsOpen: false,
                                customerName: '',
                                customerId: ''
                            })
                        }} // Close the dialog when canceled
                        open={commonDialogData.dialogIsOpen} // Dialog open state
                        description={`Are you sure you want to ${commonDialogData.customerIsActive ? 'deactivate' : 'activate'} ${commonDialogData.customerName}?`}

                    />
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

CustomerTable.propTypes = {
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
