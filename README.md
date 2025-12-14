# HS-RP

A modern, comprehensive FiveM roleplay platform with authentication and shopping functionality.

## Features

- 🎨 Modern, clean and responsive design
- 🔐 Login and registration system with form validation
- 💰 Multiple currency packages (Gold, Silver, Diamond)
- 🛒 Full shopping cart functionality
- 📱 Mobile-friendly interface
- 💾 Cart persistence with localStorage
- 🔗 Ready for Tebex integration

## Structure

The site is organized into two main sections:

### Main Landing Page (`/`)
- Welcome page with hero section
- Login/register forms with client-side validation
- Tab-based navigation between login and register
- Direct link to the store

### Store Section (`/store/`)
- Product browsing interface
- Multiple currency packages:
  - **Gold** - Premium currency for serious players (1,000 - 10,000 Gold)
  - **Silver** - Daily use currency (2,000 - 25,000 Silver)
  - **Diamond** - Exclusive premium currency (100 - 1,000 Diamonds)
- Add to cart functionality
- Cart management
- Checkout preparation (ready for Tebex integration)

## File Structure

```
/
├── index.html          (main landing page with login/register)
├── main.css            (styles for main landing page)
├── main.js             (authentication forms logic)
├── store/
│   ├── index.html      (shop interface)
│   ├── styles.css      (shop styles)
│   └── script.js       (shop functionality)
├── README.md
└── .gitignore
```

## Usage

### For Users
Simply navigate to the site at `https://os-de.github.io/` to access the main page. From there, you can:
- Login to your account (backend integration pending)
- Register a new account (backend integration pending)
- Visit the store to browse and purchase currency packages

### For Development
The site is built with vanilla HTML, CSS, and JavaScript. No build process required.

To run locally:
1. Clone the repository
2. Open `index.html` in a web browser
3. Navigate to `/store/` to view the shop

## Future Integration

- Backend authentication system for login/register functionality
- Tebex payment gateway integration for secure transactions
- User account management and purchase history