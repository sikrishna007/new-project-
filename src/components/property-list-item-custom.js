import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export const PropertyListItem = (props) => {
  const { align = 'vertical', children, disableGutters, value, label, icon, ...other } = props;

  return (
    <ListItem
      sx={{
        px: disableGutters ? 1 : 3,
        py: 1.5
      }}
      {...other}>
      <ListItemText
        // style={{gap: "5%"}}
        disableTypography
        primary={label ? (
          <Typography
          color={"text.secondary"}
            sx={{ minWidth: align === 'vertical' ? 'inherit' : 180, textTransform: "uppercase" }}
            variant="body2"
          >
            {label}
          </Typography>
        ) : <div style={{ minWidth: align === 'vertical' ? 'inherit' : 50, margin: 0, padding: 0}}>{icon}</div>}
        secondary={(
          <Box
            sx={{
              flex: 1,
              mt: align === 'vertical' ? 0.5 : 0
            }}
          >
            {children || (
              <Typography
              sx={{ minWidth: align === 'vertical' ? 'inherit' : 180 }}
                variant="subtitle2"
              >
                {value}
              </Typography>
            )}
          </Box>
        )}
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          my: 0
        }}
      />
    </ListItem>
  );
};

PropertyListItem.propTypes = {
  align: PropTypes.oneOf(['horizontal', 'vertical']),
  children: PropTypes.node,
  disableGutters: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};
