<div align="center">

# Prince Kumar — Portfolio

**Full-Stack Developer · AI/ML Enthusiast**

A fast, responsive developer portfolio built with React and Node.js, with a working contact form that saves messages to MongoDB and sends an instant alert to my phone.

[**Live Site**](https://princekumardev.vercel.app/) · [GitHub](https://github.com/PRINCE77-UI) · [LinkedIn](https://www.linkedin.com/in/prince-kumar-7b9578323/)

</div>

---

## Features

- **Modern dark theme** with a light-theme toggle (your choice is remembered)
- **Hero section** with a typing role animation, resume download and social links
- **Animated stat counters**, scroll-reveal animations and smooth transitions
- **Skills** shown as grouped chips (no made-up percentage bars)
- **Projects** with category filter tabs (Full-Stack / AI-ML), tilt-on-hover cards, tech-stack chips and GitHub links
- **Experience & Education timeline**, plus certifications and courses
- **Resume** section to view or download the PDF
- **Contact form** with validation, success/error feedback, and a copy-email button
- **Instant Telegram notification** on my phone whenever someone sends a message
- **Spam protection** that limits repeated messages from the same email
- **Footer** that shows the visitor's own local time and city
- Responsive from mobile to desktop, keyboard-friendly, reduced-motion support, SEO and Open Graph tags

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React 18, Vite, React Router, plain CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose) |
| Notifications | Telegram Bot API |
| Hosting | Vercel (frontend and API on one site) |

## Project Structure

```
prince-portfolio/
├── api/
│   └── index.js            Vercel entry: sends every /api request to the Express app
├── client/                 React + Vite frontend
│   ├── public/             Favicon, photo, resume PDF
│   └── src/
│       ├── components/     Navbar, Hero, About, Skills, Projects, Journey, Contact, Footer…
│       ├── data/           All content lives here (profile, skills, projects, timeline)
│       ├── hooks/          useTheme, useTyping, useCountUp
│       └── index.css       Design system and styles
├── server/                 Express backend
│   ├── app.js              Express app and routes
│   ├── server.js           Local development entry
│   ├── db.js               MongoDB connection
│   ├── routes/contact.js   Contact form API
│   ├── models/Message.js   Message schema
│   └── utils/notify.js     Telegram notification
├── package.json            Backend dependencies used on Vercel
└── vercel.json             Build and routing config
```

## Run Locally

**Requirements:** Node.js 18 or newer, and a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

**1. Clone the repository**

```bash
git clone https://github.com/PRINCE77-UI/PrincePortfolio.git
cd PrincePortfolio
```

**2. Set up the backend**

```bash
cd server
npm install
```

Create a `server/.env` file:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/prince-portfolio?retryWrites=true&w=majority
PORT=5000
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
ADMIN_KEY=a-long-random-secret
```

Start it:

```bash
npm run dev
```

You should see `MongoDB connected` and `Server running on http://localhost:5000`.

**3. Set up the frontend** (in a second terminal)

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173**. The Vite dev server sends `/api` requests to the backend on port 5000.

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `TELEGRAM_BOT_TOKEN` | Optional | Token of the Telegram bot that sends alerts |
| `TELEGRAM_CHAT_ID` | Optional | Chat that receives the alerts |
| `ADMIN_KEY` | Optional | Secret key used to read saved messages |

If the Telegram values are missing, messages are still saved. Only the alert is skipped.

## Deploy on Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep **Root Directory** as `./` and set **Application Preset** to **Other**.
4. Add the four environment variables above.
5. Click **Deploy**.

Then open `https://<your-site>/api/health`. It should show `"mongo": true` and `"telegram": true`.

> In MongoDB Atlas, allow access from anywhere (`0.0.0.0/0`) under **Network Access**, because Vercel uses changing IP addresses.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Checks that the API is running and configured |
| `POST` | `/api/contact` | Validates and saves a message, then sends the Telegram alert |
| `GET` | `/api/contact` | Lists saved messages (needs the `x-admin-key` header) |
| `GET` | `/api/location` | Returns the visitor's city and country for the footer |

Read the saved messages:

```bash
curl -H "x-admin-key: YOUR_ADMIN_KEY" https://<your-site>/api/contact
```

## Customize the Content

All text lives in `client/src/data/`:

- `profile.js`: name, contact links, intro, about text, stat counters
- `skills.js`: skill groups
- `projects.js`: projects (add a `repo` or `live` link and the buttons appear)
- `timeline.js`: experience, education and certifications

To update the resume, replace `client/public/Prince_Kumar_Resume.pdf` and keep the same file name.

## Contact

**Prince Kumar**
Email: [princekumarsng2005@gmail.com](mailto:princekumarsng2005@gmail.com)
LinkedIn: [prince-kumar](https://www.linkedin.com/in/prince-kumar-7b9578323/)
GitHub: [PRINCE77-UI](https://github.com/PRINCE77-UI)

---

<div align="center">Built with React, Node.js and a lot of chai ☕</div>
