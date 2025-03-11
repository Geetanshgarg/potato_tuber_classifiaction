# Potato Tuber Disease Classifier

This application allows farmers and agricultural workers to identify diseases in potato plants and tubers using AI-powered image recognition.

## Features

- Upload images of potato plants or tubers
- AI-based disease classification
- Information about common potato diseases
- Treatment recommendations
- User-friendly interface

## Getting Started

Run the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How It Works

1. The frontend is built with Next.js and allows users to upload images
2. Images are sent to your custom backend service for processing
3. The model classifies the image into one of six categories:
   - Early Blight
   - Fungi
   - Healthy
   - Late Blight
   - Pest
   - Virus
4. Results are displayed with confidence scores and treatment recommendations

## Technologies Used

- Next.js for the frontend
- TailwindCSS for styling
- Your custom backend for image processing and classification

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
