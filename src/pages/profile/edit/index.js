// const Page =()=>{
//     return (
//         <div>Hello</div>
//     )
// }
// export default Page();

import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {alpha} from "@mui/system/colorManipulator";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, {useEffect, useRef, useState} from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import {PropertyListItem} from "@/components/property-list-item-custom";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Container from "@mui/material/Container";
import {useMockedUser} from "@/hooks/use-mocked-user";
import Cookies from "js-cookie";
import {endpoints} from "@/endpoints";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {VendorBasic} from "@/custom-components/users/forms/VendorBasic";
import {useFormik} from "formik";
import {filePatch, getSubmitHandlerEdit} from "@/utils/util";
import {useRouter} from "next/router";
import MapComponent from "@/custom-components/users/forms/EventClickLatLng";
import {LoadScript} from "@react-google-maps/api";
import {EditCustomer} from "@/custom-components/users/forms/SaveCustomer";
import * as Yup from "yup";
import toast from "react-hot-toast";

const UserProfileEdit = ({employee}) => {
    const router = useRouter();
    let role = Cookies.get("role")
    const [hasChanges, setHasChanges] = useState(false);
    const fileInputRef = useRef(null);
    const [profilePath, setProfilePath] = useState(employee.user?.profilePic?.filePath);
    const handleImageUpload = () => {
        // Trigger a click event on the file input element
        fileInputRef.current.click();
    };

    const handleFileSelect = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const data = await filePatch(employee.user.profilePic?.id, selectedFile)
            if (data !== null){
                setProfilePath(data.filePath)
                toast.success("Profile Uploaded Successfully")
            }
        }
    };

    useEffect(() => {

    }, [profilePath]);

    const formik = useFormik({
        initialValues: {
            // role: employee.user?.role.name ? employee.user?.role.name : location === "vendors" ? "VENDOR" : location === "customers" ? "BUSINESS CUSTOMER" : location === "employees" ? "ADMIN" : "",
            role: employee.user?.role.name || "",
            firstName: employee.user?.firstName || "",
            lastName: employee.user?.lastName || "",
            name: employee.name || "",
            email: employee.user?.emailId || "",
            phoneNumber: employee.user?.phoneNumber || "",
            whatsappNumber: employee.user?.whatsappNumber || "",
            dateOfBirth: employee.user?.dateOfBirth || "",
            panNumber: employee.panNumber || "",
            adhaarNumber: employee.adhaarNumber || "",
            gstNumber: employee.gstNumber || "",
            isBusinessCustomer: employee.isBusinessCustomer || false,
            empId: employee.empId || "",
            addressLine1: employee.user?.addresses[0]?.addressLine1 || "",
            addressLine2: employee.user?.addresses[0]?.addressLine2 || "",
            city: employee.user?.addresses[0]?.city || "",
            state: employee.user?.addresses[0]?.state || "",
            country: employee.user?.addresses[0]?.country || "",
            latitudes: employee.user?.addresses[0]?.latitudes || "",
            longitudes: employee.user?.addresses[0]?.longitudes || "",
            pincode: employee.user?.addresses[0]?.pincode || "",
            termsAndConditions: "",
            shortDescription: "",
            longDescription: employee.longDescription || "",
            facebookLink: employee.facebookLink || "",
            instagramLink: employee.instagramLink || "",
            youtubeLink: employee.youtubeLink || "",
            submit: null,
        },

        validationSchema:
            role === "vendors" ?
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
                }) : role === "customers" ? Yup.object({
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
        if (role === "vendors") {
            if (!(formik.values.role === employee.user?.role.name)
                || !(formik.values.firstName === employee.user?.firstName)
                || !(formik.values.lastName === employee.user?.lastName)
                || !(formik.values.email === employee.user?.emailId)
                || !(formik.values.phoneNumber === employee.user?.phoneNumber)
                || !(formik.values.whatsappNumber === (employee.user?.whatsappNumber ? employee.user?.whatsappNumber : ""))
                || !(formik.values.dateOfBirth === (employee.user?.dateOfBirth ? employee.user?.dateOfBirth : ""))

                || !(formik.values.panNumber === (employee.panNumber ? employee.panNumber : ""))
                || !(formik.values.name === (employee.name ? employee.name : ""))
                || !(formik.values.gstNumber === (employee.gstNumber ? employee.gstNumber : ""))

                || !(formik.values.addressLine1 === (employee.user?.addresses[0]?.addressLine1 ? employee.user?.addresses[0]?.addressLine1 : ""))
                || !(formik.values.addressLine2 === (employee.user?.addresses[0]?.addressLine2 ? employee.user?.addresses[0]?.addressLine2 : ""))
                || !(formik.values.city === (employee.user?.addresses[0]?.city ? employee.user?.addresses[0]?.city : ""))
                || !(formik.values.state === (employee.user?.addresses[0]?.state ? employee.user?.addresses[0]?.state : ""))
                || !(formik.values.country === (employee.user?.addresses[0]?.country ? employee.user?.addresses[0]?.country : ""))
                || !(formik.values.pincode === (employee.user?.addresses[0]?.pincode ? employee.user?.addresses[0]?.pincode : ""))
                || !(formik.values.facebookLink === employee.facebookLink)
                || !(formik.values.instagramLink === employee.instagramLink)
                || !(formik.values.youtubeLink === employee.youtubeLink)

            ) {
                setHasChanges(true)
            } else {
                setHasChanges(false)
            }
        }
        else{
            if (!(formik.values.firstName === employee.user?.firstName)
                || !(formik.values.lastName === employee.user?.lastName)
                || !(formik.values.email === employee.user?.emailId)
                || !(formik.values.phoneNumber === employee.user?.phoneNumber)
                || !(formik.values.whatsappNumber === (employee.user?.whatsappNumber?employee.user?.whatsappNumber:""))
                || !(formik.values.dateOfBirth === (employee.user?.dateOfBirth?employee.user?.dateOfBirth:""))

                || !(formik.values.addressLine1 === (employee.user?.addresses[0]?.addressLine1 ? employee.user?.addresses[0]?.addressLine1 : ""))
                || !(formik.values.addressLine2 === (employee.user?.addresses[0]?.addressLine2 ? employee.user?.addresses[0]?.addressLine2:""))
                || !(formik.values.city === (employee.user?.addresses[0]?.city ? employee.user?.addresses[0]?.city : ""))
                || !(formik.values.state === (employee.user?.addresses[0]?.state ? employee.user?.addresses[0]?.state : ""))
                || !(formik.values.country === (employee.user?.addresses[0]?.country ? employee.user?.addresses[0]?.country : ""))
                || !(formik.values.pincode === (employee.user?.addresses[0]?.pincode ? employee.user?.addresses[0]?.pincode : ""))

            ){
                setHasChanges(true)
            }else{
                setHasChanges(false)
            }
        }

    }, [employee, formik.values]);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,

                }}
            >
                <Box
                    sx={{
                        background: "linear-gradient(90deg, #18305D 0%, #6164F8 121.84%)",
                        py: '50px'
                    }}
                ></Box>
                <Stack
                    display="flex"
                    // direction="row"
                    flexDirection={['column', 'row']} // Column layout for small screens, row layout for larger screens
                    sx={{
                        boxShadow: '0 3px 10px rgb(0 0 0 / 0.3)',
                        '@media (max-width: 500px)': {
                            //     height: 'auto',
                            //     flexDirection: 'column',
                            //     width: "auto"
                        },
                    }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{
                            height: "100%",
                            marginTop: ["0", "-5%"],
                            textAlign: ["center", "left"],
                        }}
                    >
                        <Box
                            sx={{
                                borderColor: 'neutral.300',
                                borderRadius: '50%',
                                borderStyle: 'dashed',
                                borderWidth: 1,
                                p: '4px',
                                marginLeft: ['2%', '0'],
                                marginBottom: ["10%", "0"]
                            }}
                        >
                            <Box
                                sx={{
                                    borderRadius: '50%',
                                    height: '100%',
                                    width: '100%',
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        backgroundColor: (theme) => alpha(theme.palette.neutral[700], 0.5),
                                        borderRadius: '50%',
                                        color: 'common.white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        height: '100%',
                                        width: '100%',
                                        justifyContent: 'center',
                                        left: 0,
                                        opacity: 0,
                                        position: 'absolute',
                                        top: 0,
                                        zIndex: 1,
                                        '&:hover': {
                                            opacity: 1
                                        }
                                    }}
                                >
                                    <Stack
                                        alignItems="center"
                                        direction="row"
                                        spacing={1}
                                        onClick={handleImageUpload}
                                    >
                                        <SvgIcon color="inherit">
                                            <Camera01Icon/>
                                        </SvgIcon>
                                        <Typography
                                            color="inherit"
                                            variant="subtitle2"
                                            sx={{fontWeight: 700}}
                                        >
                                            Select
                                        </Typography>
                                    </Stack>
                                </Box>
                                <Avatar
                                    sx={{
                                        height: 180,
                                        width: 180,
                                        cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                                    }}
                                    src={profilePath}
                                >
                                    <SvgIcon>
                                        <User01Icon/>
                                    </SvgIcon>
                                </Avatar>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />
                            </Box>
                        </Box>
                    </Stack>

                </Stack>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8,
                    }}
                >
                    <Container maxWidth="lg">
                        <Stack spacing={4}>
                            {/*personal info*/}
                            <VendorBasic formik={formik}/>
                            <Card>
                                <CardHeader title={"Employee Details"} />
                                <CardContent>
                                <Grid container spacing={6} xs={12} md={7}>
                                    <Grid item md={5}>
                                        <Stack spacing={3}>
                                            <PropertyListItem
                                                label="Employee ID"
                                                value={employee?.empId}
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item md={5}>
                                        <Stack spacing={3}>
                                            <PropertyListItem
                                                label="Date of Join"
                                                value={new Date(employee?.createdAt).toLocaleDateString(undefined, {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item md={5}>
                                        <Stack spacing={3}>
                                            <PropertyListItem
                                                label="PAN Number"
                                                value={employee?.panNumber}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                                </CardContent>
                            </Card>
                            {role === "VENDOR" &&
                                <Box sx={{mt: '20px'}}>
                                    <Card sx={{marginTop: ["0", "5%"], margin: ["auto", "8%"]}}>
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid xs={12} md={3}>
                                                    <Typography variant="h6" sx={{display: "flex"}}>Description</Typography>
                                                </Grid>
                                                <Grid container spacing={6} xs={12} md={7}>
                                                    <Grid>
                                                        <Stack spacing={3}>
                                                            <PropertyListItem
                                                                label=""
                                                                // value={category?.name}
                                                                value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic....Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic"
                                                            />
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Box>
                            }

                            <LoadScript
                                googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_KEY}
                                libraries={["places"]}
                            > <MapComponent formik={formik}/>
                            </LoadScript>

                            <EditCustomer
                                formik={formik}
                                hasChanges={hasChanges}
                                profileId = {employee.id}
                            />
                        </Stack>
                    </Container>
                </Box>


            </Box>
        </>
    )
}

export const getServerSideProps = async (context) => {
    let role = context.req.cookies["role"]
    let id = context.req.cookies["id"]
    let pathName
    role === "VENDOR" ? pathName = "vendors" : pathName = "employees"
    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.userManagement[pathName].index+
        "/" +id,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        return {
            props: {
                employee: {},
                address: {}
            },
        };
    }
    const {data} = await res.json();
    // console.log(res, data)
    return {
        props: {
            employee: data[0],
        },
    };
};

UserProfileEdit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default UserProfileEdit;