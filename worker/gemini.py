from google import genai
import os
import re
import ast

def generate_text(mood):

    with open("gemini_key.txt", "r") as file:
        api_key = file.read().strip()

    # Set the API key for the client
    client = genai.Client(api_key=api_key)

    categories = "acaibowls", "bagels", "bakeries", "beer_and_wine", "breweries", "bubbletea", "butcher", "coffee", "coffeeteasupplies", "coffeeroasteries", "convenience", "cupcakes", "customcakes", "delicatessen", "desserts", "distilleries", "diyfood", "donuts", "empanadas", "ethicgrocery", "farmersmarket", "fooddeliveryservices", "foodtrucks", "gelato", "grocery", "icecream", "importedfood", "intlgrocery", "internetcafe", "juicebars", "kombucha", "meaderies", "milkshakebars", "gourmet", "candy", "cheese", "chocolate", "driedfruit", "frozenfood", "healthmarkets", "herbsandspices", "macarons", "meats", "oliveoil", "pastashops", "popcorn", "seafoodmarkets", "tofu", "streetvendors", "sugarshacks", "tea", "torshi", "tortillas", "waterstores", "wineries", "winetastingroom"
    instruction = (
        f"Keep everything healthy.\n"
        f"Here is a list of categories: {categories}. Based on this list, "
        f"recommend all categories and suggested healthy foods for each category for the following prompt: '{mood}'. "
        f"Return the categories lowercased that fit with the prompt, along with suggested foods (plural) and a short description for why they would be good. "
        f"Return the data in a well-formed list (not JSON file) format like this:\n"
        f"keep pattern as follows: {{\"category\": \"acaibowls\", \"foods\": [[\"Acai bowls with spinach and berries\"], [\"Acai bowls with kale and green apple\"]], \"description\": \"Acai bowls offer a refreshing base with antioxidants. Adding spinach or kale provides extra nutrients and meets the 'green' requirement. Berries add hydration and vitamins.\"}} "
        f"make sure foods is structured as a list of lists"
    )

    user_categories = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=[instruction],
    )
    user_categories_text = user_categories.text

    pattern = re.compile(
        r'\{"category": "(.*?)", "foods": (\[\[.*?\]\]), "description": "(.*?)"\}',
        re.DOTALL
    )
    # Find all matches
    places = pattern.findall(user_categories_text)
    categories_ = [place[0] for place in places]
    foods_ = [ast.literal_eval(place[1]) for place in places]
    descriptions_ = [place[2] for place in places]

    return categories_, foods_, descriptions_
