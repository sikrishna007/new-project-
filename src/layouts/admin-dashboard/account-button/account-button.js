import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import SvgIcon from '@mui/material/SvgIcon';

import { useMockedUser } from 'src/hooks/use-mocked-user';
import { usePopover } from 'src/hooks/use-popover';

import { AccountPopover } from './account-popover';
import {Dropdown} from "../../../components/dropdown";
import {ArrowDownward, ArrowDropDownRounded, ArrowDropUpRounded} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {endpoints} from "../../../endpoints";

export const AccountButton = () => {
  const user = useMockedUser();
  const popover = usePopover();

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        spacing={2}
        ref={popover.anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
            justifyContent:"space-between",
          height: 40,
            borderLeft:1,
            borderStyle: 'solid',
            borderColor: 'divider',
          width: "auto",
        }}
      >
        <Avatar
          sx={{
            height: 45,
            width: 45,
              marginLeft:1,
          }}
          src={user.avatar}
        >
          <SvgIcon>
            <User01Icon />
          </SvgIcon>
        </Avatar>
          <Grid container sx={{marginLeft:1}}>
              <Grid item>
                  <Typography variant="h6" display="inline">
                      {user.name}
                  </Typography>
                  <Typography variant="body2" align="left">{user.role}</Typography>

              </Grid>
          </Grid>
          <SvgIcon sx={{marginLeft:1}}>
              {popover.open ? <ArrowDropUpRounded sx={{color:"#4338CA"}}/> : <ArrowDropDownRounded  />}

          </SvgIcon>
      </Box>

      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};


