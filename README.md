# RoastAI-Frontend

Frontend of the RoastAI project, built with **React, TypeScript, and Vite**, providing a clean, modern interface for users to interact with the AI backend.

---

## Project Overview / Purpose
This frontend allows users to:  
- Chat with **SavageBot**, a witty, roast-style AI.  
- Receive humorous responses from the AI based on user input.  
- Browse funny debates and quote remixes.  

It communicates with the RoastAI backend to fetch AI responses and display them in a responsive, stylish interface.

---

## Features
- Interactive **chat with SavageBot**  
- **Funny debates** and quote remix features  
- Fully **responsive UI** with TailwindCSS  
- **Form handling** with React Hook Form  
- Routing handled via **React Router DOM**

---

## Tech Stack
- **Frontend:** React.js, TypeScript, TailwindCSS  
- **Build & Dev Tools:** Vite, ESLint  
- **Libraries:** React Hook Form, Lucide React, Tailwind Scrollbar  

---

## Getting Started

### Prerequisites
- Node.js >= 16
- A running instance of the RoastAI backend
- `.env` file with the following key:

```env
VITE_BACKEND_BASE_URL=<your_backend_api_url>
````

### Installation

```bash
git clone <repo-url>
cd RoastAI-Frontend
npm install
```

### Running Locally

```bash
npm run dev
```

* Starts the development server via Vite.

### Build & Preview

```bash
npm run build      # Builds the production bundle
npm run preview    # Preview the production build locally
```

---

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Type-check & build production    |
| `npm run lint`    | Run ESLint                       |
| `npm run preview` | Preview production build locally |

---

## License

📝 For educational and personal practice only. Fork it, run it, and learn!

---

## Author

Made with ❤️ by Yash
