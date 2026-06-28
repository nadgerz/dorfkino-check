# Dorfkino — Server Check

A tiny test app from Steve to confirm your server is ready for the real booking system.

---

## Requirements

- **Node.js** v18 or newer  
  Check with: `node --version`

---

## Setup

```bash
# 1. Unzip the folder, then go into it
cd dorfkino-check

# 2. Install dependencies (needs internet access, only once)
npm install

# 3. Start the server
npm start
```

You should see:

```
Server checker running → http://localhost:3000
```

Open your browser and go to **http://localhost:3000**

---

## What it tests

### Button 1 — Environment Variables

Calls `GET /env` and shows everything in `process.env`.  
This confirms Node.js is running and the server can respond to requests.

### Button 2 — Password (bcrypt)

- **First time:** enter any password → it gets hashed with bcrypt and saved to `password.json`
- **Every time after:** enter the same (or a different) password → it checks the hash and tells you if it matches

This confirms that:

- File read/write works on the server
- bcrypt is installed and functioning

---

## Stopping the server

Press **Ctrl + C** in the terminal.

---

## Notes

- `password.json` is created automatically on first use — you can delete it to reset
- The `node_modules` folder can be deleted and recreated with `npm install` at any time
- Port 3000 is the default; set a `PORT` environment variable to change it
