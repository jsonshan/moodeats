# Welcome to moodeats

# Table of Contents

- [moodeats](#moodeats)
- [Technologies](#technologies)
- [Functionality](#functionality)
- [Installation](#installation)

## moodeats

moodeats is a meal finder app that not only helps improve mood but also offers a practical solution for finding healthy meals nearby. By combining location-based recommendations with mood-driven suggestions, moodeats was born—aiming to reduce stress and provide a personalized dining experience. This project was made in HackNYU 2025 for the Lifestyle & Health Track.

## Technologies

This project is created with:

- Vite (React)
- Node
- Python
- Flask

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the needed dependencies

```bash
pip install flask flask-cors
pip install -q -U google-genai
pip install python-dotenv
npm -i
```

Create .env file with:

```bash
GEMINI_KEY=your_gemini_key_here
YELP_API_KEY=your_yelp_key_here
GOOGLE_MAPS_KEY=your_google_maps_key_here
```

## Usage

Run:

```
npm run dev
```
