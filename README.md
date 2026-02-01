# Public Chat

A simple public chat application built as a **learning project** to explore real-time communication.

## About
This project was created to learn how real-time messaging works using WebSockets.  
It is **not production-ready** and is intended as a demo / experiment.

## Features
- Real-time public chat
- See when a user **joins** the chat
- See when a user **leaves** the chat
- Auto-scrolls when new messages arrive
- Lightweight and minimal UI

## Tech Stack
**Frontend**
- React
- Axios
- Tailwind CSS

**Backend**
- Node.js
- Express
- Socket.IO

**Hosting**
- Render (free tier)

## Running Locally
1. Clone the repository  
2. Install dependencies for both frontend and backend  
3. Update the **CORS origin** in the backend to your local frontend URL  
4. Start the backend and frontend servers

## Configuration
- No environment variables required
- `.gitignore` is included

## Limitations
- Hosted on Render **free tier**, so the server may take time to wake up
- Refreshing the page disconnects the user
- Old messages are deleted on refresh to avoid server overload
- No database — messages are stored **temporarily in memory**
- No authentication or moderation

## Future Improvements
- Edit or delete your own messages
- Add a database for message persistence
- User profiles
- Friends system
- Direct messages

## License
MIT
