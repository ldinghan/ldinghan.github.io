const convertCoordX = (longitude) => {
    return 111385.61337 * longitude - 11537541.48762;
}
const convertCoordY = (latitude) => {
    return 110524.50887 * latitude - 112308.8707;
}



const successCallback = (position) => {
    console.log(position);
    const coordinateDisplay = document.querySelector("#coordinates");
    coordinateDisplay.innerHTML = `Latitude: ${position.coords.latitude} <br> Longitude: ${position.coords.longitude}`;
    logJSONData(position.coords.longitude, position.coords.latitude);
};
  
  const errorCallback = (error) => {
    console.log(error);
};



const handleInput = async () => {
    const queryInput = document.querySelector("#queryInput");
    const addressQuery = await fetch(`https://developers.onemap.sg/commonapi/search?searchVal=${queryInput.value}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
    const addressQueryJSON = await addressQuery.json();
    
    const longitude = addressQueryJSON.results[0].LONGITUDE;
    const latitude = addressQueryJSON.results[0].LATITUDE;
    logJSONData(longitude, latitude);
}
const submitBtn = document.querySelector("#submitBtn");
submitBtn.onclick = handleInput;
const getCurrentLocation = document.querySelector("#getCurrentLocation");
getCurrentLocation.onclick = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}







async function logJSONData(longitude, latitude) {
    const carparkAvailability = await fetch("https://api.data.gov.sg/v1/transport/carpark-availability");
    const carparkAvailabilityJSON = await carparkAvailability.json();

    const carparkList = await fetch("https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=3000");
    
    const carparkListJSON = await carparkList.json();
    const carparks = carparkListJSON.result.records;
    currentX = convertCoordX(longitude);
    currentY = convertCoordY(latitude);
    let closestDistance = 999999;
    let closestCarpark;
    for (let i = 0; i < carparks.length; i++) {
        const distanceToCarpark = Math.sqrt((carparks[i].y_coord - currentY)*(carparks[i].y_coord - currentY) + (carparks[i].x_coord - currentX)*(carparks[i].x_coord - currentX));
        if (distanceToCarpark < closestDistance) {
            closestCarpark = carparks[i];
            closestDistance = distanceToCarpark;
        }
    }
    console.log(closestDistance);
    console.log(closestCarpark);

    let availability = "";
    let capacity = "";
    carparkAvailabilityList = carparkAvailabilityJSON.items[0].carpark_data;
    for (let i = 0; i < carparkAvailabilityList.length; i++) {
        if (carparkAvailabilityList[i].carpark_number == closestCarpark.car_park_no) {
            availability = carparkAvailabilityList[i].carpark_info[0].lots_available;
            capacity = carparkAvailabilityList[i].carpark_info[0].total_lots;
            break;
        }
    }




    const carparkDetails = document.querySelector("#carparkDetails");
    carparkDetails.innerHTML = `Nearest Carpark: ${closestCarpark.address} <br> Distance: ${closestDistance.toFixed()}m <br>${availability} out of ${capacity} lots available`;
}
