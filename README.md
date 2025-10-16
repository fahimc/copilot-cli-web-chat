# Copilot CLI Web Chat

A mobile-first web application designed as an AI chatbot interface that runs Copilot CLI commands and displays the output as chat messages. The app resembles the ChatGPT interface and is optimized for mobile devices.

## Features

- 🤖 ChatGPT-style interface
- 📱 Mobile-first responsive design
- 💻 Execute CLI commands through a chat interface
- ⚡ Real-time command execution
- 🎨 Dark theme optimized for readability
- 🔄 Loading indicators and error handling

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Styling**: Custom CSS with mobile-first approach

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/fahimc/copilot-cli-web-chat.git
cd copilot-cli-web-chat
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start both the backend server and frontend development server:

```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:3001`
- Frontend development server on `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter CLI commands in the chat input (e.g., `ls`, `pwd`, `echo "Hello World"`)
3. Press Enter or click the send button
4. View the command output displayed as chat messages

## Example Commands

- `ls` - List files in the current directory
- `pwd` - Print working directory
- `echo "Hello World"` - Display text
- `node --version` - Check Node.js version
- `npm --version` - Check npm version

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Development

- `npm run dev` - Start both frontend and backend servers
- `npm run dev:client` - Start only the frontend server
- `npm run dev:server` - Start only the backend server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Mobile Experience

The application is optimized for mobile devices with:
- Responsive layout that adapts to screen size
- Touch-friendly interface elements
- Optimized font sizes and spacing
- Full-screen chat experience

## Security Note

⚠️ **Warning**: This application executes CLI commands on the server. In a production environment, you should:
- Implement proper authentication
- Restrict allowed commands
- Add rate limiting
- Sanitize user input
- Run commands in a sandboxed environment

## License

This project is licensed under the MIT License - see the LICENSE file for details.
