# Ripple

A lightweight, real-time chat application built with WebSockets and TypeScript. Ripple features a Node.js/Express backend with WebSocket support and a modern React frontend, enabling instant messaging across multiple chat rooms with persistent message history.

## Features

- **Real-time Messaging**: Instant message delivery using WebSockets
- **Multi-room Chat**: Create and switch between multiple chat rooms
- **Message History**: Persistent message storage with SQLite
- **User Management**: Join rooms with a username
- **Room Events**: See when users join/leave rooms
- **Modern UI**: React-based frontend with Materual UI styling

## Project Structure

```
ripple/
├── server/              # Node.js WebSocket server
│   ├── main.ts         # Server entry point
│   ├── handlers.ts     # Message/event handlers
│   ├── clients.ts      # Client connection management
│   ├── db.ts           # SQLite database interface
│   ├── history.ts      # Message history retrieval
│   ├── config.ts       # Server configuration
│   └── types/          # TypeScript type definitions
├── frontend/           # React web application
│   ├── src/
│   │   ├── App.tsx     # Main React component
│   │   ├── Chat.tsx    # Chat interface
│   │   ├── Login.tsx   # Login/room selection
│   │   ├── ChatContext.tsx  # Context API setup
│   │   └── hooks/      # Custom React hooks
│   ├── vite.config.ts  # Vite build configuration
│   └── tsconfig.json   # TypeScript configuration
└── package.json        # Root dependencies & scripts
```

## Tech Stack

**Backend:**
- Node.js with TypeScript
- Express for HTTP server
- WebSocket (ws) for real-time communication
- SQLite (better-sqlite3) for persistent storage

**Frontend:**
- React 18+ with TypeScript
- Vite for fast development and building
- Material UI for component styling
- Vite HMR for instant updates during development

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Keanred/ripple.git
   cd ripple
   ```

2. Install root dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

Start the server and frontend in separate terminals:

**Terminal 1 - Start the server:**
```bash
npm run server
```
The server will start on the port specified in `server/config.ts` (default: 3000)

**Terminal 2 - Start the frontend:**
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`

### Using the Application

1. Open `http://localhost:5173` in your browser
2. Enter your username and room name on the login screen
3. Click "Join Room" to connect
4. Start messaging! Messages are persisted and history is loaded when you join a room
5. Use the room switcher to join different rooms

## Development

### Code Quality

The project uses ESLint and Prettier for code consistency:

```bash
# Root level linting
npm run lint

# Frontend linting
cd frontend
npm run lint
```

### Type Safety

The entire project is written in TypeScript with strict type checking enabled. Type definitions for packets are shared between client and server in `*/types/packetTypes.ts`.

## Project Scripts

### Root (`package.json`)
- `npm run server` - Start the server in watch mode
- `npm run client` - Start a development client (for testing)
- `npm test` - Run tests

### Frontend (`frontend/package.json`)
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## API Protocol

Communication between client and server uses JSON packets over WebSocket:

### Client Packets
- `join` - Join a room with username
- `message` - Send a message to current room
- `switch_room` - Switch to a different room

### Server Packets
- `chat` - Message from another user
- `event` - Room event (user joined/left)
- `history` - Message history on join
- `error` - Error message

## Contributing

For issues and feature requests, please visit the [GitHub repository](https://github.com/Keanred/ripple).
