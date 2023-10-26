import {useCallback, useRef} from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SvgIcon from "@mui/material/SvgIcon";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

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

export const ItemSearch = ({isStatusShow=true, ...props}) => {
    const {
        isActive,
        searchCustomers,
        onChangeActive,
    } = props;

    return (
        <Card>
            <Stack
                alignItems="center"
                direction="row"
                gap={2}
                sx={{ p: 2 }}
            >
                <Box
                    component="form"
                    sx={{ flexGrow: 1 }}
                >
                    <OutlinedInput
                        defaultValue=""
                        fullWidth
                        name="itemName"
                        placeholder="Search"
                        startAdornment={(
                            <InputAdornment position="start">
                                <SvgIcon>
                                    <SearchMdIcon />
                                </SvgIcon>
                            </InputAdornment>
                        )}
                        onChange={(event)=>searchCustomers(event.target.value)}
                    />
                </Box>
                {isStatusShow && <TextField
                    label="Status"
                    name="status"
                    onChange={onChangeActive}
                    select
                    SelectProps={{native: true}}
                    value={isActive}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>}
            </Stack>
        </Card>
    );
};

ItemSearch.propTypes = {
    onFiltersChange: PropTypes.func,
    onSortChange: PropTypes.func,
    onViewChange: PropTypes.func,
    sortBy: PropTypes.string,
    sortDir: PropTypes.oneOf(['asc', 'desc']),
    view: PropTypes.oneOf(['grid', 'list'])
};
