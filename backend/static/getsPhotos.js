//This file is used to get the photos of the vacation destinations from the Google Places API

// Google Places API key
const apiKey = "AIzaSyAR_HQHRhazRxBTKcab27NeXmatm01q2XQ";

// List of vacation destinations
import { vacationDestinations } from "./destinations.js";

// Function to suggest random destinations from the vacationDestinations array
function suggestDestinations() {
    // Generate a random index within the range of vacationDestinations array length
    let randomIndex = Math.floor(Math.random() * vacationDestinations.length);
    
    // Get the random destination from the vacationDestinations array
    let randomDestination = vacationDestinations[randomIndex];
    
    // Return the random destination
    return randomDestination;
}

// Run the functions in a loop 3 times to get 3 different destinations photos
for(let i = 0; i < 3; i++) {
    let suggestedDestination = suggestDestinations();
    let placeName = suggestedDestination;
    console.log("Suggested Destination1:", suggestedDestination);

    // Function to get place details and photo reference from Google Places API
    async function getPlacePhoto() {
        const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=photos&key=${apiKey}`;
        console.log("findPlaceUrl:", findPlaceUrl);

        try {
            const response = await fetch(findPlaceUrl);
            const data = await response.json();

            console.log("Place details:", data);

            if (data.candidates && data.candidates.length > 0) {
                const photoReference = data.candidates[0].photos[0].photo_reference; // grabs the photo reference and stores it
                const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
                displayPhoto(photoUrl, placeName);
            } else {
                console.error("No photo found for this place.");
            }
        } catch (error) {
            console.error("Error: fetching place details", error);
        }
    }

    // Function to display the photo of the place in HTML
    function displayPhoto(photoUrl, placeName) {
        const photocontainer = document.getElementsByClassName("photo-container")[i];
        const link = document.createElement("a");
        link.href = `/generate?destination=${encodeURIComponent(placeName)}&days=3`; // Adjust the duration parameter as needed
        const img = document.createElement("img");
        img.src = photoUrl;
        img.alt = placeName;
        img.style.width = "350px"; // Set the width
        img.style.height = "300px"; // Set the height
        link.appendChild(img);
        photocontainer.appendChild(link);
    }

    // Display the destination name in the HTML element with class "place-name"
    document.getElementsByClassName("place-name")[i].textContent = placeName;

    // Call the function to get place photo
    getPlacePhoto();
}