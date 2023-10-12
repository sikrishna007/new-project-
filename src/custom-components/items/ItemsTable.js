import {useState} from "react";
import {endpoints} from "@/endpoints";
import {patchMethod} from "@/utils/util";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CommonDialog from "@/custom-components/CommonDialog";
import {TableContainer} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import {RouterLink} from "@/components/router-link";
import {SeverityPill} from "@/components/severity-pill";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {ToggleOffOutlined, ToggleOnOutlined} from "@mui/icons-material";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import TablePagination from "@mui/material/TablePagination";

const getTableHeaders = () => {
    let location = window.location.href.split("/")[4];
    if (location === 'event-category') {
        return [
            {key:"name",label:"Name"},
            {key:"createdAt",label:"Created"},
            {key:"updatedAt",label:"Updated"},
        ];
    } else if (location === 'customers') {
        return [
            "Name",
            "Business Name",
            "Email",
            "Phone",
            "Role",
            "Created",
            "Updated",
        ];
    } else {
        // Default headers
        return [
            "Name",
            "Created",
            "Updated",
        ];
    }
};

export const ItemsTable = (props) => {
    const [status, setStatus] = useState("");
    let location = window.location.href.split("/")[4];
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        role,
        page = 0,
        rowsPerPage = 0,
        selected = [],
    } = props;
    const activate_deactivate = async (id, temp) => {
        const path = endpoints.eventCategories.index
        const json = await patchMethod(id,temp,path)
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
                    <CommonDialog title="Activate" onConfirm={() => {
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
                    <CommonDialog title="Deactivate" onConfirm={() => {
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
                                    {header}
                                </TableCell>
                            ))}
                            <TableCell sx={{textAlign: "left"}}>Status</TableCell>
                            <TableCell sx={{textAlign: "center", right: 0}} width="15%">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((eventCategory) => {
                            const isSelected = selected.includes(eventCategory.id);
                            return (
                                <TableRow hover key={eventCategory.id} selected={isSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    onSelectOne?.(eventCategory?.id);
                                                } else {
                                                    onDeselectOne?.(eventCategory?.id);
                                                }
                                            }}
                                            value={isSelected}
                                        />
                                    </TableCell>


                                    <TableCell>
                                        <Tooltip title="View">
                                            <div style={{textAlign: "left"}}>
                                                <Link
                                                    color="inherit"
                                                    variant="subtitle2"
                                                >
                                                    {eventCategory.name && eventCategory.name.charAt(0).toUpperCase() + eventCategory.name.slice(1)}
                                                </Link>
                                            </div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {new Date(eventCategory?.createdAt).toLocaleDateString(undefined, {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </TableCell>
                                    {/*    <TableCell sx={{textAlign: "left"}}>*/}
                                    {/*    {eventCategory?.updatedBy}*/}
                                    {/*</TableCell>*/}
                                    <TableCell sx={{textAlign: "left"}}>
                                        {new Date(eventCategory?.updatedAt).toLocaleDateString(undefined, {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {eventCategory?.isActive ? (
                                            <SeverityPill color="success">&nbsp;&nbsp;Active&nbsp;&nbsp;</SeverityPill>
                                        ) : (
                                            <SeverityPill color="error">Inactive</SeverityPill>
                                        )}
                                    </TableCell>

                                    <TableCell sx={{
                                        textAlign: "center",
                                        right: "0",
                                        position: "sticky",
                                        backgroundColor: 'white',
                                        "&:hover": {
                                            backgroundColor: "#F5f5f5",
                                        },
                                    }}>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                disabled={!eventCategory?.isActive}
                                                >
                                                <SvgIcon>
                                                    <Edit02Icon/>
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                        {eventCategory?.isActive ? (
                                            <Tooltip title="Deactivate">
                                                <IconButton
                                                    sx={{color: "#0b8059"}}
                                                    // onClick={handleDeactivateClickOpen} sx={{color:"#0b8059"}}
                                                    onClick={() => {
                                                        setCommonDialogData({
                                                            eventCategoryIsActive: eventCategory?.isActive,
                                                            dialogIsOpen: true,
                                                            eventCategoryName: eventCategory?.name,
                                                            eventCategoryId: eventCategory?.id
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
                                                        eventCategoryIsActive: false,
                                                        dialogIsOpen: true,
                                                        eventCategoryName: eventCategory?.name,
                                                        eventCategoryId: eventCategory?.id
                                                    })}
                                                >
                                                    <SvgIcon>
                                                        <ToggleOffOutlined/>
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                        )}

                                        <Tooltip title="View">
                                            <IconButton
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
                        title={commonDialogData.eventCategoryIsActive ? "Deactivate" : "Activate"} // Dialog title
                        onConfirm={() => {
                            if (commonDialogData.eventCategoryIsActive) {

                                activate_deactivate(commonDialogData.eventCategoryId, "false");
                            } else {

                                activate_deactivate(commonDialogData.eventCategoryId, "true");
                            }
                            setCommonDialogData({
                                eventCategoryIsActive: false,
                                dialogIsOpen: false,
                                eventCategoryName: '',
                                eventCategoryId: ''
                            })
                        }}
                        onClose={() => {
                            setCommonDialogData({
                                eventCategoryIsActive: false,
                                dialogIsOpen: false,
                                eventCategoryName: '',
                                eventCategoryId: ''
                            })
                        }} // Close the dialog when canceled
                        open={commonDialogData.dialogIsOpen} // Dialog open state
                        description={`Are you sure you want to ${commonDialogData.eventCategoryIsActive ? 'deactivate' : 'activate'} ${commonDialogData.eventCategoryName}?`}

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
