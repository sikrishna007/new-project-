import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import {getList} from "@/utils/util";


const sortOptions = [
    {
        label: "ALL",
        value: "Active",
    },
    {
        label: "Active",
        value: true,
    },
    {
        label: "InActive",
        value: false,
    },
];

export const CustomerListSearch = (props) => {
    const {
        onChangeActive,
        onChangeRole,
        role,
        isActive,
        label = "",
        nofilters = false,
    } = props;

    const queryRef = useRef(null);
    const [roles, setRoles] = useState([])
    useEffect(() => {
        getRoleListAdd()
    }, [])

    async function getRoleListAdd() {
        let location = window.location.href.split("/")[4];
        let data = await getList("/roles?&sortOn=name&sortOrder=asc")
        let roles = data.data
        let defaultRole = {
            id: 1,
            name: "All"
        };
        if (location === "customers") {
            let filteredRoles = roles.filter(role => {
                return role.name === "BUSINESS CUSTOMER" || role.name === "RETAIL CUSTOMER";
            });
            filteredRoles=[defaultRole,...filteredRoles]
            setRoles(filteredRoles)
        } else if (location === "vendors") {
            let filteredRoles = []

            setRoles(filteredRoles)
        } else {
            let filteredRoles = roles.filter(role => {
                return role.name !== "BUSINESS CUSTOMER" && role.name !== "RETAIL CUSTOMER" && role.name !== "VENDOR";
            });
            filteredRoles=[defaultRole,...filteredRoles]
            setRoles(filteredRoles)
        }
    }


    return (
        <>
            <Divider/>
            <Stack
                alignitems="center"
                direction="row"
                flexWrap="wrap"
                spacing={3}
                sx={{p: 3}}
            >
                <Box sx={{flexGrow: 1}}>
                    <OutlinedInput
                        defaultValue=""
                        disabled={true}
                        fullWidth
                        inputProps={{ref: queryRef}}
                        placeholder={`Search ${label}`}
                        startAdornment={
                            <InputAdornment position="start">
                                <SvgIcon>
                                    <SearchMdIcon/>
                                </SvgIcon>
                            </InputAdornment>
                        }
                    />
                </Box>
                {!nofilters && roles.length > 0 && (
                    <TextField
                        label="Role"
                        name="Role"
                        onChange={onChangeRole}
                        value={role}
                        select
                        SelectProps={{native: true}}
                    >
                        {roles.map((option) => (
                            <option key={option.name} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                )}
                {!nofilters && (
                    <TextField
                        label="Status"
                        name="status"
                        onChange={onChangeActive}
                        select
                        SelectProps={{native: true}}
                        value={isActive || sortOptions[0].value}
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                )}
            </Stack>
        </>
    );
};

CustomerListSearch.propTypes = {
    onFiltersChange: PropTypes.func,
    onSortChange: PropTypes.func,
    sortBy: PropTypes.string,
    sortDir: PropTypes.oneOf(["asc", "desc"]),
};
