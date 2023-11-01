import * as Yup from "yup";
import {useFormik} from "formik";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getList, getSubmitHandler} from "@/utils/util";
import {VendorBasic} from "@/custom-components/users/forms/VendorBasic";
import {Employee} from "@/custom-components/users/forms/Employee";
import {Vendor} from "@/custom-components/users/forms/Vendor";
import {VendorSocial} from "@/custom-components/users/forms/VendorSocial";
import {BusinessCustomer} from "@/custom-components/users/forms/BusinessCustomer";
import {Customer} from "@/custom-components/users/forms/Customer";
import MapComponent from "@/custom-components/users/forms/EventClickLatLng";
import {LoadScript} from "@react-google-maps/api";
import {CreateCustomer} from "@/custom-components/users/forms/SaveCustomer";


export const AddForm = (props) => {
    const [roles, setRoles] = useState([])
    useEffect(() => {
        getRoleListAdd()
    }, [])

    async function getRoleListAdd() {
        let location = window.location.href.split("/")[4];
        let roles = await getList("/roles")
        if (location === "customers") {
            let filteredRoles = roles.data.filter(role => {
                return role.name === "BUSINESS CUSTOMER" || role.name === "RETAIL CUSTOMER";
            });

            setRoles(filteredRoles)
        } else if (location === "vendors") {
            let filteredRoles = roles.data.filter(role => {
                return role.name === "VENDOR";
            });

            setRoles(filteredRoles)
        } else {
            let filteredRoles = roles.data.filter(role => {
                return role.name !== "BUSINESS CUSTOMER" && role.name !== "RETAIL CUSTOMER" && role.name !== "VENDOR";
            });

            setRoles(filteredRoles)
        }
    }

    let location = window.location.href.split("/")[4];
    const router = useRouter();
    const {customer, ...other} = props;


    const formik = useFormik({
        initialValues: {
            panNumber: "",
            aadhaarNumber: "",
            empId: "",
            addressLine1: "",
            addressLine2: "",
            country: "",
            city: "",
            email: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            phoneNumber: "",
            whatsappNumber: "",
            state: "",
            submit: null,
            pincode: "",
            role: location === "vendors" ? "VENDOR" : location === "customers" ? "BUSINESS CUSTOMER" : location === "employees" ? "ADMIN" : "",
            name: "",
            gstNumber:"",
            termsAndConditions: "",
            shortDescription: "",
            latitudes: "",
            longitudes: "",
            longDescription: "",
            facebookLink: "",
            instagramLink: "",
            youtubeLink: "",
        },
        validationSchema:
            location === "vendors" ?
                Yup.object({
                    name: Yup.string().max(255).required("Business Name is required").matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    addressLine1: Yup.string().max(255).required("Address Line 1 is required").matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    country: Yup.string().max(255).required("Country is required"),
                    city: Yup.string().max(255).required("City is required"),
                    state: Yup.string().max(255).required("State is required"),
                    gstNumber:Yup.string().matches(/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}Z[0-9a-zA-Z]{1}$/, "Must be a valid GST Number"),pincode: Yup.string().max(255).required("Pincode is required"),
                    email: Yup.string()
                        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must be a valid email")
                        .required("Email is required"),
                    firstName: Yup.string().max(255).required("First Name is required").matches(/^[A-Za-z ]+$/, 'First name should only contain alphabets').matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    lastName: Yup.string().max(255).required("Last Name is required").matches(/^[A-Za-z ]+$/, 'Last name should only contain alphabets').matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number should only contain numbers').min(10, 'Phone number must be atleast 10 numbers').max(10, 'Phone number must be atmost 10 numbers').required("Phone Number is Required"),
                    whatsappNumber: Yup.string().matches(/^[0-9]+$/, 'Whatsapp number should only contain numbers').min(10, 'Whatsapp number must be atleast 10 numbers').max(10, 'Whatsapp number must be atmost 10 numbers'),
                    panNumber: Yup.string().matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Must be a valid PAN Number'),
                    // state: Yup.number().max(255),
                }) : location === "customers" ? Yup.object({
                    name: Yup.string().max(255).matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    addressLine1: Yup.string().max(255).required("Address Line 1 is required").matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    country: Yup.string().max(255).required("Country is required"),
                    city: Yup.string().max(255).required("City is required"),
                    state: Yup.string().max(255).required("State is required"),
                    aadhaarNumber: Yup.string().matches(/^\d{12}$/, "Must be a valid AdhaarNumber"),
                    pincode: Yup.string().max(255).required("Pincode is required").matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    email: Yup.string()
                        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must be a valid email")
                        .required("Email is required"),
                    firstName: Yup.string().max(255).required("First Name is required").matches(/^[A-Za-z ]+$/, 'First name should only contain alphabets').matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    lastName: Yup.string().max(255).required("Last Name is required").matches(/^[A-Za-z ]+$/, 'Last name should only contain alphabets').matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number should only contain numbers').min(10, 'Phone number must be atleast 10 numbers').max(10, 'Phone number must be  10 numbers').required("Phone Number is Required"),
                    whatsappNumber: Yup.string().matches(/^[0-9]+$/, 'Whatsapp number should only contain numbers').min(10, 'Whatsapp number must be atleast 10 numbers').max(10, 'Whatsapp number must be  10 numbers'),
                    panNumber: Yup.string().matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Must be a valid PAN Number'),
                    gstNumber:Yup.string().matches(/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zuyA-Z]{1}[1-9a-zA-Z]{1}Z[0-9a-zA-Z]{1}$/, "Must be a valid GST Number"),
                    // state: Yup.number().max(255),
                }) : Yup.object({
                    empId: Yup.string().max(255).required("Employee Id is required").matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    addressLine1: Yup.string().max(255).required("Address Line 1 is required").matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    country: Yup.string().max(255).required("Country is required"),
                    city: Yup.string().max(255).required("City is required"),
                    state: Yup.string().max(255).required("State is required"),
                    pincode: Yup.string().max(255).required("Pincode is required").matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    email: Yup.string()
                        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must be a valid email")
                        .required("Email is required"),
                    firstName: Yup.string().max(255).required("First Name is required").matches(/^[A-Za-z ]+$/, 'First name should only contain alphabets').matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    lastName: Yup.string().max(255).required("Last Name is required").matches(/^[A-Za-z ]+$/, 'Last name should only contain alphabets').matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
                    phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number should only contain numbers').min(10, 'Phone number must be atleast 10 numbers').max(10, 'Phone number must be  10 numbers').required("Phone Number is Required"),
                    whatsappNumber: Yup.string().matches(/^[0-9]+$/, 'Whatsapp number should only contain numbers').min(10, 'Whatsapp number must be atleast 10 numbers').max(10, 'Whatsapp number must be  10 numbers'),
                    panNumber: Yup.string().matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Must be a valid PAN Number'),
                }),
        onSubmit: getSubmitHandler(router),
    });
    const getForm = (role) => {
        if (role === "VENDOR") {
            return (
                <>
                    <VendorBasic formik={formik}/>
                    <Vendor formik={formik}/>
                    <LoadScript
                        googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_KEY}
                        libraries={["places"]}
                    > <MapComponent formik={formik}/>
                    </LoadScript>

                    <VendorSocial formik={formik}/>
                    <CreateCustomer formik={formik}/>
                </>
            );
        } else if (role === "BUSINESS CUSTOMER") {
            return (
                <>

                    <VendorBasic formik={formik}/>
                    <BusinessCustomer formik={formik}/>
                    <LoadScript
                        googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_KEY}
                        libraries={["places"]}
                    > <MapComponent formik={formik}/>
                    </LoadScript>
                    <CreateCustomer formik={formik}/>
                </>
            );
        } else if (role === "RETAIL CUSTOMER") {
            return (
                <>
                    <VendorBasic formik={formik}/>
                    <Customer formik={formik}/>
                    <LoadScript
                        googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_KEY}
                        libraries={["places"]}
                    > <MapComponent formik={formik}/>
                    </LoadScript>
                    <CreateCustomer formik={formik}/>
                </>
            );
        } else {
            return (
                <>
                    <VendorBasic formik={formik}/>
                    <Employee formik={formik}/>
                    <LoadScript
                        googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_KEY}
                        libraries={["places"]}
                    > <MapComponent formik={formik}/>
                    </LoadScript>
                    <CreateCustomer formik={formik}/>
                    {/*<MyFancyComponent formik={formik}/>*/}
                    {/*<SaveEmployee formik={formik} submit/>*/}
                </>
            );
        }
    };
    return (
        <form>
            <Card sx={{marginBottom: "3%"}}>
                <CardHeader title="Select Role"/>
                <CardContent sx={{pt: 0}}>
                    <Grid container spacing={3}>
                        <Grid xs={12} md={6}>
                            <TextField
                                error={!!(formik.touched.role && formik.errors.role)}
                                fullWidth
                                label="Role"
                                name="role"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.role}
                                select
                                // defaultValue={
                                //   location === "vendors" ? "vendor" : formik.values.role
                                // }
                                // value={location === "vendors" ? "vendor" : formik.values.role}
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
                {/* <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.customers.details}
          >
            Cancel
          </Button>
        </Stack> */}
            </Card>
            {getForm(formik.values.role)}
            {/*{formik.values.role === "employee" && <Employee formik={formik}/>}*/}
        </form>
    );
};
