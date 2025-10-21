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

## UI Layout (October 2025)

- The main page now uses a 3-column layout on large screens:
  - **Left (1/4 width):** Search results
  - **Middle (1/4 width):** Selected/enriched library card
  - **Right (1/2 width):** Map with overlays
- The map always remains fully visible in the right column, with more space for overlays.
- The selected/enriched library card is always visible in the center column.
- The search results are scrollable in the left column.

## Recent Changes

- Search radio buttons for City, Zip, and County have been removed.
- IMLS link logic fixed: only PUBLIC libraries show the IMLS link, and the link uses the correct FSCSKey format.
- State overlays for Academic/State libraries now use GeoJSON from the glynnbird/usstatesgeojson repo.
- Improved layout for usability and visibility of map and enriched card.

---

Other features and setup remain unchanged.
