import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import citySearch from "@/custom-components/city-search";
import CitySearch from "@/custom-components/city-search";

export const VendorAddress = (props) => {
    let {submit,handleGetAddress,setCity,text, customer, formik, ...other} = props;


    return (

        <Grid container spacing={3}>
            <Grid xs={12} md={6}>
                <TextField
                    error={
                        !!(formik.touched.addressLine1 && formik.errors.addressLine1)
                    }
                    fullWidth
                    helperText={
                        formik.touched.addressLine1 && formik.errors.addressLine1
                    }
                    label={
                        <span>
                                    Address Line 1&nbsp;
                            <span style={{color: "red"}}>*</span>
                                </span>
                    }
                    name="addressLine1"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.addressLine1}
                />
            </Grid>
            <Grid xs={12} md={6}>
                <TextField
                    error={
                        !!(formik.touched.addressLine2 && formik.errors.addressLine2)
                    }
                    fullWidth
                    helperText={
                        formik.touched.addressLine2 && formik.errors.addressLine2
                    }
                    label="Address Line 2"
                    name="addressLine2"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.addressLine2}
                />
            </Grid>
            <Grid xs={12} md={6}>
                <CitySearch

                    text={text}
                    formik={formik}
                    setCity={setCity}
                    handleGetAddress={handleGetAddress}
                />

            </Grid>
            <Grid xs={12} md={6}>
                <TextField
                    error={
                        !!(formik.touched.state && formik.errors.state)
                    }
                    fullWidth
                    helperText={
                        formik.touched.state && formik.errors.state
                    }
                    label={
                        <span>
                                    State&nbsp;
                            <span style={{color: "red"}}>*</span>
                                </span>
                    }

                    name="state"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.state}
                />
            </Grid>
            <Grid xs={12} md={6}>
                <TextField
                    error={
                        !!(formik.touched.addressLine2 && formik.errors.country)
                    }
                    fullWidth
                    helperText={
                        formik.touched.addressLine2 && formik.errors.country
                    }
                    label={
                        <span>
                                    Country&nbsp;
                            <span style={{color: "red"}}>*</span>
                                </span>
                    }
                    name="country"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.country}
                />
            </Grid>
            <Grid xs={12} md={6}>
                <TextField
                    error={!!(formik.touched.pincode && formik.errors.pincode)}
                    fullWidth
                    helperText={formik.touched.pincode && formik.errors.pincode}
                    label={
                        <span>
                                    Pincode&nbsp;
                            <span style={{color: "red"}}>*</span>
                                </span>
                    }
                    name="pincode"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.pincode}
                />
            </Grid>
        </Grid>
    );
};