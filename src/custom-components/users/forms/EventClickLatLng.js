
import React, {useEffect, useState} from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {VendorAddress} from "@/custom-components/users/forms/VendorAddress";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import {MyLocation} from "@mui/icons-material";

const MapComponent = (props) => {
    let { formik } = props;
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY, // Replace with your own API key

    });

    const [latLng, setLatLng] = React.useState({
        lat:formik.values.latitudes|| 17.427661,
        lng:formik.values.longitudes|| 78.4317484,
    });
    const [text, setTest] = useState(props.formik.values.city)

   const setCity=(value)=>{
        formik.values.city=value
       setTest(value)
   }

    const onMapClick = (event) => {
        setLatLng({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
        handleGetAddress(event.latLng.lat(),event.latLng.lng())
    };
    const setAddressDetails=(address,lat,log)=>{
        formik.setFieldValue('latitudes', lat);
        formik.setFieldValue('longitudes', log);
        formik.setFieldValue('city', address.city || '');
        formik.setFieldValue('country', address.country || '');
        formik.setFieldValue('state', address.state || '');
        formik.setFieldValue('addressLine1', address.addressLine1 || '');
        formik.setFieldValue('addressLine2', address.addressLine2 || '');
        formik.setFieldValue('pincode', address.pincode || '');
        setTest(address.city || '');
        formik.handleChange(event)
    }

    const handleGetCurrentLocation = () => {

        if (navigator.geolocation) {
            // console.log("im here");
            navigator.geolocation.getCurrentPosition((position) => {
                setLatLng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                handleGetAddress(position.coords.latitude,position.coords.longitude)
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {

    }, [latLng]);
    const handleGetAddress = (lat,log) => {
        // Check if lat and lng are provided
        if (lat && log) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${log}&key=`+process.env.NEXT_PUBLIC_MAP_KEY)
                .then(response => response.json())
                .then(data => {
                    const components = data.results[0].address_components;
                    // console.log(components);
                    const newAddress = {
                        country: components.find(comp => comp.types.includes('country'))?.long_name,
                        state: components.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name,
                        city: components.find(comp => comp.types.includes('locality'))?.long_name,
                        addressLine1: components.find(comp => comp.types.includes('route'))?.long_name+components.find(comp => comp.types.includes('street_number'))?.long_name,
                        addressLine2: components.find(comp => comp.types.includes('sublocality_level_3'))?.long_name,
                        pincode : components.find(comp => comp.types.includes('postal_code'))?.long_name,
                    }
                    setLatLng({
                        lat: lat,
                        lng: log,
                    });
                    setAddressDetails(newAddress,lat,log);
                })
                .catch(error => {
                    console.warn("error",error)
                })
        } else {
            alert("Please provide both latitude and longitude.");
        }

    };

    return isLoaded ? (
            <><Card sx={{ marginBottom: "3%", marginTop: "3%" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardHeader title="Address" />
                    <Button onClick={handleGetCurrentLocation}>
                        <SvgIcon>
                            <MyLocation />
                        </SvgIcon>
                        Use Current Location
                    </Button>
                </div>
                <CardContent sx={{ pt: 0 }}>
                    <VendorAddress
                        text={text}
                        handleGetAddress={handleGetAddress}
                        setCity={setCity}
                        formik={formik} submit/>
                </CardContent>
            </Card>
        <Card sx={{marginBottom: "3%", marginTop: "3%"}}>
            <CardHeader title="Location"/>
            <CardContent sx={{pt: 0}}>
        <GoogleMap
            mapContainerStyle={{height:"500px"}}
            center={{ lat: latLng.lat || 18.52043 , lng: latLng.lng||73.856743 }}
            zoom={10}
            onClick={onMapClick}
        >
            {latLng && <Marker position={latLng} />}
        </GoogleMap>
            </CardContent></Card></>
    ) : loadError ? (
        <div>Error loading maps</div>
    ) : (
        <div>Loading...</div>
    );
};

export default MapComponent;

