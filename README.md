# Telegram Mini Apps Starter Template

This project serves as a robust and scalable starter template for building Telegram Mini Apps. It provides an integrated stack for frontend and backend development, with built-in support for wallet connection (TON Connect), analytics (Google Analytics), and a service-repository design pattern for maintainable backend architecture.

## 🚀 Features

-  **Backend:**
   -  Built with TypeScript, Express.js, and Prisma ORM.
   -  PostgreSQL database integration.
   -  Service-Repository design pattern for clear separation of concerns.
   -  Utilities for Telegram bot integration.
-  **Frontend:**
   -  React + TypeScript.
   -  TailwindCSS and ShadCN/UI for modern and responsive designs.
   -  TON Connect for wallet integration.
-  **General:**
   -  Google Analytics integration for tracking user activity.

## 🏗️ Tech Stack

-  **Frontend:** React, TailwindCSS, ShadCN/UI
-  **Backend:** TypeScript, Express.js, Prisma, PostgreSQL
-  **Database:** PostgreSQL
-  **Tooling:** Vite, pnpm
-  **Analytics:** Google Analytics
-  **Wallet Integration:** TON Connect

## 📂 Project Structure

```plaintext
├── backend
│   ├── src
│   │   ├── controllers          # Request handling logic
│   │   ├── repositories         # Data access layer
│   │   ├── services             # Business logic layer
│   │   ├── routes               # API routes
│   │   └── utils                # Helper functions (e.g., Telegram bot utilities)
│   ├── prisma                   # Prisma schema and migrations
│   └── public                   # Static files
├── frontend
│   ├── src
│   │   ├── components           # Reusable UI components
│   │   ├── layout               # Page layouts
│   │   ├── hooks                # Custom React hooks
│   │   ├── lib                  # Utility functions
│   │   └── assets               # Static assets
└── shared
    └── README.md
```

## 🛠️ Getting Started

### Prerequisites

-  Node.js (v18 or higher)
-  PostgreSQL database

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/superXdev/tma-starter.git
   cd tma-starter
   ```

2. **Install dependencies for both backend and frontend:**

   ```bash
   cd backend && pnpm install
   cd ../frontend && pnpm install
   ```

3. **Setup environment variables:**

   -  Create `.env` files in the `backend` and `frontend` directories.
   -  Configure your database connection, Telegram bot token, Google Analytics key, etc.

4. **Run database migrations:**

   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Start the development servers:**
   -  Backend:
      ```bash
      npm run dev
      ```
   -  Frontend:
      ```bash
      cd ../frontend
      npm run dev
      ```

## 🧱 Design Pattern: Service-Repository

The backend is structured to separate responsibilities into three main layers:

1. **Repository Layer:** Handles direct interaction with the database.
   -  Example: `userRepository.ts`
2. **Service Layer:** Contains the business logic.
   -  Example: `userService.ts`
3. **Controller Layer:** Manages API requests and responses.
   -  Example: `userController.ts`

This approach ensures maintainability, scalability, and clear boundaries between layers.

---

## 🤖 Setting Up Mini Apps on BotFather

To test and integrate your Telegram Mini App with a bot, follow these steps:

### **Creating a Bot with BotFather**

1. Open Telegram and search for [**BotFather**](https://t.me/botfather).
2. Start a chat with BotFather and run the `/newbot` command.
3. Follow the instructions to:
   -  Set a bot name (e.g., `MyMiniAppBot`).
   -  Set a unique username (e.g., `MyMiniAppBot`).
4. Once created, BotFather will provide you with an **API token**. Save it securely; you'll need it for integration.
5. Enable the bot for Mini Apps:
   -  Send the command `/newapp` to BotFather.
   -  Select your bot from the list.
   -  Enter the domain URL of your Mini App (this can be a live server or a proxied local server using Ngrok).

## Using Ngrok Configuration for Simplified Local Server Exposure

Ngrok supports a configuration file (`ngrok.yml`) that allows you to automate and simplify exposing your local server.

### 1. **Locate the Ngrok Configuration File**

Ngrok's configuration file is stored in the following paths depending on your operating system:

-  **Linux:** `~/.config/ngrok/ngrok.yml`
-  **MacOS (Darwin):** `~/Library/Application Support/ngrok/ngrok.yml`
-  **Windows:** `%HOMEPATH%\AppData\Local\ngrok\ngrok.yml`

If the file doesn't exist, create it manually.

### 2. **Setup Your Ngrok Configuration**

Edit the `ngrok.yml` file to define a default configuration for your local server. Below is an example configuration to expose a backend running on `http://localhost:5000`:

```yaml
version: "2"
authtoken: YOUR_NGROK_AUTH_TOKEN
tunnels:
   telegram-mini-app:
      addr: 3000
      proto: http
```

#### Key Fields:

-  `authtoken`: Your Ngrok authentication token (obtained from the [Ngrok dashboard](https://dashboard.ngrok.com)).
-  `addr`: The local port your server is running on.
-  `proto`: The protocol (`http` or `https`).

### 3. **Start Ngrok with Configuration**

To expose the server using the configuration file, run the following command:

```bash
ngrok start telegram-mini-app
```

This will automatically:

1. Use the predefined tunnel configuration.
2. Provide you with a public URL (e.g., `https://abcd-1234.ngrok.io`) for your local server.

---

## 🌐 Deployment

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```
2. **Deploy the backend and frontend:**
   -  Use your preferred hosting service for the backend (e.g., AWS, Vercel).
   -  Serve the frontend's `dist` folder using a static hosting service.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/superXdev/tma-starter/issues).

## 📧 Contact

For any inquiries, feel free to reach out:

-  **Email:** fikrizhanking@gmail.com
-  **Telegram:** [@FRDBlock](https://t.me/FRDBlock)
