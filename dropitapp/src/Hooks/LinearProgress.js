import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={props.value} color={(props.mode==='light')?'primary':'inherit'}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" style={{color:(props.mode==='light') ? 'black':'skyblue'}}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


export default LinearProgressWithLabel;