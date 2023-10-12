import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

export const Layout = (props) => {
    const {children} = props;

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: {
                    xs: 'column-reverse',
                    md: 'row'
                }
            }}
        >
            <Box
                sx={{
                    alignItems: 'end',
                    backgroundColor: 'neutral.800',
                    backgroundImage: 'url("/assets/gradient-bg.svg")',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    color: 'common.white',
                    display: 'flex',
                    flex: {
                        xs: '0 0 auto',
                        md: '1 1 auto'
                    },
                    p: {
                        xs: 4,
                        md: 8
                    }
                }}
            >
              <Typography
                variant="subtitle2"
            >
                Copyright 2023, Eventmart.app
            </Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    flex: {
                        xs: '1 1 auto',
                        md: '0 0 auto'
                    },
                    flexDirection: 'column',

                    maxWidth: '100%',
                    p: {
                        xs: 4,
                        md: 8
                    },
                    width: {
                        md: 600
                    }
                }}
            >
                <Box sx={{
                    width: "200px",
                    background: "darkblue",
                    textAlign: "center",
                    padding: "10px",
                    color: "white",
                }}>Event Mart</Box>
                <div>
                    {children}
                </div>
            </Box>
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};
