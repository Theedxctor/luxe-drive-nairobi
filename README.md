# 🚗 Luxe Drive Nairobi - Premium Car Rental

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite)](https://vitejs.dev/)

Luxe Drive Nairobi is a premium car rental platform offering luxury vehicles for various occasions including corporate events, weddings, and personal travel. Experience the ultimate in comfort and style with our fleet of high-end vehicles.

## ✨ Features

- 🚘 **Premium Fleet**: Browse our collection of luxury vehicles including executive SUVs, sedans, and vans
- 🔍 **Easy Booking**: Intuitive booking system with real-time availability
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and production builds
- 🔒 **Secure Authentication**: Firebase authentication for secure user accounts
- 📊 **Admin Dashboard**: Manage bookings, vehicles, and users with ease

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm 8+ or Yarn 1.22+
- Firebase account (for authentication and database)
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/luxe-drive-nairobi.git
   cd luxe-drive-nairobi
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🛠️ Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build locally
- `lint` - Run ESLint
- `format` - Format code with Prettier
- `type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── assets/            # Static assets (images, fonts, etc.)
├── components/        # Reusable UI components
├── config/            # Configuration files
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and helpers
├── pages/             # Page components
├── services/          # API and service integrations
├── styles/            # Global styles and themes
└── types/             # TypeScript type definitions
```

## 🔧 Built With

- [React](https://reactjs.org/) - Frontend library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Firebase](https://firebase.google.com/) - Backend services
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Router](https://reactrouter.com/) - Client-side routing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing development experience
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Firebase](https://firebase.google.com/) for the backend services
