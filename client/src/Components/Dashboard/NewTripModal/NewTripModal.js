import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
// import { AccessAlarmOutlined, PlaceOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

export default function NewTripModal() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedType, setSelectedType] = useState('')
  const [inputs, setInputs] = useState({ pu_time: '', pu_addr: '' })
 
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
        ...inputs, 
        [e.target.name]: e.target.value
      })
    )
  }

  const handleSelect = e => {
    setSelectedType(e.target.value);
  }

  const addNewTrip = e => {
    e.preventDefault()

    const newTrip = {
      trip_type: selectedType,
      pu_date: selectedDate,
      pu_time: inputs.pu_time,
      pu_addr: inputs.pu_addr,
    }

    fetch(`/trips/add-trip`, { 
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newTrip)
    }
   ).then(response => response.json())
   .then(json => console.log(json))

   handleClickOpen();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Trip
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter A New Trip</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Use this form to create a new trip!
          </DialogContentText>
          <DatePicker 
            name="pu_date" 
            value={selectedDate}
            onChange={setSelectedDate}
            required
          />
          <TextField
            id="userPickupTime"
            label="Pickup Time"
            name="pu_time"
            type="time"
            onChange={handleInputChange}
            defaultValue="05:30"
            className={classes.textField}
            inputProps={{
              step: 300, // 5 min intervals
            }}
            required
          />
           <InputLabel 
              id="demo-simple-select-outlined-label"
            >
              Trip Type
            </InputLabel>
            <Select
              name="trip_type"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleSelect}
              value={selectedType}
              required
            >
            <MenuItem value={'Airport'}>Airport</MenuItem>
            <MenuItem value={'Local'}>Local</MenuItem>
            <MenuItem value={'NYC'}>NYC</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addNewTrip} color="primary">
            Create Trip
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}