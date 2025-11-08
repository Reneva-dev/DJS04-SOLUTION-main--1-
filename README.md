# 🎧 Podcast Explorer App

## Author  
Reneva Newman

## Module  
DJS05 – Navigation and Routing

---

## 📘 Project Overview  
Podcast Explorer App is a responsive React application that allows users to browse detailed information about podcast shows. Users can search, sort, and filter podcasts by genre, explore seasons and episodes, and view show details on a dedicated page. The app demonstrates dynamic API fetching, state management with React hooks, and a clean, component-based architecture.

This project builds on previous work by extending podcast browsing functionality to include detailed show views and improved UI interactions.

---

## ⚙️ Running the Project Locally

1. **Clone the repository**  
   ```bash
   git clone <repository-url>
   cd <repository-folder>
Install dependencies

bash
Copy code
npm install
Start the development server

bash
Copy code
npm run dev
Open in your browser
Visit the URL displayed in your terminal, typically http://localhost:5173.


## 🧩 Main Features
-Dynamic API Fetching: Fetches live podcast data from https://podcast-api.netlify.app/.

-Show Detail Page: View full podcast information including description, seasons, and episodes.

-Search Bar: Filter podcasts by typing any part of the title with debounced input.

-Genre Filter: Narrow down podcasts by selecting from available genres.

-Sort Options: Sort podcasts by last updated date or title alphabetically.

-Collapsible Seasons & Episodes: Expand seasons to see episodes in a clean, organized manner.

-Loading and Error States: Provides user feedback when data is loading or an error occurs.

-Responsive Design: Works well on different screen sizes.

-Accessible and Semantic HTML: Uses proper form controls and attributes for better accessibility.



## ⚠️ Known Limitations
Pagination is not yet implemented; all podcasts and episodes load in a single view.

Some podcast descriptions or episode details might be incomplete due to API data limitations.

Search, filter, and sort controls are currently separate; combining criteria is basic and can be enhanced.

No offline support or caching implemented.



## 🎯 Project Goals
Utilize React hooks (useState, useEffect) for API data fetching and state management.

Demonstrate reusable, modular component design.

Implement dynamic and interactive UI for podcast browsing.

Provide meaningful feedback with loading and error states.

Follow best practices for clean code and documentation.



## 🧑‍💻 Future Enhancements
Add pagination or infinite scroll for performance with large data sets.

Improve filtering to combine multiple criteria seamlessly.

Add React Router routes for deeper navigation.

Enhance styling with UI frameworks like Tailwind or Material UI.

Add offline support and caching.



## 🪪 License
This project is for educational purposes as part of the DJS05 – Navigation and Routing module.


