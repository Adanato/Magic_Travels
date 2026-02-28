import json
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def get_accommodation(destination, days):
    prompt = (
        f"Provide accommodation details for a {days}-day vacation in {destination} in JSON format. "
        "The response should strictly follow this format and include the following fields:\n"
        '[\n'
        '    {\n'
        '        "name": "Hotel Name",\n'
        '        "address": "Hotel Address",\n'
        '        "description": "Hotel Description"\n'
        '    }\n'
        ']\n'
        "Do not include any additional text or explanations."
    )
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-4",
    )

    clean_json_string = response.choices[0].message.content.strip("```json").strip("```").strip()
    return json.loads(clean_json_string)

def get_activities(destination, days):
    prompt = (
        f"Provide a list of activities for a {days}-day vacation in {destination} in JSON format. "
        "Each day should have two activities with 'title' and 'description'. "
        "The response should strictly follow this format:\n"
        '[\n'
        '    {\n'
        '        "day": 1,\n'
        '        "activities": [\n'
        '            {\n'
        '                "title": "Activity Title",\n'
        '                "description": "Activity Description"\n'
        '            },\n'
        '            {\n'
        '                "title": "Activity Title",\n'
        '                "description": "Activity Description"\n'
        '            }\n'
        '        ]\n'
        '    },\n'
        '    ...\n'
        ']\n'
        "Do not include any additional text or explanations."
    )

    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-4",
    )

    clean_json_string = response.choices[0].message.content.strip("```json").strip("```").strip()
    return json.loads(clean_json_string)

def get_dining_options(destination, days):
    prompt = (
        f"Provide a list of dining options for a {days}-day vacation in {destination} in JSON format. "
        "Each day should have two dining options with 'name' and 'description'. "
        "The response should strictly follow this format:\n"
        '[\n'
        '    {\n'
        '        "day": 1,\n'
        '        "dining": [\n'
        '            {\n'
        '                "name": "Restaurant Name",\n'
        '                "description": "Restaurant Description"\n'
        '            },\n'
        '            {\n'
        '                "name": "Restaurant Name",\n'
        '                "description": "Restaurant Description"\n'
        '            }\n'
        '        ]\n'
        '    },\n'
        '    ...\n'
        ']\n'
        "Do not include any additional text or explanations."
    )

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": prompt},
        ]
    )

    clean_json_string = response.choices[0].message.content.strip("```json").strip("```").strip()
    return json.loads(clean_json_string)
