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
                            onChange={(e) => formik.handleChange(e, e.target.value.toUpperCase())}
                            value={formik.values.gstNumber.toUpperCase()}
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
                </Grid>

            </CardContent>
        </Card>
    );
};

