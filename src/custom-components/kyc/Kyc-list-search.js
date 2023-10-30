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
        value: "7123313635396419584",
    },
    {
        label: "PENDING",
        value: "7123313635396419580",
    },

    {
        label: "REJECTED",
        value: "7123313635396419583",
    },
    {
        label: "VERIFIED",
        value: "7123313635396419582",
    },
];

export const KycListSearch = (props) => {
    const {
        onChangeActive,
        onChangeRole,
        role,
        isActive,
        label = "",
        nofilters = false,
    } = props;

    return (
        <>
            <Divider/>
            <Stack
                alignitems="center"
                direction="row"
                flexWrap="wrap"
                justifyContent="flex-end"
                sx={{p: 2}}
            >
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

KycListSearch.propTypes = {
    onFiltersChange: PropTypes.func,
    onSortChange: PropTypes.func,
    sortBy: PropTypes.string,
    sortDir: PropTypes.oneOf(["asc", "desc"]),
};
