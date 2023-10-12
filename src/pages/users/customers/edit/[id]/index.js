import {useState} from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import {RouterLink} from "src/components/router-link";
import {Seo} from "src/components/seo";

import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {endpoints} from "src/endpoints";
import {paths} from "@/paths";
import {EditForm} from "@/custom-components/users/EditForm";


const Page = ({customer}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Seo title="User Management: Edit User"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={4}>
                        <Stack spacing={4}>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <Link
                                    color="text.primary"
                                    component={RouterLink}
                                    href={paths.userManagement.customers.index}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{mr: 1}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">Edit Customer</Typography>

                            </div>
                        </Stack>
                        <EditForm customer={customer} setOpen={setOpen}/>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.userManagement.customers.index +
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
                customer: {},
            },
        };
    }
    const {data} = await res.json();
    // console.log(data);
    return {
        props: {
            customer: data[0],
        },
    };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
