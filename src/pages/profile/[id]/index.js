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
import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import {PropertyListItem} from "@/components/property-list-item-custom";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Container from "@mui/material/Container";
import {useMockedUser} from "@/hooks/use-mocked-user";
import Cookies from "js-cookie";
import {endpoints} from "@/endpoints";

const UserProfile = ({employee}) => {

    let role = Cookies.get("role")
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
                                    // src={avatar}
                                    sx={{
                                        height: 180,
                                        width: 180,
                                    }}
                                    src={employee.user?.profilePic?.filePath}
                                >
                                    <SvgIcon>
                                        <User01Icon />
                                    </SvgIcon>
                                </Avatar>
                            </Box>
                        </Box>
                    </Stack>
                    <Stack
                        display="flex"
                        direction="column"
                        width="100%"
                        height="100%"
                        sx={{
                            marginLeft: ["0", "3%"], // Adjust margin for small screens
                            textAlign: ["center", "left"], // Center content on small screens
                        }}
                    >
                        <Stack>
                            <div
                                style={{
                                    alignItems: "center", // Adjust alignment for small screens
                                    display: "flex",
                                    justifyContent: "space-between", // Adjust alignment for small screens
                                    paddingRight:"10px",
                                    paddingTop:"10px",
                                }}
                            >
                                <Typography variant="h4"
                                    sx={{
                                        color: 'black',
                                        fontSize: 20,
                                        fontFamily: 'Inter',
                                        fontWeight: '600',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {employee.user?.firstName} {employee.user?.lastName}</Typography>
                                <div>
                                    <Button
                                        // onClick={() =>
                                        //     router.push(paths.eventCategory.edit + router.query.id)
                                        // }
                                        color="inherit"
                                        style={{backgroundColor: "#4338CA", color: "white"}}
                                        endIcon={
                                            <SvgIcon>
                                                <Edit02Icon/>
                                            </SvgIcon>
                                        }
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </Stack> {/*john*/}
                        <Stack>
                            <Typography
                                sx={{
                                    // Admin at Event Mart
                                    color: '#545454',
                                    fontSize: 12,
                                    fontFamily: 'Inter',
                                    fontWeight: '500',
                                    wordWrap: 'break-word'
                                }}
                            >
                                {employee.user?.role.name} at Event Mart</Typography>
                        </Stack> {/*Admin at event*/}
                        <Stack
                            display="flex"
                            flex-wrap="wrap"
                            direction="row"
                            sx={{
                                marginTop: ["0", "3%"], // Adjust margin for small screens
                                paddingBottom:"10px"
                            }}

                        >
                            <Stack width={["100%", "30%"]} borderRight="3px solid #6366F1"  display="flex" direction="row"
                                   sx={{width: "auto", height: "auto", paddingRight:"2%"}}>
                                <LocationOnIcon/>
                                &nbsp;&nbsp;{employee.user?.addresses[0]?.country}, {employee.user?.addresses[0]?.state}, {employee.user?.addresses[0]?.city}, {employee.user?.addresses[0]?.addressLine1},Pin: {employee.user?.addresses[0]?.pincode}</Stack>
                            <Stack width={["100%", "25%"]} borderRight="3px solid #6366F1" paddingLeft="3%" paddingRight="2%" display="flex"
                                   direction="row" sx={{width: "auto", height: "auto"}}>
                                <CallIcon/>&nbsp;&nbsp;+91 {employee.user?.phoneNumber}</Stack>
                            <Stack width={["100%", "25%"]} borderRight="3px solid #6366F1" paddingLeft="3%" paddingRight="2%" display="flex"
                                   direction="row" sx={{width: "auto", height: "auto"}}><EmailIcon/>&nbsp;&nbsp;{employee.user?.emailId}</Stack>
                            <Stack width={["100%", "20%"]} paddingLeft="3%" paddingRight="2%" display="flex"
                                   direction="row" sx={{width: "auto", height: "auto"}}>
                                <CalendarMonthIcon/>
                                {new Date(employee?.user.dateOfBirth).toLocaleDateString(undefined, {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                               </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Box sx={{mt:'30px'}}>
                    <Card sx={{marginTop: ["0", "5%"], margin: ["auto", "8%"]}} spacing={4}>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid xs={12} md={3}>
                                    <Typography variant="h6" sx={{display: "flex"}}>Employee Details</Typography>
                                </Grid>
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
                                    {/*<Grid item md={5}>*/}
                                    {/*    <Stack spacing={3}>*/}
                                    {/*        <PropertyListItem*/}
                                    {/*            label="Adhaar Number"*/}
                                    {/*            value={employee?.adhaarNumber}*/}
                                    {/*        />*/}
                                    {/*    </Stack>*/}
                                    {/*</Grid>*/}
                                    <Grid item md={5}>
                                        <Stack spacing={3}>
                                            <PropertyListItem
                                                label="PAN Number"
                                                value={employee?.panNumber}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                </Box>

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
            </Box>
        </>
    )
}

export const getServerSideProps = async (context) => {
    // let role = Cookies.get("role")
    // let pathName
    // role === "ADMIN" ? pathName = "employees" : pathName = "vendor"
    // let endpoint = endpoints.userManagement[pathName].index
    const id = context.req.cookies.id;
    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.userManagement.employees.index+
        "/" +
        context.params.id,
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

UserProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default UserProfile;