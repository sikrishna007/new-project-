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
import {Layout as AuthLayout} from "../../custom-components/modern-layout";
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
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

const tabs = [
    {label: "Email", value: "Email"},
    {label: "Phone Number", value: "Phone Number"},
];

const initialValues = {
    email: "",
    phone: "",
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
    const handleTabsChange = useCallback((event, value) => {
        setCurrentTab(value);
        // console.log(value);
        if (value === "Email") {
            formik.setFieldValue("phone", "");
        } else formik.setFieldValue("email", "");
    }, []);
    const validationSchema = Yup.object({
        email:
            currentTab == "Email"
                ? Yup.string()
                    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Must be a valid email")
                    .required("Email is required")
                : Yup.string(),
        phone:
            currentTab == "Phone Number"
                ? Yup.string().max(255).required("Phone is required")
                : Yup.string(),
    });
    const handleEditClick = () => {
        setIsSubmitting(false);
    };

    const onSubmitEmail = async (values, helpers) => {

        try {
            values.code = "";
            // console.log(values);
            disable()
            // await signIn(values.email, null);
            let response;
            if (values.email) {
                response = await authApi.requestOtp(values.email, null);
            } else if (values.phone) {
                response = await authApi.requestOtp(null, values.phone);
            }

            setIsSubmitting(true);
            startResendTimer()
            // if (isMounted()) {
            //   router.push(returnTo || paths.dashboard.index);
            // }
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
            // return console.log(values)
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

    const [otpResend, setOtpResend] = useState(true);
    const [resendTimer, setResendTimer] = useState(30);
    const formattedTime = `${resendTimer.toString().padStart(2, '0')}`;

    const disable = () => {
        setButtonDisabled(true);

        // Simulate some asynchronous operation (e.g., API call)
        setTimeout(() => {
            // Enable the button after 2 seconds
            setButtonDisabled(false);
        }, 5000);
    };
    const startResendTimer = () => {
        setOtpResend(false);

        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            setOtpResend(true);
            setResendTimer(30); // Reset timer
        }, 30000); // 60 seconds in milliseconds
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
                                <Button onClick={() => onSubmitEmail(formik.values)}>Resend OTP</Button>
                            ) : <Button disabled={true}>Resend OTP</Button>}</Typography>
                        </Grid>
                        {!otpResend && (
                            <Typography sx={{mt: 1, color: "#CC5500", display: "flex"}}><SvgIcon>
                                <AccessTime/>
                            </SvgIcon> 00:{formattedTime}</Typography>
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

    const [anchorEl, setAnchorEl] = useState(null);

    const [privacyAnchorEl, setPrivacyAnchorEl] = useState(null);

// Add this function to handle the click event for Privacy Policy
    const handlePrivacyClick = (event) => {
        setAnchorEl(null)
        setPrivacyAnchorEl(privacyAnchorEl ? null : event.currentTarget);
    };
// Add this function to handle the click event
    const handleTermsClick = (event) => {
        setPrivacyAnchorEl(null)
        setAnchorEl(anchorEl ? null : event.currentTarget);
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
                    I have read the <Link aria-describedby={id} type="button" onClick={handleTermsClick}
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
            <Stack
                sx={{
                    marginRight: "50%"
                }}
            >
                <Popper
                    id={id}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    placement="top"

                >
                    <Paper sx={{padding: 2, marginTop: "40%", marginLeft: "5%", marginRight: "45%"}}>
                        {/* Add your terms and conditions content here */}
                        <Button style={{float: 'right'}} onClick={() => setAnchorEl(null)}><SvgIcon>
                            <CloseIcon/>
                        </SvgIcon></Button>
                        <Typography variant="h5" textAlign="center" sx={{marginTop: "3%"}}> Terms and
                            Conditions</Typography>
                        <Typography variant="body1">
                            1. Introduction
                            These Terms and Conditions govern your use of our website. By using our website, you agree
                            to these Terms and Conditions in full.
                        </Typography><Typography variant="body1">
                        2. Intellectual Property Rights
                        Unless otherwise stated, we own the intellectual property rights in the website and material on
                        the website.
                    </Typography><Typography variant="body1">
                        3. Restrictions
                        You are expressly and emphatically restricted from all of the following:
                        - Publishing any website material in any media.
                        - Using our website in any way that is, or may be, damaging to the website.
                    </Typography><Typography variant="body1">
                        4. No Warranties
                        This website is provided as is without any representations or warranties.
                    </Typography><Typography variant="body1">
                        5. Limitation of Liability
                        We will not be liable to you in respect of any losses arising out of any event.
                    </Typography><Typography variant="body1">
                        6. Severability
                        If a provision of these terms and conditions is determined by any court or other competent
                        authority to be unlawful and/or unenforceable, the other provisions will continue in effect.
                    </Typography><Typography variant="body1">
                        7. Variation
                        We may revise these terms and conditions from time to time.
                    </Typography><Typography variant="body1">
                        8. Entire Agreement
                        These terms and conditions constitute the entire agreement.
                    </Typography><Typography variant="body1">
                        9. Law and Jurisdiction
                        These terms and conditions will be governed by and construed in accordance with the laws.
                    </Typography><Typography variant="body1">
                        10. Contact Us
                        If you have any questions about these Terms and Conditions, please contact us.
                    </Typography>
                    </Paper>
                </Popper>
            </Stack>
            <Stack>
                <Popper
                    id={id}
                    open={Boolean(privacyAnchorEl)}
                    anchorEl={privacyAnchorEl}
                    placement="top"
                >
                    <Paper sx={{padding: 2, marginTop: "30%", marginLeft: "5%", marginRight: "45%"}}>
                        {/* Add your privacy policy content here */}
                        <Button style={{float: 'right'}} onClick={() => setPrivacyAnchorEl(null)}><SvgIcon>
                            <CloseIcon/>
                        </SvgIcon></Button>
                        <Typography variant="h5" textAlign="center" sx={{marginTop: "3%"}}> Privacy Policy </Typography>
                        <Typography variant="body1">

                            1. Introduction
                            This Privacy Policy describes how we collect, use, and disclose information that we obtain
                            about visitors to our website.
                        </Typography><Typography variant="body1">
                        2. Information We Collect
                        We may collect the following types of information:
                        - Personal Information: Name, email address, phone number.
                        - Non-Personal Information: Browser type, IP address, operating system.
                    </Typography><Typography variant="body1">
                        3. How We Use Your Information
                        We may use your information for the following purposes:
                        - To provide and maintain our services.
                        - To notify you about changes to our website.
                    </Typography><Typography variant="body1">
                        4. Information Sharing and Disclosure
                        We may share your information with trusted third parties for the purposes outlined in this
                        policy.
                    </Typography><Typography variant="body1">
                        5. Security
                        We use reasonable measures to protect the information we collect.
                    </Typography><Typography variant="body1">
                        6. Your Choices
                        You can opt out of receiving promotional emails.
                    </Typography><Typography variant="body1">
                        7. Changes to this Privacy Policy
                        We may update this policy to reflect changes to our information practices.
                    </Typography><Typography variant="body1">
                        8. Contact Us
                        If you have any questions about this Privacy Policy, please contact us.
                    </Typography>
                    </Paper>
                </Popper>
            </Stack>
            {!isSubmitting ? <Seo title="Login"/> : <Seo title="OTP Verification"/>}
            <div>
                <Box sx={{mb: 4}}>

                    {/* <Link


            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.index}
            sx={{
              alignItems: 'center',
              display: 'inline-flex'
            }}
            underline="hover"
          >
            <SvgIcon sx={{ mr: 1 }}>
              <ArrowLeftIcon />
            </SvgIcon>
            <Typography variant="subtitle2">
              Dashboard
            </Typography>
          </Link> */}
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
                                <Tab key={tab.value} label={tab.label} value={tab.value}/>
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
