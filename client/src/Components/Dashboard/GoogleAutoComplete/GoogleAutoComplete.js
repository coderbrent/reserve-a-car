import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { TextField } from '@material-ui/core';

const GoogleAutoComplete = () => {
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' })
  const [address, setAddress] = useState('')

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
  
    setAddress(value)
    setCoordinates(latLng)
    
    console.log(results, coordinates);
  };
  
  const searchOptions = {
    types: ['address']
  }
  
  return (
    <PlacesAutocomplete 
      value={address} 
      onChange={setAddress} 
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div>
        <TextField fullWidth required {...getInputProps({ placeholder: "Enter an Address" })} 
          type="text" 
        /> 
        <div>
          { suggestions.map(suggestion => {
            const style = {
              fontFamily: `Roboto`,
              fontSize: 'smaller',
              backgroundColor: suggestion.active ? "#999" : "rgba(0, 0, 0, 0.100)"
            }

            return (
            <div {...getSuggestionItemProps(suggestion, { style })}> 
                { suggestion.description }
            </div>
            )
          })}
        </div>
      </div>
      )} 
    </PlacesAutocomplete>
  )
}

export default GoogleAutoComplete;