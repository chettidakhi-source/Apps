# Dialysis Tracker

A modern web application for tracking dialysis sessions and patient management, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Session Tracking**: View today's dialysis sessions with real-time status updates
- **Patient Management**: Track patient information and upcoming sessions
- **Statistics Dashboard**: Monitor session statistics and compliance rates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with status indicators

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dialysis-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx     # Button component
│   │   ├── card.tsx       # Card components
│   │   └── badge.tsx      # Badge component
│   └── SessionTracking.tsx # Main session tracking component
└── lib/                   # Utility functions
    └── utils.ts           # Class name utilities
```

## Components

### SessionTracking

The main component that displays:
- Today's dialysis sessions with status indicators
- Session statistics (weekly sessions, cancellations, compliance rate)
- Upcoming sessions for patients

### UI Components

- **Button**: Reusable button with multiple variants
- **Card**: Card layout components for content organization
- **Badge**: Status indicators with color coding

## Customization

### Adding New Sessions

To add new sessions, modify the `sessionsAujourdhui` array in `SessionTracking.tsx`:

```typescript
const sessionsAujourdhui: Session[] = [
  {
    id: 1,
    patient: "Patient Name",
    heure: "08:00",
    duree: "4h",
    status: "En cours", // "En cours", "Programmée", "Terminée"
    poste: "A1"
  }
]
```

### Status Colors

The application uses color-coded status indicators:
- **Green**: Sessions in progress ("En cours")
- **Orange**: Scheduled sessions ("Programmée")
- **Blue**: Completed sessions ("Terminée")

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in `src/components/`
2. Add TypeScript interfaces for data structures
3. Update the main page to include new components
4. Test responsiveness on different screen sizes

## Deployment

The application can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on each push

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
