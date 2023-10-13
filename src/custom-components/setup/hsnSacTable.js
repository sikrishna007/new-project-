import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {RouterLink} from "src/components/router-link";
import {DeleteOutlined,} from "@mui/icons-material";
import * as React from "react";
import {useState} from "react";
import {TableContainer} from "@mui/material";
import CommonDialog from "../CommonDialog";
import Cookies from "js-cookie";
import Tooltip from "@mui/material/Tooltip";
import {endpoints} from "@/endpoints";

export const HsnSacTable = (props) => {
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange,
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        CodeName,
        codePath,
    } = props;


    const activate_deactivate = async (id, temp) => {
        try {
            let jsonString = JSON.stringify({isActive: temp});
            let token = Cookies.get("accessToken");
            const requestOptions = {
                method: "PATCH", // Or 'PUT', 'GET', etc. depending on the type of request you want to make
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json", // Set the Content-Type to indicate that the request body is in JSON format
                },
                body: jsonString, // Replace this with the data you want to send in the request body
            };
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.hsnSac.index +
                "/" +
                id,
                requestOptions
            );
            if (!response.ok) {
                throw new Error(response);
            }
            const json = await response.json();
            setStatus(json.status);
            props.getCustomers(page, rowsPerPage, props.isActive);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    const selectedSome = selected.length > 0 && selected.length < items.length;
    const selectedAll = items.length > 0 && selected.length === items.length;
    const enableBulkActions = selected.length > 0;

    const [activateOpenAll, setActivateOpenAll] = React.useState(false);
    const [deactivateOpenAll, setDeactivateOpenAll] = React.useState(false);

    const [showFullContent, setShowFullContent] = useState([]);
    const toggleContent = (id) => {
        setShowFullContent((prevShowFullContent) => {
            const updatedShowFullContent = { ...prevShowFullContent };

            // Reset all other rows to false
            for (const key in updatedShowFullContent) {
                if (key !== id) {
                    updatedShowFullContent[key] = false;
                }
            }

            // Toggle the clicked row
            updatedShowFullContent[id] = !updatedShowFullContent[id];

            return updatedShowFullContent;
        });
    };

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

    const [commonDialogData,setCommonDialogData] = React.useState({
        hsnSacIsActive :false,
        hsnSacId : '',
        dialogIsOpen: false,
        hsnSacName:''
    })

    return (
        <Box sx={{position: "relative"}}>
            {enableBulkActions && (
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
                        display: enableBulkActions ? "flex" : "none",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        px: 2,
                        py: 0.5,
                        zIndex: 10,
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
                        selected.forEach((item) => activate_deactivate(item, "true"));
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
                        selected.forEach((item) => activate_deactivate(item, "false"));
                    }} onClose={handleAllDeactivateClose} open={deactivateOpenAll}
                                  description="Are you sure! Do you want to Deactivate?"/>
                </Stack>
            )}
            <TableContainer sx={{maxHeight: 530}}>
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
                            <TableCell sx={{textAlign: "left"}} width="10%">{CodeName} Code</TableCell>
                            <TableCell sx={{textAlign: "left"}} width="35%">Description</TableCell>
                            <TableCell sx={{textAlign: "left"}} width="10%">SGST%</TableCell>
                            <TableCell sx={{textAlign: "left"}} width="10%">CGST%</TableCell>
                            <TableCell sx={{textAlign: "left"}} width="10%">IGST%</TableCell>
                            <TableCell sx={{textAlign: "center", right: 0}} width="15%">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((employee) => {
                            const isSelected = selected.includes(employee.id);
                            const isFullContentVisible = showFullContent[employee.id] || false;
                            return (

                                <TableRow hover key={employee.id} selected={isSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    onSelectOne?.(employee?.id);
                                                } else {
                                                    onDeselectOne?.(employee?.id);
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
                                                    href={`/setup/${codePath}/${employee.id}`}
                                                    variant="subtitle2"
                                                >
                                                    {employee.code}
                                                </Link>
                                            </div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "left" }}>
                                        {employee?.description && (
                                            <div>
                                                {employee.description.length > 30 ? (
                                                    <div>
                                                        {isFullContentVisible
                                                            ? employee.description
                                                            : `${employee.description.slice(0, 30)} ... `}
                                                        <Button onClick={() => toggleContent(employee.id)}>
                                                            {isFullContentVisible ? "Read Less" : "Read More"}
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    employee.description
                                                )}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        <Typography variant="subtitle2">{employee?.sgstPercentage}</Typography>
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {employee?.cgstPercentage}
                                    </TableCell>

                                    <TableCell sx={{textAlign: "left"}}>
                                        {employee?.igstPercentage}
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
                                                component={RouterLink}
                                                href={`/setup/${codePath}/edit/${employee.id}`}
                                                disabled={!employee?.isActive}
                                            >
                                                <SvgIcon>
                                                    <Edit02Icon/>
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                sx={{color:"#b32318"}}
                                                onClick={() => {
                                                    setCommonDialogData({
                                                        hsnSacIsActive: employee?.isActive,
                                                        dialogIsOpen: true,
                                                        hsnSacName: employee?.code,
                                                        hsnSacId: employee?.id
                                                    })
                                                }}

                                            >
                                                <SvgIcon>
                                                    <DeleteOutlined />
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="View">
                                            <IconButton
                                                component={RouterLink}
                                                href={`/setup/${codePath}/${employee.id}`}
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
                        title={commonDialogData.hsnSacIsActive ? "Deactivate" : "Activate"} // Dialog title
                        onConfirm={() => {
                            if (commonDialogData.hsnSacIsActive) {
                                // Deactivate logic
                                activate_deactivate(commonDialogData.hsnSacId, "false");
                            } else {
                                // Activate logic
                                activate_deactivate(commonDialogData.hsnSacId, "true");
                            }
                            setCommonDialogData({
                                hsnSacIsActive: false,
                                dialogIsOpen: false,
                                hsnSacName: '',
                                hsnSacId: ''
                            })
                        }}
                        onClose={()=>{
                            setCommonDialogData({
                                hsnSacIsActive: false,
                                dialogIsOpen: false,
                                hsnSacName: '',
                                hsnSacId: ''
                            })
                        }} // Close the dialog when canceled
                        open={commonDialogData.dialogIsOpen} // Dialog open state
                        description={ `Are you sure you want to ${commonDialogData.hsnSacIsActive ?'Delete':'activate'} ${commonDialogData.hsnSacName} ?`}

                    />
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={count}
                onPageChange={(e, v) => onPageChange(e, v)}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25,50]}
            />
        </Box>
    );
};

HsnSacTable.propTypes = {
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
    selected: PropTypes.array,
};
