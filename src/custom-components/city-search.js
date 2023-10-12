import Autocomplete from "react-google-autocomplete";
import React, {useEffect, useState} from "react";
import {LoadScript} from '@react-google-maps/api';

const CitySearch = (props) => {
    return (

            <Autocomplete
                placeholder="City"
                value={props.text}
                // inputAutocompleteValue={"test"}
                onChange={(event) => props.setCity(event.target.value)}
                style={{ width:"100%",padding:"3.5%",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px"}}
                onPlaceSelected={(place) => {
                    const coordinates = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    };
                    props.handleGetAddress(coordinates.lat, coordinates.lng)
                }}/>
    );
};

export default CitySearch;
