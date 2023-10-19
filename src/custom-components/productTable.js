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
import {paths} from "src/paths";
import {useRouter} from "next/router";
import {SeverityPill} from "../components/severity-pill";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import {ToggleOffOutlined, ToggleOnOutlined} from "@mui/icons-material";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {endpoints} from "../endpoints";
import {TableContainer, TableSortLabel} from "@mui/material";
import CommonDialog from "./CommonDialog";
import Cookies from "js-cookie";
import Tooltip from "@mui/material/Tooltip";
import {setState} from "@aws-amplify/auth/lib/OAuth/oauthStorage";
import {patchMethod} from "@/utils/util";
import {visuallyHidden} from "@mui/utils";
const getTableHeaders = () => {
    let role = Cookies.get("role");
    if(role!== "VENDOR") {
        return [
            {key: "name", label: "PRODUCT"},
            {key: "offeringSubCategories.offeringCategories.name", label: "CATEGORY"},
            {key: "inStock", label: "STOCK"},
            {key: "unitPrice", label: "PRICE"},
            {key: "vendor", label: "VENDOR"},
            {key: "createdAt", label: "Created"},
            {key: "updatedAt", label: "Updated"},
        ];
    }
    else{
        return [
            {key: "name", label: "PRODUCT"},
            {key: "offeringSubCategories.offeringCategories.name", label: "CATEGORY"},
            {key: "inStock", label: "STOCK"},
            {key: "unitPrice", label: "PRICE"},
            {key: "createdAt", label: "Created"},
            {key: "updatedAt", label: "Updated"},
        ];
    }
};

export const ProductTable = (props) => {
    // const router = useRouter()
    let role = Cookies.get("role");
    const activate_deactivate = async (id, temp) => {
        const path = endpoints.product.index
        const json = await patchMethod(id,temp,path)
        props.getCustomers(page, rowsPerPage, props.isActive);
    };
    const [vendors, setVendors] = useState([]);

    // Fetch vendors and store them in the 'vendors' state
    const fetchVendors = async () => {
        try {
            let token = Cookies.get("accessToken");
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + endpoints.userManagement.vendors.index +
                `?pageNo=0&pageSize=100&isActive=true&sortOn=createdBy&sortOrder=desc`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setVendors(data.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    };

    useEffect(() => {
        if(role!=="VENDOR"){
        fetchVendors();}
    }, []); // Fetch vendors when the component mounts

    // Function to get vendor name by vendor ID
    const getVendorNameById = (vendorId) => {
        const vendor = vendors.find((v) => v.id === vendorId);
        return vendor ? vendor.user.firstName +" "+ vendor.user.lastName: "N/A"; // Return "N/A" if vendor not found
    };



    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        sortOn,
        handleSort,
        sortOrder,
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        hasMore,
    } = props;

    const tableHeaders = getTableHeaders();
    const selectedSome = selected.length > 0 && selected.length < items.length;
    const selectedAll = items.length > 0 && selected.length === items.length;
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
        productIsActive: false,
        productId: '',
        dialogIsOpen: false,
        productName: ''
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
                    <CommonDialog  onConfirm={() => {
                        // console.log("activate")
                        setActivateOpenAll(false)
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
                    <CommonDialog  onConfirm={() => {
                        setDeactivateOpenAll(false)
                        selected.forEach((item) => activate_deactivate(item, "false"));
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
                            <TableCell></TableCell>
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
                            <TableCell sx={{textAlign: "left"}}>STATUS</TableCell>
                            <TableCell sx={{textAlign: "center", right: 0}} width="15%">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((product) => {
                            const isSelected = selected.includes(product?.id);

                            return (
                                <TableRow hover key={product?.id} selected={isSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    onSelectOne?.(product?.id);
                                                } else {
                                                    onDeselectOne?.(product?.id);
                                                }
                                            }}
                                            value={isSelected}
                                        />
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        <Stack>
                                            <Box>
                                                {product.thumbnailUrl ? (
                                                    <Box
                                                        sx={{
                                                            alignItems: "left",
                                                            backgroundColor: "neutral.50",
                                                            backgroundImage: `url(${product.thumbnailUrl})`,
                                                            backgroundPosition: "left",
                                                            backgroundSize: "cover",
                                                            borderRadius: 1,
                                                            width: 50,
                                                            height:50,
                                                            justifyContent: "left",
                                                            overflow: "hidden",
                                                        }}
                                                    />
                                                ) : (
                                                    <Box>
                                                        <SvgIcon>
                                                            <Image01Icon/>
                                                        </SvgIcon>
                                                    </Box>
                                                )}
                                                <Box
                                                    sx={{
                                                        cursor: "pointer",
                                                    }}
                                                ></Box>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="View">
                                            <div style={{textAlign: "left"}}>
                                                <Link
                                                    style={{textAlign: "left"}}
                                                    color="inherit"
                                                    component={RouterLink}
                                                    href={
                                                        paths.productManagement.products.index + "/" + product.id
                                                    }
                                                >
                                                    {product?.name}

                                                </Link>
                                            </div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {product.offeringSubCategories?.offeringCategories?.name}
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        <Typography variant="subtitle2">
                                            {product?.inStock ? (
                                                <SeverityPill color="primary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In
                                                    Stock&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</SeverityPill>
                                            ) : (
                                                <SeverityPill color="warning">Out Of Stock</SeverityPill>
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                            ₹ {product?.unitPrice}
                                    </TableCell>
                                    {role === "VENDOR"?"":<TableCell sx={{textAlign: "left"}}>
                                        <Typography variant="subtitle2">
                                            {getVendorNameById(product?.vendor)}
                                        </Typography>
                                    </TableCell>}
                                    <TableCell sx={{textAlign: "left"}}>
                                            {new Date(product?.createdAt).toLocaleDateString(undefined, {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                    </TableCell>
                                    {/*<Typography variant="subtitle2">*/}
                                    {/*    {product?.updatedBy}*/}
                                    {/*</Typography>*/}
                                    <TableCell sx={{textAlign: "left"}}>
                                            {new Date(product?.updatedAt).toLocaleDateString(undefined, {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                    </TableCell>
                                    <TableCell sx={{textAlign: "left"}}>
                                        {product?.isActive ? (
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
                                        {role ==="VENDOR" ?"":<Tooltip title="Edit">
                                            <IconButton
                                                disabled={!product?.isActive}
                                                component={RouterLink}
                                                href={paths.productManagement.products.edit + product.id}
                                            >
                                                <SvgIcon>
                                                    <Edit02Icon/>
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>}
                                        {product?.isActive ? (
                                            <Tooltip title="Deactivate">
                                                <IconButton
                                                    sx={{color: "#0b8059"}}
                                                    // onClick={handleDeactivateClickOpen} sx={{color:"#0b8059"}}
                                                    onClick={() => {
                                                        setCommonDialogData({
                                                            productIsActive: product?.isActive,
                                                            dialogIsOpen: true,
                                                            productName: product?.name,
                                                            productId: product?.id
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
                                                        productIsActive: false,
                                                        dialogIsOpen: true,
                                                        productName: product?.name,
                                                        productId: product?.id
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
                                                component={RouterLink}
                                                href={
                                                    paths.productManagement.products.index + "/" + product.id
                                                }
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
                            if (commonDialogData.productIsActive) {
                                // console.log("Deactivate",commonDialogData.productName,commonDialogData.productId)
                                // Deactivate logic
                                activate_deactivate(commonDialogData.productId, "false");
                            } else {
                                // console.log("Activate",commonDialogData.productName,commonDialogData.productId)
                                // Activate logic
                                activate_deactivate(commonDialogData.productId, "true");
                            }
                            setCommonDialogData({
                                productIsActive: false,
                                dialogIsOpen: false,
                                productName: '',
                                productId: ''
                            })
                        }}
                        onClose={() => {
                            setCommonDialogData({
                                productIsActive: false,
                                dialogIsOpen: false,
                                productName: '',
                                productId: ''
                            })
                        }} // Close the dialog when canceled
                        open={commonDialogData.dialogIsOpen} // Dialog open state
                        description={`Are you sure you want to ${commonDialogData.productIsActive ? 'deactivate' : 'activate'} ${commonDialogData.productName}?`}

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

ProductTable.propTypes = {
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