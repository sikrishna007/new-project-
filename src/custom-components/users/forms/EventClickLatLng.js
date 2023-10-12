// import React, {useEffect, useRef, useState} from "react";
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import Button from "@mui/material/Button";
// import SvgIcon from "@mui/material/SvgIcon";
// import {MyLocation} from "@mui/icons-material";
// import {VendorAddress} from "./VendorAddress";
// import CardHeader from "@mui/material/CardHeader";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
//
// const MyMapComponent = withScriptjs(
//     withGoogleMap(props => (
//         <GoogleMap
//             onClick={ev => {
//                 props.setlstLog({
//                     lat: ev.latLng.lat(),
//                     log: ev.latLng.lng()
//                 })
//                 props.handleGetAddress(ev.latLng.lat(), ev.latLng.lng());
//
//             }}
//             defaultZoom={10}
//             defaultCenter={{lat: 17.41722793860703, lng: 78.49895252900455}}
//         >
//             {props.isMarkerShown && (
//                 <Marker
//                     position={{lat: props.lstLog.lat || 17.41722793860703, lng: props.lstLog.log || 78.49895252900455}}
//                     onClick={props.onMarkerClick}
//                 />
//             )}
//         </GoogleMap>
//     ))
// );
// const MyFancyComponent = (props) => {
//     let {formik} = props;
//     const [isMarkerShown, setIsMarkerShown] = useState(false);
//     const [lstLog, setlstLog] = useState({
//         lat: '',
//         log: ''
//     });
//     const [address, setAddress] = useState({
//         country: formik.values.country,
//         state: formik.values.state,
//         city: formik.values.city,
//         addressLine1: formik.values.addressLine1,
//         addressLine2: formik.values.addressLine2,
//         pincode: formik.values.pincode,
//     });
//     const mapRef = useRef(null);
//     // console.log(lstLog,"lstLog")
//     // console.log('formik----->',formik.values);
//
//     const setAddressDetails = (address) => {
//         console.log(address)
//         formik.values.latitudes = lstLog.lat;
//         formik.values.longitudes = lstLog.log;
//         formik.values.city = address.city ? address.city : "";
//         formik.values.country = address.country ? address.country : "";
//         formik.values.state = address.state ? address.state : "";
//         formik.values.addressLine1 = address.addressLine1 ? address.addressLine1 : "";
//         formik.values.addressLine2 = address.addressLine2 ? address.addressLine2 : "";
//         formik.values.pincode = address.pincode ? address.pincode : ""
//     }
//     const handleGetCurrentLocation = () => {
//
//         if (navigator.geolocation) {
//             // console.log("im here");
//             navigator.geolocation.getCurrentPosition((position) => {
//                 setlstLog({
//                     lat: position.coords.latitude,
//                     log: position.coords.longitude
//                 });
//
//                 if (mapRef.current) {
//                     mapRef.current.panTo({lat: position.coords.latitude, lng: position.coords.longitude});
//                 }
//                 handleGetAddress(position.coords.latitude, position.coords.longitude)
//             });
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//         }
//     };
//     const handleGetAddress = (lat, log) => {
//         // Check if lat and lng are provided
//         if (lat && log) {
//             // Use Google Maps Geocoding API
//             fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${log}&key=` + process.env.NEXT_PUBLIC_MAP_KEY)
//                 .then(response => response.json())
//                 .then(data => {
//                     const components = data.results[0].address_components;
//                     // console.log(components);
//                     const newAddress = {
//                         country: components.find(comp => comp.types.includes('country'))?.long_name,
//                         state: components.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name,
//                         city: components.find(comp => comp.types.includes('locality'))?.long_name,
//                         addressLine1: components.find(comp => comp.types.includes('route'))?.long_name + components.find(comp => comp.types.includes('street_number'))?.long_name,
//                         addressLine2: components.find(comp => comp.types.includes('sublocality_level_3'))?.long_name,
//                         pincode: components.find(comp => comp.types.includes('postal_code'))?.long_name
//                     }
//                     setAddress(newAddress);
//                     setAddressDetails(newAddress);
//                 })
//         } else {
//             alert("Please provide both latitude and longitude.");
//         }
//
//     };
//
//     useEffect(() => {
//         const delayedShowMarker = setTimeout(() => {
//             setIsMarkerShown(true);
//         }, 3000);
//
//         return () => {
//             clearTimeout(delayedShowMarker);
//         };
//     }, []);
//
//     const handleMarkerClick = () => {
//         setIsMarkerShown(false);
//         setTimeout(() => {
//             setIsMarkerShown(true);
//         }, 3000);
//     };
//
//     return (
//         <>
//             <Card sx={{marginBottom: "3%", marginTop: "3%"}}>
//                 <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//                     <CardHeader title="Address"/>
//                     <Button onClick={handleGetCurrentLocation}>
//                         <SvgIcon>
//                             <MyLocation/>
//                         </SvgIcon>
//                         Use Current Location
//                     </Button>
//                 </div>
//                 <CardContent sx={{pt: 0}}>
//                     <VendorAddress formik={formik} submit/>
//                 </CardContent>
//             </Card>
//             <Card sx={{marginBottom: "3%", marginTop: "3%"}}>
//                 <CardHeader title="Location"/>
//                 <CardContent sx={{pt: 0}}>
//                     <MyMapComponent
//                         setlstLog={setlstLog}
//                         lstLog={lstLog}
//                         handleGetAddress={handleGetAddress}
//                         isMarkerShown={isMarkerShown}
//                         onMarkerClick={handleMarkerClick}
//                         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_KEY}&callback=initMap&v=weekly`}
//                         loadingElement={<div style={{height: `100%`}}/>}
//                         containerElement={<div style={{height: `400px`}}/>}
//                         mapElement={<div style={{height: `100%`}}/>}
//                     /></CardContent></Card>
//         </>
//
//     );
// };
//
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

    const [latLng, setLatLng] = React.useState(null);
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
        handleGetAddress(latLng?.lat,latLng?.lng)
    };
    const [address, setAddress] = useState({
        country: formik.values.country,
        state: formik.values.state,
        city: formik.values.city,
        addressLine1: formik.values.addressLine1,
        addressLine2: formik.values.addressLine2,
        pincode:formik.values.pincode,
    });
    const setAddressDetails=(address,lat,log)=>{
        formik.values.latitudes=lat
        formik.values.longitudes= log
        formik.values.city = address.city? address.city:"" ;
        formik.values.country = address.country? address.country:"";
        formik.values.state = address.state? address.state:"";
        formik.values.addressLine1 = address.addressLine1 ? address.addressLine1 : "";
        formik.values.addressLine2 = address.addressLine2 ? address.addressLine2 : "";
        formik.values.pincode = address.pincode ? address.pincode:""
        setTest(formik.values.city)
        console.log(formik.values)
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
                    setAddress(newAddress);
                    setAddressDetails(newAddress,lat,log);
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
            center={{ lat: 18.52043, lng: 73.856743 }}
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

