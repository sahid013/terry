# Terry

A professional Next.js application with modern architecture and best practices.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting
- **OneSignal** - Push notifications and email subscriptions

## Features

- **Subscription Form**: Beautiful, responsive form for collecting user emails
- **OneSignal Integration**: Ready-to-use API integration for push notifications
- **Modern UI Components**: Reusable Button and Input components
- **Type-Safe API Routes**: Backend API endpoints with full TypeScript support
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Mobile-first design that works on all devices

## OneSignal Setup

This project includes a complete OneSignal integration for collecting email subscribers and sending push notifications.

### Quick Setup

1. Copy the environment variables template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get your OneSignal credentials from [OneSignal Dashboard](https://onesignal.com)

3. Add your credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_ONESIGNAL_APP_ID=your_app_id
   ONESIGNAL_REST_API_KEY=your_rest_api_key
   ```

4. Start the development server and test the subscription form

For detailed setup instructions, see [ONESIGNAL_SETUP.md](./ONESIGNAL_SETUP.md)

## Project Structure

```
terry/
├── src/
│   ├── app/                           # Next.js App Router pages
│   │   ├── api/                       # API routes
│   │   │   └── subscribe/             # Subscription endpoint
│   │   │       └── route.ts           # OneSignal subscription handler
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home page
│   │   └── globals.css                # Global styles
│   ├── components/                    # React components
│   │   ├── ui/                        # Reusable UI components
│   │   │   ├── Button.tsx             # Button component
│   │   │   ├── Input.tsx              # Input component
│   │   │   └── index.ts               # Barrel export
│   │   ├── features/                  # Feature-specific components
│   │   │   ├── Hero.tsx               # Hero component
│   │   │   ├── SubscriptionForm.tsx   # Subscription form
│   │   │   └── index.ts               # Barrel export
│   │   └── layouts/                   # Layout components
│   ├── lib/                           # Utility functions
│   │   ├── utils.ts                   # Helper utilities (cn, etc.)
│   │   └── onesignal.ts               # OneSignal API integration
│   ├── types/                         # TypeScript type definitions
│   │   └── index.ts                   # Global types
│   ├── hooks/                         # Custom React hooks
│   ├── constants/                     # Application constants
│   │   └── index.ts                   # App constants
│   └── styles/                        # Additional styles
├── public/                            # Static assets
├── .env.local.example                 # Environment variables template
├── ONESIGNAL_SETUP.md                 # OneSignal setup guide
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Architecture Decisions

### Component Organization

- **ui/**: Generic, reusable UI components (Button, Input, etc.)
- **features/**: Business logic and feature-specific components
- **layouts/**: Page layout components (Header, Footer, Sidebar, etc.)

### Utilities

- **cn() function**: Combines `clsx` and `tailwind-merge` for optimal Tailwind class merging
- **Barrel exports**: Clean imports using index.ts files

### Type Safety

- Strict TypeScript configuration
- Global type definitions in `src/types/`
- Proper typing for components and props

## Best Practices Implemented

1. **TypeScript First**: Full type safety across the application
2. **Component Composition**: Small, reusable components
3. **Barrel Exports**: Clean import statements
4. **Utility Functions**: Helper functions for common operations
5. **Constants Management**: Centralized application constants
6. **Modern Next.js**: Using App Router and Server Components
7. **Tailwind CSS**: Utility-first styling with custom utilities
8. **ESLint**: Code quality and consistency

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
