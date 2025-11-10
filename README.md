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

## 🚀 Deployment Guide

### Prerequisites
- Node.js 16+ and npm 8+ or Yarn
- SSH access to your server
- Nginx installed on the server
- Domain name pointed to your server's IP

### 1. Build the Project

First, build the production version of your application:

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This will create a `dist` directory with all the production-ready files.

### 2. Deploy to Server

#### Option 1: Manual Deployment

1. **Copy files to server**:
   ```bash
   scp -i ~/.ssh/vps-lab_key.pem -r /path/to/luxe-drive-nairobi/dist/* keith_austine@102.37.217.64:~/dist/
   ```

2. **SSH into your server**:
   ```bash
   ssh -i ~/.ssh/vps-lab_key.pem keith_austine@102.37.217.64
   ```

3. **Move files to web directory**:
   ```bash
   sudo cp -r ~/dist/* /var/www/html/
   sudo chown -R www-data:www-data /var/www/html
   sudo chmod -R 755 /var/www/html
   ```

#### Option 2: Automated Deployment Script

1. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

### 3. Nginx Configuration

Create a new Nginx configuration file for your site:

```bash
sudo nano /etc/nginx/sites-available/luxedrivekenya.me
```

Add the following configuration (adjust as needed):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name luxedrivekenya.me www.luxedrivekenya.me;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable the site and test the configuration:

```bash
sudo ln -s /etc/nginx/sites-available/luxedrivekenya.me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain and install certificate
sudo certbot --nginx -d luxedrivekenya.me -d www.luxedrivekenya.me

# Test automatic renewal
sudo certbot renew --dry-run
```

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
