import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

export const Employee = (props) => {

    let {vm, customer, formik, ...other} = props;
    return (

        <Card sx={{marginTop: "3%"}}>
            <CardHeader title="Employee Details"/>
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
                            error={!!(formik.touched.empId && formik.errors.empId)}
                            fullWidth
                            helperText={formik.touched.empId && formik.errors.empId}
                            // label="Employee ID"
                            label={
                                <span>
                                    Employee ID&nbsp;
                                    <span style={{color: "red"}}>*</span>
                                </span>
                            }
                            name="empId"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}

                            value={formik.values.empId}
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

// Employee.propTypes = {
//   customer: PropTypes.object.isRequired
// };
