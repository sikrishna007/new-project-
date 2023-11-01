import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import {paths} from "src/paths";
import React, {useEffect, useState} from "react";
import CommonDialog from "../../CommonDialog";
import {RouterLink} from "@/components/router-link";
import toast from "react-hot-toast";
import {ToastError} from "@/icons/ToastError";
import {useRouter} from "next/router";

import Cookies from "js-cookie";



export const CreateCustomer = (props) => {

    const router = useRouter();
    let location = window.location.href.split("/")[4];
    let {submit, customer, formik, ...other} = props;
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const[create,setCreate]=useState(false)
    const handleCreateDialogOpen = (value) => {
        setCreate(value)
        setCreateDialogOpen(true);
    };

    const customerSave=()=>{
        if (Object.keys(formik.errors).length > 0) {
            toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
            });
        }
       else if(formik.values.firstName === ""){
            toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
            });
        }

            formik.handleSubmit();

    }
    const handleCreateDialogClose = (formik) => {

        setCreateDialogOpen(false);
    };
    return (
        <Stack sx={{marginBottom: "3%", marginTop: "3%"}}>
            <CardContent sx={{pt: 0}}>
                <Grid><Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                    sx={{marginLeft: "1%"}}
                >
                    <Button
                        // onClick={() => router.push(paths.userManagement.vendors.index)}
                        onClick={()=>handleCreateDialogOpen(false)}
                        color="error" size="small" variant="outlined">
                        Cancel
                    </Button>
                    <Button  onClick={()=>handleCreateDialogOpen(true)}
                             variant="contained">
                        Create
                    </Button>
                    <CommonDialog
                        onConfirm={() => {
                            if(create){
                            handleCreateDialogClose();
                            customerSave();}
                            else {
                                router.push(`/users/${location}`);
                                handleCreateDialogClose();
                            }
                        }}
                        onClose={handleCreateDialogClose}
                        open={createDialogOpen}
                        description={create ?"Are you sure you want to create ?":"Are you sure you want to go back ?"}
                    />
                </Stack></Grid>
            </CardContent>
        </Stack>
    );
};

export const EditCustomer = ({formik, hasChanges, profileId}) => {
    const router = useRouter();
    let location = window.location.href.split("/")[4];
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const[create,setCreate]=useState(false)

    const handleCreateDialogOpen = (value) => {
        setCreate(value)
        setCreateDialogOpen(true);
    };

    const customerSave=()=>{
        if (Object.keys(formik.errors).length > 0) {
            toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
            });
        }
        else if(formik.values.firstName === ""){
            toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
            });
        }

        formik.handleSubmit();

    }
    const handleCreateDialogClose = (formik) => {
        setCreateDialogOpen(false);
    };


    return (
        <Stack sx={{marginBottom: "3%", marginTop: "3%"}}>
            <CardContent sx={{pt: 0}}>
                <Grid><Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                    sx={{marginLeft: "1%"}}
                >
                    <Button
                        onClick={()=>handleCreateDialogOpen(false)}
                        color="error" size="small" variant="outlined">
                       Discard
                    </Button>
                    <Button  onClick={()=>handleCreateDialogOpen(true)}
                             variant="contained"
                             disabled={!hasChanges}>
                        Save Changes
                    </Button>
                    <CommonDialog
                        onConfirm={() => {
                            if(create){
                                handleCreateDialogClose();
                                customerSave();}
                            else {
                                if (location === "edit") {
                                    router.push(`/profile/${profileId}`);
                                }else {
                                    router.push(`/users/${location}`);
                                }
                                handleCreateDialogClose();
                            }
                        }}
                        onClose={handleCreateDialogClose}
                        open={createDialogOpen}
                        description={create ?"Are you sure you want to Save Changes ?":"Are you sure you want to Discard ?"}
                    />
                </Stack></Grid>
            </CardContent>
        </Stack>
    );
};