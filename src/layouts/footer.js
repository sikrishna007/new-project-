import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {paths} from 'src/paths';
import SvgIcon from "@mui/material/SvgIcon";
import {Copyright} from "@mui/icons-material";
import {RouterLink} from "@/components/router-link";

const sections = [
    {
        title: 'Menu',
        items: [
            {
                title: 'Browse Components',
                path: paths.components.index
            },
            {
                title: 'Documentation',
                external: true,
                path: paths.docs
            }
        ]
    },
    {
        title: 'Legal',
        items: [
            {
                title: 'Terms & Conditions',
                path: '#'
            },
            {
                title: 'License',
                path: '#'
            },
            {
                title: 'Contact',
                path: '#'
            }
        ]
    },
    {
        title: 'Social',
        items: [
            {
                title: 'Instagram',
                path: '#'
            },
            {
                title: 'LinkedIn',
                path: '#'
            }
        ]
    }
];

export const Footer = (props) => (
    <Box
        sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark'
                ? 'neutral.800'
                : 'neutral.50',
            borderTopColor: 'divider',
            borderTopStyle: 'solid',
            borderTopWidth: 1,
            pb: 0,
        }}
        {...props}>
        <Container maxWidth="lg">
            <Divider/>
            <Grid
                sx={{
                    marginLeft: "25%",
                    pt: 3,
                    pb: 3,
                    display: "flex",
                    justifyContent: "center"
                }}
                color="text.secondary"
            ><Typography
                variant="body1"
            >
                All Rights Reserved
            </Typography>
                <SvgIcon>
                    <Copyright/>
                </SvgIcon>
                <Typography
                    variant="body1"
                >
              <Link
                  color="text.secondary"
                  component={RouterLink}
                  href={paths.dashboard.index}
            > EventMart</Link> 2023.
            </Typography></Grid>
        </Container>
    </Box>
);
