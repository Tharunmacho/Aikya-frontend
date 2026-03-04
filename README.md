# Aikya Builders - Frontend Application

Modern, responsive web application for Aikya Builders built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern UI/UX**: Built with React 18 and Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Component Library**: Radix UI components with shadcn/ui
- **Animations**: Smooth animations with Framer Motion
- **CMS Integration**: Dynamic content management
- **Admin Panel**: Comprehensive admin dashboard
- **Authentication**: Secure login and user management
- **Responsive Design**: Mobile-first approach

## 📦 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Routing**: React Router v6
- **State Management**: React Context API

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_backend_api_url
```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── ...            # Feature components
├── pages/             # Page components
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── services/          # API services
├── lib/               # Utility functions
└── assets/            # Static assets
```

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables
5. Deploy

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🔐 Admin Access

Admin panel is available at `/admin-cms` route with proper authentication.

## 📄 License

© 2026 Aikya Builders. All rights reserved.

## 🤝 Contributing

This is a private project. For access or contributions, please contact the development team.
