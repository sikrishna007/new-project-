import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import {RouterLink} from "src/components/router-link";
import {paths} from "src/paths";
import React from "react";

export const VendorSocial = ({ customer, formik }) => {
  customer = {};

  return (
    <Card sx={{marginBottom: "3%", marginTop: "3%"}}>
      <CardHeader title="Social media links" />
      <CardContent sx={{ pt: 0 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <TextField
              error={
                !!(formik.touched.facebookLink && formik.errors.facebookLink)
              }
              fullWidth
              helperText={
                formik.touched.facebookLink && formik.errors.facebookLink
              }
              label="Facebook Link"
              name="facebookLink"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.facebookLink}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              error={
                !!(formik.touched.instagramLink && formik.errors.instagramLink)
              }
              fullWidth
              helperText={
                formik.touched.instagramLink && formik.errors.instagramLink
              }
              label="Instagram Link"
              name="instagramLink"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.instagramLink}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              error={
                !!(formik.touched.youtubeLink && formik.errors.youtubeLink)
              }
              fullWidth
              helperText={
                formik.touched.youtubeLink && formik.errors.youtubeLink
              }
              label="Youtube Link"
              name="youtubeLink"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.youtubeLink}
            />
          </Grid>
        </Grid>
      </CardContent>


    </Card>
  );
};

// Vendor.propTypes = {
//   customer: PropTypes.object.isRequired
// };
