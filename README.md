# WhosNext App

A Next.js web application for WhosNextting, similar to Omegle. This app uses the 100ms SDK to handle video and audio connections.

## Features

- WhosNext connections
- Audio and video toggle controls
- "Next" button to find a new chat partner
- Responsive design with Tailwind CSS
- Built with Next.js and TypeScript

## Prerequisites

- Node.js 14.x or higher
- A 100ms account with API credentials

## Setup

1. Clone the repository

```bash
git clone <repository-url>
cd video-chat-app
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_ROOM_ID=your_room_id_here
NEXT_PUBLIC_HMS_ACCESS_KEY=your_access_key_here
HMS_SECRET=your_secret_key_here
```

You can get these credentials from your 100ms dashboard.

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app/page.tsx` - Home page with "Start Chat" button
- `/src/app/chat/page.tsx` - Chat page that connects to a random room
- `/src/app/api/token/route.ts` - API route to generate 100ms token
- `/src/components/VideoChat.tsx` - Component for video chat UI and controls

## Deployment

This app is ready for deployment on Vercel:

```bash
npm run build
```

Or deploy directly to Vercel:

```bash
vercel
```

## License

MIT
