import Autocomplete from "react-google-autocomplete";

const CitySearch = (props) => {
    let {submit,handleGetAddress,setCity,text, customer, formik, ...other} = props;
    return (

            <Autocomplete
                placeholder="City"
                value={text}
                // inputAutocompleteValue={"test"}
                onChange={(event) => setCity(event.target.value)}
                style={{ width:"100%",padding:"3.5%", fontWeight: "500", fontSize: "14px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px"}}
                onPlaceSelected={(place) => {
                    const coordinates = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    };
                    handleGetAddress(coordinates.lat, coordinates.lng)
                }}/>
    );
};

export default CitySearch;
