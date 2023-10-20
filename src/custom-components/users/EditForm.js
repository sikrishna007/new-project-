import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {useFormik} from "formik";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {ToastError} from "src/icons/ToastError";
import {useRouter} from "next/router";
import {getList, getSubmitHandler, getSubmitHandlerEdit} from "@/utils/util";
import {VendorBasic} from "@/custom-components/users/forms/VendorBasic";
import {Employee} from "@/custom-components/users/forms/Employee";
import {Vendor} from "@/custom-components/users/forms/Vendor";
import {VendorSocial} from "@/custom-components/users/forms/VendorSocial";
import {BusinessCustomer} from "@/custom-components/users/forms/BusinessCustomer";
import {Customer} from "@/custom-components/users/forms/Customer";
import MyFancyComponent from "@/custom-components/users/forms/EventClickLatLng";
import MapComponent from "@/custom-components/users/forms/EventClickLatLng";
import {LoadScript} from "@react-google-maps/api";
import {VendorAddress} from "@/custom-components/users/forms/VendorAddress";
import {EditCustomer} from "@/custom-components/users/forms/SaveCustomer";


export const EditForm = (props) => {
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
    const [hasChanges, setHasChanges] = useState(false);


    const formik = useFormik({
        initialValues: {
            role: customer.user?.role.name ? customer.user?.role.name : location === "vendors" ? "VENDOR" : location === "customers" ? "BUSINESS CUSTOMER" : location === "employees" ? "ADMIN" : "",
            firstName: customer.user?.firstName || "",
            lastName: customer.user?.lastName || "",
            name: customer.name || "",
            email: customer.user?.emailId || "",
            phoneNumber: customer.user?.phoneNumber || "",
            whatsappNumber: customer.user?.whatsappNumber || "",
            dateOfBirth: customer.user?.dateOfBirth || "",
            panNumber: customer.panNumber || "",
            adhaarNumber: customer.adhaarNumber || "",
            gstNumber: customer.gstNumber || "",
            isBusinessCustomer: customer.isBusinessCustomer || false,
            empId: customer.empId || "",
            addressLine1: customer.user?.addresses[0]?.addressLine1 || "",
            addressLine2: customer.user?.addresses[0]?.addressLine2 || "",
            city: customer.user?.addresses[0]?.city || "",
            state: customer.user?.addresses[0]?.state || "",
            country: customer.user?.addresses[0]?.country || "",
            latitudes: customer.user?.addresses[0]?.latitudes || "",
            longitudes: customer.user?.addresses[0]?.longitudes || "",
            pincode: customer.user?.addresses[0]?.pincode || "",
            termsAndConditions: "",
            shortDescription: "",
            longDescription: customer.longDescription || "",
            facebookLink: customer.facebookLink || "",
            instagramLink: customer.instagramLink || "",
            youtubeLink: customer.youtubeLink || "",
            submit: null,
        },
        validationSchema:
            location === "vendors" ?
                Yup.object({
                    name: Yup.string().max(255).required("Business Name is required"),
                    addressLine1: Yup.string().max(255).required("Address Line 1 is required"),
                    country: Yup.string().max(255).required("Country is required"),
                    city: Yup.string().max(255).required("City is required"),
                    state: Yup.string().max(255).required("State is required"),
                    // gstNumber:Yup.string().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Must be a valid GST Number"),
                    pincode: Yup.string().max(255).required("Pincode is required"),
                    email: Yup.string()
                        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must be a valid email")
                        .required("Email is required"),
                    firstName: Yup.string().max(255).required("First Name is required").matches(/^[A-Za-z ]+$/, 'First name should only contain alphabets'),
                    lastName: Yup.string().max(255).required("Last Name is required").matches(/^[A-Za-z ]+$/, 'Last name should only contain alphabets'),
                    phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number should only contain numbers').min(10, 'Phone number must be atleast 10 numbers').max(10, 'Phone number must be atmost 10 numbers').required("Phone Number is Required"),
                    whatsappNumber: Yup.string().matches(/^[0-9]+$/, 'Whatsapp number should only contain numbers').min(10, 'Whatsapp number must be atleast 10 numbers').max(10, 'Whatsapp number must be atmost 10 numbers'),
                    panNumber: Yup.string().matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Must be a valid PAN Number'),
                    // state: Yup.number().max(255),
                }) : location === "customers" ? Yup.object({
                    addressLine1: Yup.string().max(255).required("Address Line 1 is required"),
                    country: Yup.string().max(255).required("Country is required"),
                    city: Yup.string().max(255).required("City is required"),
                    state: Yup.string().max(255).required("State is required"),
                    aadhaarNumber: Yup.string().matches(/^\d{12}$/, "Must be a valid AdhaarNumber"),
                    pincode: Yup.string().max(255).required("Pincode is required"),
                    email: Yup.string()
                        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must be a valid email")
                        .required("Email is required"),
                    firstName: Yup.string().max(255).required("First Name is required").matches(/^[A-Za-z ]+$/, 'First name should only contain alphabets'),
                    lastName: Yup.string().max(255).required("Last Name is required").matches(/^[A-Za-z ]+$/, 'Last name should only contain alphabets'),
                    phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number should only contain numbers').min(10, 'Phone number must be atleast 10 numbers').max(10, 'Phone number must be  10 numbers').required("Phone Number is Required"),
                    whatsappNumber: Yup.string().matches(/^[0-9]+$/, 'Whatsapp number should only contain numbers').min(10, 'Whatsapp number must be atleast 10 numbers').max(10, 'Whatsapp number must be  10 numbers'),
                    panNumber: Yup.string().matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Must be a valid PAN Number'),
                    // state: Yup.number().max(255),
                }) : Yup.object({
                    empId: Yup.string().max(255).required("Employee Id is required"),
                    addressLine1: Yup.string().max(255).required("Address Line 1 is required"),
                    country: Yup.string().max(255).required("Country is required"),
                    city: Yup.string().max(255).required("City is required"),
                    state: Yup.string().max(255).required("State is required"),
                    pincode: Yup.string().max(255).required("Pincode is required"),
                    email: Yup.string()
                        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must be a valid email")
                        .required("Email is required"),
                    firstName: Yup.string().max(255).required("First Name is required").matches(/^[A-Za-z ]+$/, 'First name should only contain alphabets'),
                    lastName: Yup.string().max(255).required("Last Name is required").matches(/^[A-Za-z ]+$/, 'Last name should only contain alphabets'),
                    phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number should only contain numbers').min(10, 'Phone number must be atleast 10 numbers').max(10, 'Phone number must be  10 numbers').required("Phone Number is Required"),
                    whatsappNumber: Yup.string().matches(/^[0-9]+$/, 'Whatsapp number should only contain numbers').min(10, 'Whatsapp number must be atleast 10 numbers').max(10, 'Whatsapp number must be  10 numbers'),
                    panNumber: Yup.string().matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Must be a valid PAN Number'),
                }),
        onSubmit: getSubmitHandlerEdit(router),
    });


    useEffect(() => {
        if (location === "vendors") {
            if (!(formik.values.role === customer.user?.role.name)
                || !(formik.values.firstName === customer.user?.firstName)
                || !(formik.values.lastName === customer.user?.lastName)
                || !(formik.values.email === customer.user?.emailId)
                || !(formik.values.phoneNumber === customer.user?.phoneNumber)
                || !(formik.values.whatsappNumber === (customer.user?.whatsappNumber ? customer.user?.whatsappNumber : ""))
                || !(formik.values.dateOfBirth === (customer.user?.dateOfBirth ? customer.user?.dateOfBirth : ""))

                || !(formik.values.panNumber === (customer.panNumber ? customer.panNumber : ""))
                || !(formik.values.name === (customer.name ? customer.name : ""))
                || !(formik.values.gstNumber === (customer.gstNumber ? customer.gstNumber : ""))

                || !(formik.values.addressLine1 === (customer.user?.addresses[0]?.addressLine1 ? customer.user?.addresses[0]?.addressLine1 : ""))
                || !(formik.values.addressLine2 === (customer.user?.addresses[0]?.addressLine2 ? customer.user?.addresses[0]?.addressLine2 : ""))
                || !(formik.values.city === (customer.user?.addresses[0]?.city ? customer.user?.addresses[0]?.city : ""))
                || !(formik.values.state === (customer.user?.addresses[0]?.state ? customer.user?.addresses[0]?.state : ""))
                || !(formik.values.country === (customer.user?.addresses[0]?.country ? customer.user?.addresses[0]?.country : ""))
                || !(formik.values.pincode === (customer.user?.addresses[0]?.pincode ? customer.user?.addresses[0]?.pincode : ""))
                || !(formik.values.facebookLink === customer.facebookLink)
                || !(formik.values.instagramLink === customer.instagramLink)
                || !(formik.values.youtubeLink === customer.youtubeLink)

            ) {
                setHasChanges(true)
            } else {
                setHasChanges(false)
            }
        } else if (location === "customers") {
            if (!(formik.values.role === customer.user?.role.name)
                || !(formik.values.firstName === customer.user?.firstName)
                || !(formik.values.lastName === customer.user?.lastName)
                || !(formik.values.email === customer.user?.emailId)
                || !(formik.values.phoneNumber === customer.user?.phoneNumber)
                || !(formik.values.whatsappNumber === (customer.user?.whatsappNumber ? customer.user?.whatsappNumber : ""))
                || !(formik.values.dateOfBirth === (customer.user?.dateOfBirth ? customer.user?.dateOfBirth : ""))

                || !(formik.values.panNumber === (customer.panNumber ? customer.panNumber : ""))
                || !(formik.values.adhaarNumber === (customer.adhaarNumber?customer.adhaarNumber:""))
                || !(formik.values.name === (customer.name ? customer.name : ""))
                || !(formik.values.gstNumber === (customer.gstNumber ? customer.gstNumber : ""))

                || !(formik.values.addressLine1 === (customer.user?.addresses[0]?.addressLine1 ? customer.user?.addresses[0]?.addressLine1 : ""))
                || !(formik.values.addressLine2 === (customer.user?.addresses[0]?.addressLine2 ? customer.user?.addresses[0]?.addressLine2 : ""))
                || !(formik.values.city === (customer.user?.addresses[0]?.city ? customer.user?.addresses[0]?.city : ""))
                || !(formik.values.state === (customer.user?.addresses[0]?.state ? customer.user?.addresses[0]?.state : ""))
                || !(formik.values.country === (customer.user?.addresses[0]?.country ? customer.user?.addresses[0]?.country : ""))
                || !(formik.values.pincode === (customer.user?.addresses[0]?.pincode ? customer.user?.addresses[0]?.pincode : ""))

            ) {
                setHasChanges(true)
            } else {
                setHasChanges(false)
            }
        }
        else{
            if (!(formik.values.role === customer.user?.role.name)
                || !(formik.values.firstName === customer.user?.firstName)
                || !(formik.values.lastName === customer.user?.lastName)
                || !(formik.values.email === customer.user?.emailId)
                || !(formik.values.phoneNumber === customer.user?.phoneNumber)
                || !(formik.values.whatsappNumber === (customer.user?.whatsappNumber?customer.user?.whatsappNumber:""))
                || !(formik.values.dateOfBirth === (customer.user?.dateOfBirth?customer.user?.dateOfBirth:""))

                || !(formik.values.empId === customer.empId)
                || !(formik.values.panNumber === (customer.panNumber?customer.panNumber:""))

                || !(formik.values.addressLine1 === (customer.user?.addresses[0]?.addressLine1 ? customer.user?.addresses[0]?.addressLine1 : ""))
                || !(formik.values.addressLine2 === (customer.user?.addresses[0]?.addressLine2 ? customer.user?.addresses[0]?.addressLine2:""))
                || !(formik.values.city === (customer.user?.addresses[0]?.city ? customer.user?.addresses[0]?.city : ""))
                || !(formik.values.state === (customer.user?.addresses[0]?.state ? customer.user?.addresses[0]?.state : ""))
                || !(formik.values.country === (customer.user?.addresses[0]?.country ? customer.user?.addresses[0]?.country : ""))
                || !(formik.values.pincode === (customer.user?.addresses[0]?.pincode ? customer.user?.addresses[0]?.pincode : ""))

            ){
                setHasChanges(true)
            }else{
                setHasChanges(false)
            }
        }

    }, [customer, formik.values]);

    // useEffect(() => {
    //     const hasChanged = () => {
    //         const user = customer.user;
    //         const userAddresses = user?.addresses[0];
    //         const values = formik.values;
    //         const commonFields = [
    //             "role",
    //             "firstName",
    //             "lastName",
    //             "email",
    //             "phoneNumber",
    //             "whatsappNumber",
    //             "dateOfBirth",
    //             "panNumber",
    //             "addressLine1",
    //             "addressLine2",
    //             "city",
    //             "state",
    //             "country",
    //             "pincode"
    //         ];
    //         if (location === "vendors"){
    //             commonFields.push("name","gstNumber","facebookLink","instagramLink","youtubeLink");
    //         } else if (location === "customers"){
    //             commonFields.push("name","gstNumber");
    //         } else{
    //             commonFields.push("empId");
    //         }
    //         return commonFields.some(field => formik.values[field] !== user[field] || (userAddresses && formik.values[field] !== userAddresses[field]));
    //     };
    //
    //     setHasChanges(hasChanged());
    // }, [customer, formik.values]);

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
                    <EditCustomer
                        formik={formik}
                        hasChanges={hasChanges}
                    />
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
                    <EditCustomer formik={formik} hasChanges={hasChanges}/>
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
                    <EditCustomer formik={formik} hasChanges={hasChanges}/>
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
                    <EditCustomer formik={formik} hasChanges={hasChanges}/>
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
