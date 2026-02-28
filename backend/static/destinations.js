export const vacationDestinations = [
    "Paris, France",
    "New York City, USA",
    "Tokyo, Japan",
    "London, England",
    "Rome, Italy",
    "Barcelona, Spain",
    "Dubai, UAE",
    "Istanbul, Turkey",
    "Bangkok, Thailand",
    "Sydney, Australia",
    "Los Angeles, USA",
    "Singapore",
    "Hong Kong",
    "Las Vegas, USA",
    "Cancun, Mexico",
    "Amsterdam, Netherlands",
    "Vienna, Austria",
    "Venice, Italy",
    "Rio de Janeiro, Brazil",
    "Cape Town, South Africa",
    "Maui, Hawaii, USA",
    "Santorini, Greece",
    "Phuket, Thailand",
    "Bali, Indonesia",
    "Prague, Czech Republic",
    "San Francisco, USA",
    "Florence, Italy",
    "Berlin, Germany",
    "Madrid, Spain",
    "Cairo, Egypt",
    "Edinburgh, Scotland",
    "Buenos Aires, Argentina",
    "Seoul, South Korea",
    "Lisbon, Portugal",
    "Moscow, Russia",
    "Dublin, Ireland",
    "Marrakech, Morocco",
    "Toronto, Canada",
    "Zurich, Switzerland",
    "Vancouver, Canada",
    "Chicago, USA",
    "Athens, Greece",
    "Melbourne, Australia",
    "Miami, USA",
    "Monaco",
    "Jerusalem, Israel",
    "Budapest, Hungary",
    "Kyoto, Japan",
    "Reykjavik, Iceland",
    "Hanoi, Vietnam",
    "Malverne, New York, USA",
];

//Function to create option elements for the select element
function populateSelectOptions() {
    const selectElement = document.getElementById("destination_select");
    vacationDestinations.forEach(destination => {
        const option = document.createElement("option");
        option.value = destination;
        option.textContent = destination;
        selectElement.appendChild(option);
    });
}

window.onload = populateSelectOptions;