import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

export const Vendor = (props) => {
    let {submit, customer, formik, ...other} = props;

    return (
        <Card sx={{mt: "3%", mb: "3%"}}>
            <CardHeader title="Business Information"/>
            <CardContent sx={{pt: 0}}>
                <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                        <TextField
                            error={!!(formik.touched.name && formik.errors.name)}
                            fullWidth
                            helperText={formik.touched.name && formik.errors.name}
                            label={
                                <span>
                                    Business name&nbsp;
                                    <span style={{color: "red"}}>*</span>
                                </span>
                            }
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <TextField
                            error={!!(formik.touched.gstNumber && formik.errors.gstNumber)}
                            fullWidth
                            helperText={formik.touched.gstNumber && formik.errors.gstNumber}
                            label="GST Number"
                            name="gstNumber"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.gstNumber}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            error={!!(formik.touched.panNumber && formik.errors.panNumber)}
                            fullWidth
                            helperText={formik.touched.panNumber && formik.errors.panNumber}
                            label="PAN Number"
                            name="panNumber"
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.handleChange(e, e.target.value.toUpperCase())}
                            value={formik.values.panNumber.toUpperCase()}
                        />
                    </Grid>


                    {/* <Grid xs={12} md={6}>
            <TextField
                error={!!(formik.touched.termsAndConditions && formik.errors.termsAndConditions)}
                fullWidth
                helperText={formik.touched.termsAndConditions && formik.errors.termsAndConditions}
                label="Terms and Conditions"
                name="termsAndConditions"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                
                value={formik.values.termsAndConditions}
              />
            </Grid> */}

                    {/* <Grid xs={12} md={6}>
            <TextField
                    error={
                      !!(formik.touched.category && formik.errors.category)
                    }
                    fullWidth
                    label="Role"
                    name="role"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.category}
                  >
                    {[].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
            </Grid> */}
                </Grid>
                {/* <div>
          <Typography
            color="text.secondary"
            sx={{ mb: 2, mt: 2 }}
            variant="subtitle2"
          >
            Terms and Conditions
          </Typography>
          <QuillEditor
            onChange={(value) => {
              formik.setFieldValue("termsAndConditions", value);
            }}
            placeholder="Write something"
            sx={{ height: 400 }}
            value={formik.values.termsAndConditions}
          />
          {!!(
            formik.touched.termsAndConditions &&
            formik.errors.termsAndConditions
          ) && (
            <Box sx={{ mt: 2 }}>
              <FormHelperText error>
                {formik.errors.termsAndConditions}
              </FormHelperText>
            </Box>
          )}
        </div> */}
            </CardContent>
        </Card>
    );
};

// Vendor.propTypes = {
//   customer: PropTypes.object.isRequired
// };
