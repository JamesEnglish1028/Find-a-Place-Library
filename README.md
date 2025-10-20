<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1mCNEoTbtstzcyCGxM0el8Fvn38N8-2_x

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Palace Library Finder

### Search Functionality

- The search bar now includes radio buttons to select which field to search by: Name, FSCS ID, State (Abbreviation), City, Zip, County, or Status.
- When searching by State, enter the state abbreviation (e.g., CA, NY). The search will match only the abbreviation, not the full state name.
- The search logic uses the selected field for partial matches, except for State, which uses exact abbreviation matching.

### How to Use

1. Select the field you want to search by using the radio buttons above the search input.
2. Enter your search term and press 'Search'.
3. Results will be filtered by the selected field.

## Map Overlay Logic

- The app now uses the state abbreviation (`stabbr`) and the library `type` to determine which GeoJSON overlay to load for the map.
- For city libraries, the overlay is loaded from `/cities/{stabbr}/{city}.json` (city name is lowercased, spaces replaced with hyphens).
- For state libraries (type = "State"), the overlay is loaded from `/states/{stabbr}.json`.
- The search bar allows searching by all major fields, including library type.
- The codebase now uses the `RichLibrary` type throughout for correct data access and overlay logic.

---

Other features and setup remain unchanged.
