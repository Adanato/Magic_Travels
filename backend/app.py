from flask import Flask, jsonify, request, render_template

# Custom code imports
from generation import get_accommodation, get_activities, get_dining_options

app = Flask(__name__)

@app.route('/api/generate', methods=['GET'])
def get_destinations():
    # Get the 'destination' and 'days' parameters from the URL
    destination = request.args.get('destination')
    days = request.args.get('days', type=int)
    
    # Check if the parameters are provided
    if not destination or not days:
        return jsonify({"error": "Missing required parameters: 'destination' and/or 'days'"}), 400

    # Get the location suggestions
    accommodation = get_accommodation(destination, days)
    activities = get_activities(destination, days)
    dining_options = get_dining_options(destination, days)
    
    # Process the location data to fit the required JSON structure
    itinerary = {
        "place_name": destination,
        "duration_of_trip": days,
        "accommodation": accommodation,
        "activities": activities,
        "dining_options": dining_options
    }
    
    # Return the structured itinerary as a JSON response
    return jsonify(itinerary)

@app.route('/generate')
def generate():
    return render_template('generate.html')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)