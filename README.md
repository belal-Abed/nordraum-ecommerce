# NORDRAUM E-Commerce

A modern and responsive e-commerce website built as a front-end portfolio project for the German job market.

## Live Demo

[View Live Website](https://belal-abed.github.io/nordraum-ecommerce/)

## Project Preview

### Desktop Preview

![NORDRAUM Desktop Preview](assets/nordraum-desktop.jpg)

### Full Page Preview

![NORDRAUM Full Page Preview](assets/nordraum-fullpage.jpg)

### Additional Preview

![NORDRAUM Additional Preview](assets/nordraum-preview.png)

## Features

- Dynamic products loaded from a REST API
- Product search and category filtering
- Product sorting by price and rating
- Persistent shopping cart using LocalStorage
- Wishlist interactions
- Responsive design for desktop, tablet and mobile
- Smooth animations and micro-interactions
- Loading and empty states
- Fallback product data when the API is unavailable
- Accessible labels and reduced-motion support

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- REST API
- Fetch API
- LocalStorage
- Intersection Observer API
- Responsive Web Design
- Git and GitHub Pages

## Project Structure

```text
nordraum-store/
├── assets/
│   ├── nordraum-desktop.jpg
│   ├── nordraum-fullpage.jpg
│   └── nordraum-preview.png
├── index.html
├── styles.css
├── app.js
├── README.md
└── .gitignore
```

## Run Locally

Clone the repository:

```bash
git clone https://github.com/belal-Abed/nordraum-ecommerce.git
```

Open the project directory:

```bash
cd nordraum-ecommerce
```

Open `index.html` in your browser.

You can also run the project using a local development server such as Live Server in Visual Studio Code.

## API

Product data is loaded from [DummyJSON](https://dummyjson.com/).

The project includes a curated fallback dataset so the interface remains usable if the API is unavailable.

## What I Learned

- Fetching and displaying data from a REST API
- Managing application state with Vanilla JavaScript
- Saving shopping-cart data with LocalStorage
- Building reusable product components with template literals
- Creating responsive layouts with CSS Grid and Flexbox
- Implementing filters, search and sorting
- Adding animations with CSS and Intersection Observer
- Using Git and GitHub for version control and deployment

## Future Improvements

- Product details page
- Multi-step checkout flow
- German and English language switcher
- User authentication
- Automated tests
- Real payment integration

## Author

**Belal Abed**

- [GitHub](https://github.com/belal-Abed)

## Disclaimer

This project was created for portfolio and educational purposes. The checkout is a demonstration and does not process real payments.