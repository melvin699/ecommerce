# Price Comparison Website Project

## Overview
This project is a price comparison website designed to help users find the best prices for products across various online retailers.
The website scrapes product information from different sources and displays them in a user-friendly interface,
allowing users to compare prices, read reviews, and make informed purchasing decisions.
(NB) (I ADDED PRODUCTS MANNUALY FOR PRICES I WAS NOT ABLE TO GET API'S FROM OTHER RETAILERS FOR SCRAPPING .BUT THE GENERAL CONCEPT OF PRICE COMPARISON WEBSITE IS HERE)

## Features
- Product Search: Users can search for products by name, category, or brand.
- Price Comparison: The website retrieves prices for the same product from multiple online retailers and displays them side by side for easy comparison.
- Reviews: Users can read reviews and ratings for products from different retailers to gauge the product's quality and reliability.
- User Accounts: Registered users can receive notifications when prices drop or when offers are available.
- Mobile Responsive: The website is optimized for mobile devices, providing a seamless user experience across different screen sizes.

## Technologies Used
- Frontend: HTML, CSS, JavaScript, React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Web Scraping: BeautifulSoup, Scrapy
- Authentication: JWT (JSON Web Tokens)

## Installation
1. Clone the repository: `git clone https://github.com/your_username/price-comparison-website.git`
2. Navigate to the project directory: `cd price-comparison-website`
3. Install dependencies for frontend and backend:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the backend directory and add necessary variables (e.g., MongoDB URI, JWT secret).
5. Start the development server:
   - Frontend: `cd frontend && npm start`
   - Backend: `cd backend && npm start`

## Usage
1. Open the website in your preferred web browser.
2. Use the search bar to find products.
3. Browse through the search results and compare prices from different retailers.
4. Click on a product to view detailed information and reviews.


## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request detailing your changes.


