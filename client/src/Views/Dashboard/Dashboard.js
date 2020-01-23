import React, { useState, useEffect } from 'react'
import useGoogleGeocode from '../../Hooks/useGoogleGeocode'
import classes from '../Dashboard/AddressSearch.module.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Dashboard = () => {
  const { getAddressData, dataObj, placesId } = useGoogleGeocode();
  const [inputs, setInputs] = useState({ address: '' })
  const [placeId, setPlaceId] = useState({ id: '' })

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
        ...inputs, 
        [e.target.name]: e.target.value
      })
    )
  }
  
  const GOOGLE_API_KEY = `AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE`
  const pID = `ChIJaRvprrfTw4kRzTN0swoQ9Po`

  const storePlaceID = () => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&${pID}`
  }


  
  return (
    <>
    <div>
      <input type="text" name="address" onChange={handleInputChange} />
        <button type="submit" onClick={() => getAddressData(inputs.address)}>Search Address</button>
    </div>
    { dataObj ? dataObj.map((locale, i) => (
      <Card key={i} className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            { locale.address_components[0].long_name + ' ' + locale.address_components[1].long_name }
          </Typography>
          <Typography variant="body2" component="p">
            { locale.address_components[2].long_name + ', ' + locale.address_components[3].long_name }
          </Typography>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardContent>
      </Card>
    )) : '...loading address'
    }
    </>
  )
}

export default Dashboard;