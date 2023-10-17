import {useState} from "react";



export const handleGetAddress = (lat,log) => {
    // Check if lat and lng are provided
    if (lat && log) {
        // Use Google Maps Geocoding API
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${log}&key=`+process.env.NEXT_PUBLIC_MAP_KEY)
            .then(response => response.json())
            .then(data => {
                const components = data.results[0].address_components;
                // console.log(components);
                const newAddress = {
                    latitudes:lat,
                    longitudes:log,
                    country: components.find(comp => comp.types.includes('country'))?.long_name,
                    state: components.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name,
                    city: components.find(comp => comp.types.includes('locality'))?.long_name,
                    addressLine1: components.find(comp => comp.types.includes('route'))?.long_name+components.find(comp => comp.types.includes('street_number'))?.long_name,
                    addressLine2: components.find(comp => comp.types.includes('sublocality_level_3'))?.long_name,
                    pincode : components.find(comp => comp.types.includes('postal_code'))?.long_name
                }
               return newAddress;
            })
    } else {
        alert("Please provide both latitude and longitude.");
    }

};


export const handleGetCurrentLocation = () => {

    if (navigator.geolocation) {
        console.log("im here");
        navigator.geolocation.getCurrentPosition((position) => {
            handleGetAddress(position.coords.latitude,position.coords.longitude)
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
};
