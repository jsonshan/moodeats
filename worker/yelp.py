import requests 

def get_businesses(location, categories, yelp_key, limit=10):
    # URL to query the Yelp API
    url = f"https://api.yelp.com/v3/businesses/search?location={location}&categories={categories}&sort_by=best_match&limit={limit}&radius=3000"

    headers = {
        "accept": "application/json",
        "authorization": f"Bearer {yelp_key}"
    }

    # Send the GET request to Yelp API
    response = requests.get(url, headers=headers)

    # Initialize a list to store business data
    business_list = []

    # Check if the response is successful
    if response.status_code == 200:
        yelp_data = response.json()

        # Loop through businesses and store their details
        for business in yelp_data["businesses"]:
            name = business['name']
            address = business["location"].get("address1", "No address available")
            lat = business["coordinates"]["latitude"]
            long = business["coordinates"]["longitude"]
            img = business["image_url"]

            # Create a dictionary to hold business information
            business_info = {
                "name": name,
                "address": address,
                "latitude": lat,
                "longitude": long,
                "img": img
            }

            # Add the business info to the business_list
            business_list.append(business_info)
    else:
        print("Error fetching data from Yelp API:", response.status_code)

    # Return the list of businesses
    return business_list