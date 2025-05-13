# Strata Manager Portal

A comprehensive web application for managing strata-titled apartment buildings in NSW, Australia. This project was built as part of the INFO1111: Computing 1A Professionalism course at the University of Sydney.

## Features

- Landing page with important strata information
- Committee member profiles and contact details
- Bylaws list with searchable accordion interface
- Interactive maintenance request tracking system
- Meeting scheduler with upcoming and past meetings
- Comprehensive contacts directory
- Issue reporting form with both GET and POST submission options
- Serverless edge functions for various strata management operations

## Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/strata-manager.git
   cd strata-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is configured to deploy on Vercel with minimal setup:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect the Next.js configuration and deploy the project

The `vercel.json` file includes configurations for:
- Deployment regions (Sydney)
- Edge function specifications
- Custom headers for security
- Redirects and rewrites
- Cron jobs for scheduled tasks

## Project Structure

- `/src/app`: Main application code (Next.js App Router)
  - `/api`: API routes and edge functions
  - `/committee`, `/bylaws`, etc.: Page components
- `/public`: Static assets (images, placeholder files)

## Serverless Edge Functions

This project includes three serverless edge functions:

1. `/api/greeting`: Returns a personalized greeting based on the time of day and name provided
2. `/api/levy-status`: Fetches and returns levy payment status for a specific lot
3. `/api/redirect-late`: Checks levy status and redirects to appropriate pages based on payment status

## Form Processing

The issue reporting form demonstrates both GET and POST HTTP methods:

- **GET**: Data is appended to the URL as query parameters (visible, can be bookmarked)
- **POST**: Data is sent in the request body (not visible in URL, more secure)

## HTTP Status Codes

The application demonstrates proper use of HTTP status codes:
- 2xx (Success): Request successfully received and processed
- 3xx (Redirection): Client needs to take additional action
- 4xx (Client Error): Client-side error
- 5xx (Server Error): Server-side error

## Contributors

- Your Name - [GitHub Profile](https://github.com/yourusername)

## License

This project is created for educational purposes as part of the INFO1111 course.
