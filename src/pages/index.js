import * as Yup from "yup";
import {useFormik} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useCallback, useState} from "react";
import {Seo} from "src/components/seo";
import {Layout as AuthLayout} from "../custom-components/modern-layout";
import {paths} from "src/paths";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {MuiOtpInput} from "mui-one-time-password-input";
import {GuestGuard} from "src/guards/guest-guard";

import {useAuth} from "src/hooks/use-auth";
import {useMounted} from "src/hooks/use-mounted";

import {useRouter} from "src/hooks/use-router";
import {useSearchParams} from "src/hooks/use-search-params";
import {authApi} from "src/api/auth";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import {AccessTime} from "@mui/icons-material";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Popover from "@mui/material/Popover";
import Cookies from "js-cookie";

const tabs = [
    {label: "Email", value: "Email"},
    {label: "Phone Number", value: "Phone Number", disabled: true},
];

const initialValues = {
    email: "",
    phone: "",
    code: "",
    submit: null,
};

const Page = () => {
    const isMounted = useMounted();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const returnTo = searchParams.get("returnTo");
    const {issuer, signIn} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentTab, setCurrentTab] = useState("Email");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [privacyPopoverOpen, setPrivacyPopoverOpen] = useState(false);
    const handleTabsChange = useCallback((event, value) => {
        setCurrentTab(value);
        if (value === "Email") {
            formik.setFieldValue("phone", "");
        } else formik.setFieldValue("email", "");
    }, []);
    const validationSchema = Yup.object({
        email:
            currentTab === "Email"
                ? Yup.string()
                    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must be a valid email")
                    .required("Email is required")
                : Yup.string(),
        phone:
            currentTab === "Phone Number"
                ? Yup.string().max(255).required("Phone is required")
                : Yup.string(),
    });
    const handleEditClick = () => {
        clearInterval(interval);
        setIndex(0)
        setResendTimer(30)
        setIsSubmitting(false);
    };

    const onSubmitEmail = async (values, helpers) => {

        try {
            values.code = "";
            disable()
            if (values.email) {
                await authApi.requestOtp(values.email, null);
            } else if (values.phone) {
              await authApi.requestOtp(null, values.phone);
            }

            setIsSubmitting(true);
            startResendTimer()

        } catch (err) {

            if (isMounted()) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    };
    const onSubmitCode = async (values, helpers) => {
        try {
            if (values.email) {
                await signIn(
                    {
                        email: values.email,
                        phoneNumber: null,
                    },
                    values.code
                );
            } else if (values.phone) {
                await signIn(
                    {
                        email: null,
                        phoneNumber: values.phone,
                    },
                    values.code
                );
            }

            if (isMounted()) {
                    router.push(returnTo || paths.dashboard.index);

            }
        } catch (err) {

            if (isMounted()) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: isSubmitting ? onSubmitCode : onSubmitEmail,
    });

    const disable = () => {
        setButtonDisabled(true);

        // Simulate some asynchronous operation (e.g., API call)
        setTimeout(() => {
            // Enable the button after 2 seconds
            setButtonDisabled(false);
        }, 5000);
    };
    const [otpResend, setOtpResend] = useState(true);
    const [resendTimer, setResendTimer] = useState(30);
    const formattedTime = `${Math.floor(resendTimer / 60).toString().padStart(2, '0')}:${(resendTimer % 60).toString().padStart(2, '0')}`;
    const [timer, setTimer] = useState([60, 300]);
    const [index, setIndex] = useState(0);
    let interval;
    const startResendTimer = () => {
        setOtpResend(false);

        interval = setInterval(() => {
            setResendTimer(prev => prev - 1);
        }, 1000);
        setTimeout(() => {
            clearInterval(interval);
            setOtpResend(true);
            setResendTimer(timer[index]);
            setIndex(index + 1)
        }, resendTimer * 1000);
        // 60 seconds in milliseconds
    };


    const renderOtpForm = () => {
        return (
            <>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl error={!!(formik.touched.code && formik.errors.code)}>
                        <TextField
                            autoFocus
                            error={!!(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email Address"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            disabled
                            sx={{mb: 2}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            onClick={handleEditClick}>
                                            <Typography>Edit</Typography>
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}

                        />
                        <Typography sx={{mb: 1, display: "flex"}}>Please enter 6-digit OTP<Typography
                            sx={{color: "red"}}>*</Typography></Typography>
                        <MuiOtpInput
                            length={6}
                            onBlur={() => formik.handleBlur("code")}
                            onChange={(value) => formik.setFieldValue("code", value)}
                            onFocus={() => formik.setFieldTouched("code")}
                            sx={{
                                "& .MuiFilledInput-input": {
                                    p: "14px",
                                },
                            }}
                            value={formik.values.code}
                            onKeyDown={(e) => {
                                const allowedKeys = /^[0-9]*$/;
                                if (!(allowedKeys.test(e.key) || e.key === 'Backspace' || e.key === 'Enter')) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {!!(formik.touched.code && formik.errors.code) && (
                            <FormHelperText>{formik.errors.code}</FormHelperText>
                        )}
                    </FormControl>
                    <Grid sx={{mt: 1, display: "flex", justifyContent: "space-between"}}>
                        <Grid sx={{display: "flex"}}> <Typography>Did not receive the OTP?
                            {otpResend ? (
                                <Button disabled={index > 2} onClick={() => onSubmitEmail(formik.values)}>Resend
                                    OTP</Button>
                            ) : <Button disabled={true}>Resend OTP</Button>}</Typography>
                        </Grid>
                        {!otpResend && (
                            <Typography sx={{mt: 1, color: "#CC5500", display: "flex"}}><SvgIcon>
                                <AccessTime/>
                            </SvgIcon>{formattedTime}</Typography>
                        )}
                    </Grid>
                    <Button
                        fullWidth
                        size="large"
                        sx={{mt: 1}}
                        type="submit"
                        variant="contained"
                    >
                        Verify
                    </Button>
                </form>
            </>
        );
    };


    const [privacyAnchorEl, setPrivacyAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsPopoverOpen(true); // Open the popover
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsPopoverOpen(false); // Close the popover
    };

// Add this function to handle the click event for Privacy Policy
    const handlePrivacyClick = (event) => {
        setPrivacyAnchorEl(event.currentTarget);
        setPrivacyPopoverOpen(true);
    };

    const handlePrivacyClose = () => {
        setPrivacyAnchorEl(null);
        setPrivacyPopoverOpen(false); // Close the popover
    };


// Create a modal component to display the terms and conditions
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const renderLoginForm = () => (


        <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                {currentTab === "Email" ? (

                        <TextField
                            autoFocus
                            error={!!(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email Address"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                        />)
                    : (
                        <TextField
                            disabled={true}
                            autoFocus
                            error={!!(formik.touched.phone && formik.errors.phone)}
                            fullWidth
                            helperText={formik.touched.phone && formik.errors.phone}
                            label="Phone Number"
                            name="phone"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phone}
                        />
                    )}
                {/* <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
            /> */}
            </Stack>
            <Button
                fullWidth
                sx={{mt: 3}}
                size="large"
                type="submit"
                variant="contained"
                disabled={buttonDisabled}
            >
                Login
            </Button>
            <Box sx={{mt: 3}}>

                <Typography color="text.secondary" variant="body2">
                    I have read the <Link aria-describedby={id} type="button" onClick={handleClick}
                                          style={{color: "blue", cursor: "pointer"}} // Add cursor style here
                >Terms
                    and Conditions</Link>{" "}
                    & <Link
                    aria-describedby={id}
                    type="button"
                    onClick={handlePrivacyClick}
                    style={{color: "blue", cursor: "pointer"}} // Add cursor style here

                >Privacy Policy</Link>
                    &nbsp;
                    {/* <Link
                  component={RouterLink}
                  href={paths.auth.jwt.register}
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link> */}
                </Typography>
            </Box>
        </form>

    );

    return (
        <>
            {isPopoverOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backdropFilter: "blur(8px)", // Adjust the blur amount as needed
                        zIndex: 999, // Adjust the z-index to be higher than the popover
                    }}
                ></div>
            )}
            <Stack>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    sx={{
                        zIndex: "1000",
                        width: "90%",
                        height: "70%",
                        marginLeft: "auto",
                        marginRight: "15%",
                        marginTop: "-7%",
                        marginBottom: "auto"

                    }}
                >
                    <div style={{padding: 12}}>
                        {/* Add your terms and conditions content here */}
                        <Button style={{float: 'right'}} onClick={handleClose}>
                            <SvgIcon>
                                <CloseIcon/>
                            </SvgIcon>
                        </Button>
                        <Typography variant="h4" textAlign="center" sx={{
                            color: "#4338CA",
                            fontSize: "2.5rem",
                            fontWeight: "400",
                            letterSpacing: "2px"
                        }}>
                            Terms and Conditions
                        </Typography>
                        <Typography variant="body1">
                            Introduction
                            These Website Standard Terms and Conditions written on this webpage shall manage your use of
                            our website, Webiste Name accessible at Website.com.

                            These Terms will be applied fully and affect to your use of this Website. By using this
                            Website, you agreed to accept all terms and conditions written in here. You must not use
                            this Website if you disagree with any of these Website Standard Terms and Conditions.

                            Minors or people below 18 years old are not allowed to use this Website.

                            Intellectual Property Rights
                            Other than the content you own, under these Terms, Company Name and/or its licensors own all
                            the intellectual property rights and materials contained in this Website.

                            You are granted limited license only for purposes of viewing the material contained on this
                            Website.

                            Restrictions
                            You are specifically restricted from all of the following:

                            publishing any Website material in any other media;
                            selling, sublicensing and/or otherwise commercializing any Website material;
                            publicly performing and/or showing any Website material;
                            using this Website in any way that is or may be damaging to this Website;
                            using this Website in any way that impacts user access to this Website;
                            using this Website contrary to applicable laws and regulations, or in any way may cause harm
                            to the Website, or to any person or business entity;
                            engaging in any data mining, data harvesting, data extracting or any other similar activity
                            in relation to this Website;
                            using this Website to engage in any advertising or marketing.
                            Certain areas of this Website are restricted from being access by you and Company Name may
                            further restrict access by you to any areas of this Website, at any time, in absolute
                            discretion. Any user ID and password you may have for this Website are confidential and you
                            must maintain confidentiality as well.

                            Your Content
                            In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video
                            text, images or other material you choose to display on this Website. By displaying Your
                            Content, you grant Company Name a non-exclusive, worldwide irrevocable, sub licensable
                            license to use, reproduce, adapt, publish, translate and distribute it in any and all media.

                            Your Content must be your own and must not be invading any rights. Company Name reserves the
                            right to remove any of Your Content from this Website at any time without notice.

                            No warranties
                            This Website is provided “as is,” with all faults, and Company Name express no
                            representations or warranties, of any kind related to this Website or the materials
                            contained on this Website. Also, nothing contained on this Website shall be interpreted as
                            advising you.

                            Limitation of liability
                            In no event shall Company Name, nor any of its officers, directors and employees, shall be
                            held liable for anything arising out of or in any way connected with your use of this
                            Website whether such liability is under contract. Company Name, including its officers,
                            directors and employees shall not be held liable for any indirect, consequential or special
                            liability arising out of or in any way related to your use of this Website
                        </Typography>
                    </div>
                </Popover>
            </Stack>


            {privacyPopoverOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backdropFilter: "blur(8px)", // Adjust the blur amount as needed
                        zIndex: 999, // Adjust the z-index to be higher than the popover
                    }}
                ></div>
            )}
            <Stack>
                <Popover
                    id={id}
                    open={Boolean(privacyAnchorEl)}
                    anchorEl={privacyAnchorEl}
                    onClose={handlePrivacyClose}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    sx={{
                        zIndex: "1000",
                        width: "90%",
                        height: "70%",
                        marginLeft: "auto",
                        marginRight: "15%",
                        marginTop: "-7%",
                        marginBottom: "auto"

                    }}
                >
                    <div style={{padding: 12}}>
                        <Button style={{float: 'right'}}
                                onClick={handlePrivacyClose}><SvgIcon>
                            <CloseIcon/>
                        </SvgIcon></Button>
                        <Typography variant="h4" textAlign="center"
                                    sx={{
                                        color: "#4338CA",
                                        fontSize: "2.5rem",
                                        fontWeight: "400",
                                        letterSpacing: "2px",
                                    }}> Privacy Policy </Typography>
                        <Typography variant="body1">
                            Introduction
                            These Website Standard Terms and Conditions written on this webpage shall manage your use of
                            our website, Webiste Name accessible at Website.com.

                            These Terms will be applied fully and affect to your use of this Website. By using this
                            Website, you agreed to accept all terms and conditions written in here. You must not use
                            this Website if you disagree with any of these Website Standard Terms and Conditions.

                            Minors or people below 18 years old are not allowed to use this Website.

                            Intellectual Property Rights
                            Other than the content you own, under these Terms, Company Name and/or its licensors own all
                            the intellectual property rights and materials contained in this Website.

                            You are granted limited license only for purposes of viewing the material contained on this
                            Website.

                            Restrictions
                            You are specifically restricted from all of the following:

                            publishing any Website material in any other media;
                            selling, sublicensing and/or otherwise commercializing any Website material;
                            publicly performing and/or showing any Website material;
                            using this Website in any way that is or may be damaging to this Website;
                            using this Website in any way that impacts user access to this Website;
                            using this Website contrary to applicable laws and regulations, or in any way may cause harm
                            to the Website, or to any person or business entity;
                            engaging in any data mining, data harvesting, data extracting or any other similar activity
                            in relation to this Website;
                            using this Website to engage in any advertising or marketing.
                            Certain areas of this Website are restricted from being access by you and Company Name may
                            further restrict access by you to any areas of this Website, at any time, in absolute
                            discretion. Any user ID and password you may have for this Website are confidential and you
                            must maintain confidentiality as well.

                            Your Content
                            In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video
                            text, images or other material you choose to display on this Website. By displaying Your
                            Content, you grant Company Name a non-exclusive, worldwide irrevocable, sub licensable
                            license to use, reproduce, adapt, publish, translate and distribute it in any and all media.

                            Your Content must be your own and must not be invading any rights. Company Name reserves the
                            right to remove any of Your Content from this Website at any time without notice.

                            No warranties
                            This Website is provided “as is,” with all faults, and Company Name express no
                            representations or warranties, of any kind related to this Website or the materials
                            contained on this Website. Also, nothing contained on this Website shall be interpreted as
                            advising you.

                            Limitation of liability
                            In no event shall Company Name, nor any of its officers, directors and employees, shall be
                            held liable for anything arising out of or in any way connected with your use of this
                            Website whether such liability is under contract. Company Name, including its officers,
                            directors and employees shall not be held liable for any indirect, consequential or special
                            liability arising out of or in any way related to your use of this Website
                        </Typography>
                    </div>
                </Popover>
            </Stack>

            {!isSubmitting ? <Seo title="Login"/> : <Seo title="OTP Verification"/>}
            <div>
                <Box sx={{mb: 4}}>
                </Box>
                <Stack sx={{mb: 4}} spacing={1}>
                    {!isSubmitting ?
                        <Grid><Typography variant="h3">Log in</Typography> <Typography variant="body2">Please enter your
                            email address, we will send you an OTP.</Typography> </Grid>
                        :
                        <Grid> <Typography variant="h3">OTP Verification</Typography><Typography variant="body2">We have
                            sent an OTP to your email address.</Typography> </Grid>

                    }

                    <div style={{width: "100%"}}>
                        <Tabs
                            indicatorColor="primary"
                            onChange={handleTabsChange}
                            scrollButtons="auto"
                            sx={{mt: 3, width: "100%"}}
                            textColor="primary"
                            value={currentTab}
                            variant="fullWidth"
                            centered={true}
                        >
                            {tabs.map((tab) => (
                                <Tab key={tab.value} label={tab.label} value={tab.value} disabled={tab.disabled}/>
                            ))}
                        </Tabs>
                        <Divider/>
                    </div>
                </Stack>
                {isSubmitting ? renderOtpForm() : renderLoginForm()}
            </div>
        </>
    );
};

Page.getLayout = (page) => (
    <GuestGuard>
        <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
);

export default Page;
