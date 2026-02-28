document.addEventListener('DOMContentLoaded', function() {
    // Function to get URL parameters
    function getUrlParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(function(pair) {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        });
        return params;
    }

    const params = getUrlParams();
    const destination = params.destination || "example_destination";  // Use URL parameter or default
    const days = params.days || 7;  // Use URL parameter or default
    document.getElementById('place_name').textContent = destination; //CHANGE
    document.getElementById('duration-of-trip').textContent = `Duration of trip: ${days} days`;

    fetch(`/api/generate?destination=${destination}&days=${days}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the entire response for debugging
            
            // Display accommodation details
            const accommodationList = data.accommodation.map((acc, index) => `
                <div>
                    <h3>${acc.name}</h3>
                    <p>${acc.address}</p>
                    <p>${acc.description}</p>
                </div>
            `).join('');
            document.getElementById('accommodation').innerHTML = accommodationList;

            // Display activities
            const activitiesList = data.activities.map((activityDay, dayIndex) => `
                <div>
                    <h4>Day ${activityDay.day}</h4>
                    ${activityDay.activities.map((activity, activityIndex) => `
                        <div>
                            <!-- <h5>Activity ${activityIndex + 1}</h5> -->
                            <p><strong>${activity.title}</strong>: ${activity.description}</p>
                        </div>
                    `).join('')}
                </div>
            `).join('');
            document.getElementById('activities').innerHTML = activitiesList;

            // Display dining options
            const diningList = data.dining_options.map((diningDay, dayIndex) => `
                <div>
                    <h4>Day ${diningDay.day}</h4>
                    ${diningDay.dining.map((dining, diningIndex) => `
                        <div>
                           <!-- <h5>Option ${diningIndex + 1}</h5> -->
                            <p><strong>${dining.name}</strong>: ${dining.description}</p>
                        </div>
                    `).join('')}
                </div>
            `).join('');
            document.getElementById('dining-options').innerHTML = diningList;
        })
        .catch(error => console.error('Error:', error));
});