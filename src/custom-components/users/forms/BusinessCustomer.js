import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

export const BusinessCustomer = (props) => {

    let {customer, formik, ...other} = props;

    return (

        <Card sx={{marginTop: "3%"}}>
            <CardHeader title="Additional Information"/>
            <CardContent sx={{pt: 0}}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        xs={12}
                        md={6}
                    >
                        <TextField
                            error={!!(formik.touched.name && formik.errors.name)}
                            fullWidth
                            helperText={formik.touched.name && formik.errors.name}
                            label="Business Name"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}

                            value={formik.values.name}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                    >

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
                    <Grid xs={12} md={6}>
                        <TextField
                            error={!!(formik.touched.gstNumber && formik.errors.gstNumber)}
                            fullWidth
                            helperText={formik.touched.gstNumber && formik.errors.gstNumber}
                            label="GST Number"
                            name="gstNumber"
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.handleChange(e, e.target.value.toUpperCase())}

                            value={formik.values.gstNumber.toUpperCase()}
                        />
                    </Grid>


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

    );
};

// Customer.propTypes = {
//   customer: PropTypes.object.isRequired
// };
