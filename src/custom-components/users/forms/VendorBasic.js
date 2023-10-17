import {useCallback, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import Typography from "@mui/material/Typography";

export const VendorBasic = (props) => {
    let {customer, formik, ...other} = props;
    customer = {};
    const handleStartDateChange = useCallback(
        (date) => {
            const formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
            // Update the formik value for dateOfBirth
            formik.setFieldValue('dateOfBirth', formattedDate);
        },
        [formik]
    );

    const [phoneNumberCount, setPhoneNumberCount] = useState(0)
    const [whatsappNumberCount, setWhatsappNumberCount] = useState(0)
    return (
        <Card>
            <CardHeader title="Personal Information"/>
            <CardContent sx={{pt: 0}}>
                <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                        <TextField
                            error={!!(formik.touched.firstName && formik.errors.firstName)}
                            fullWidth
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            label={
                                <span>
                                    First name&nbsp;
                                    <span style={{color: "red"}}>*</span>
                                </span>
                            }
                            name="firstName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />

                    </Grid>
                    <Grid xs={12} md={6}>
                        {/* <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                
                value={formik.values.email}
              /> */}
                        <TextField
                            error={!!(formik.touched.lastName && formik.errors.lastName)}
                            fullWidth
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            // label="Last name"
                            label={
                                <span>
                                    Last name&nbsp;
                                    <span style={{color: "red"}}>*</span>
                                </span>
                            }
                            name="lastName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            error={!!(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            // label="Email address"
                            label={
                                <span>
                                    Email&nbsp;
                                    <span style={{color: "red"}}>*</span>
                                </span>
                            }
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            error={
                                !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                            }
                            fullWidth
                            helperText={
                                formik.touched.phoneNumber && formik.errors.phoneNumber
                            }
                            // label="Phone number"
                            label={
                                <span>
                                    Phone&nbsp;
                                    <span style={{color: "red"}}>*</span>
                                </span>
                            }
                            name="phoneNumber"
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setPhoneNumberCount(e.target.value.length)
                            }}
                            value={formik.values.phoneNumber}
                            inputProps={{
                                maxLength: 10
                            }}
                        />
                        <Typography variant="body2" color="textSecondary"
                                    sx={{
                                        display:"flex",
                                        justifyContent:"flex-end",
                                        marginTop:1
                                    }}
                        >
                            {phoneNumberCount}/10
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            error={
                                !!(
                                    formik.touched.whatsappNumber &&
                                    formik.errors.whatsappNumber
                                )
                            }
                            fullWidth
                            helperText={
                                formik.touched.whatsappNumber && formik.errors.whatsappNumber
                            }
                            label="WhatsApp Number"
                            name="whatsappNumber"
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setWhatsappNumberCount(e.target.value.length)
                            }}
                            value={formik.values.whatsappNumber}
                            inputProps={{
                                maxLength: 10
                            }}
                        />
                        <Typography variant="body2" color="textSecondary"
                                    sx={{
                                        display:"flex",
                                        justifyContent:"flex-end",
                                        marginTop:1
                                    }}
                        >
                            {whatsappNumberCount}/10
                        </Typography>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <DesktopDatePicker
                            label="Date Of Birth"
                            name="dateOfBirth"
                            defaultValue={null}
                            format="yyyy-MM-dd"
                            sx={{width: "100%"}}
                            // value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </Grid>
                </Grid>
                {/* <div>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 2, mt:2 }}
                      variant="subtitle2"
                    >
                      Terms and Conditions
                    </Typography>
                    <QuillEditor
                      onChange={(value) => {
                        formik.setFieldValue("terms_and_conditions", value);
                      }}
                      placeholder="Write something"
                      sx={{ height: 400 }}
                      value={formik.values.terms_and_conditions}
                    />
                    {!!(
                      formik.touched.terms_and_conditions && formik.errors.terms_and_conditions
                    ) && (
                      <Box sx={{ mt: 2 }}>
                        <FormHelperText error>
                          {formik.errors.terms_and_conditions}
                        </FormHelperText>
                      </Box>
                    )}
                  </div> */}
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
            Save
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
    );
};

// Vendor.propTypes = {
//   customer: PropTypes.object.isRequired
// };
