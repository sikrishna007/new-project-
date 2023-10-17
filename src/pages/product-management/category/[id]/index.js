import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Seo} from "@/components/seo";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {PropertyList} from "@/components/property-list";
import Grid from "@mui/material/Unstable_Grid2";
import {PropertyListItem} from "@/components/property-list-item-custom";
import {CardMedia} from "@mui/material";
import {endpoints} from "@/endpoints";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {RouterLink} from "@/components/router-link";
import {paths} from 'src/paths';

const Page = () => {
    const router = useRouter();
    const [category, setCategory] = useState({});

    const getCategory = async () => {
        try {
            const token = Cookies.get("accessToken")
            const res = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.category.index +
                "/" +
                router.query.id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await res.json();
            setCategory(data[0]);
        } catch (error) {
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <Seo title={`Product Category: ${category.name}`} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={4}>
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex"
                                }}
                            >
                                <Link
                                    color="text.primary"
                                    component={RouterLink}
                                    href={paths.productManagement.category.index}
                                    underline="hover"
                                >
                                    <SvgIcon sx={{marginTop: "10px" }}>
                                        <ArrowLeftIcon />
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">{category.name}</Typography>
                            </div>
                            {category?.isActive? (
                                <Button
                                    onClick={() =>
                                        router.push(paths.productManagement.category.edit + category.id)
                                    }
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
                            ):(
                                <Button
                                    color="inherit"
                                    style={{backgroundColor: "#CACACA", color: "white", opacity:"1", cursor:"not-allowed"}}
                                    title="Deactive records cant't edit"
                                    endIcon={
                                        <SvgIcon>
                                            <Edit02Icon/>
                                        </SvgIcon>
                                    }
                                >
                                    Edit
                                </Button>
                            )}

                        </div>
                        <div style={{marginLeft: '2.3%', marginTop: '0.5%'}}>
                            <Breadcrumbs separator={<ArrowRightSharpIcon style={{marginLeft: '-40%'}}/>} sx={{color:"#4338CA"}}>
                                <Link
                                    color='#4338CA'
                                    variant="subtitle2"
                                    component={RouterLink}
                                    href={paths.productManagement.category.index}
                                >
                                    Product Categories
                                </Link>
                                <Typography
                                    color="text.primary"
                                    variant="subtitle2"
                                    sx={{marginLeft:'-12%'}}
                                >
                                    Product Category Info
                                </Typography>
                            </Breadcrumbs>

                        </div>
                        <div>
                            <Stack
                                alignItems="flex-start"
                                direction="row"
                                justifyContent="space-between"
                                spacing={3}
                            >
                            </Stack>
                        </div>
                        <Card sx={{ paddingBottom: "1%" }}>
                            <CardHeader title="Basic Details" />
                            <PropertyList>
                                <Grid container spacing={3}>
                                    <Grid xs={12} md={6}>
                                        <PropertyListItem
                                            label="Product Category"
                                            value={category?.name}
                                        />

                                    </Grid>

                                    <Grid xs={12} md={6}>
                                        <Card sx={{ width: "30%", margin: "0% 5%" }}>
                                            <CardMedia
                                            />
                                        </Card>
                                    </Grid>
                                </Grid>
                            </PropertyList>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );

}
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;