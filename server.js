import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const PASSWORD_FILE = path.join(__dirname, "password.json");
const SALT_ROUNDS = 12;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── GET /env ──────────────────────────────────────────────────────────────────
app.get("/env", (_req, res) => {
    res.json(process.env);
});

// ── POST /password ────────────────────────────────────────────────────────────
// Body: { password: "somestring" }
// First call  → hashes + saves → responds { created: true }
// Later calls → compares hash  → responds { match: true/false }
app.post("/password", async (req, res) => {
    const { password } = req.body;

    if (!password || typeof password !== "string" || password.trim() === "") {
        return res.status(400).json({ error: "password field is required" });
    }

    try {
        if (!fs.existsSync(PASSWORD_FILE)) {
            // First time: create the file
            const hash = await bcrypt.hash(password, SALT_ROUNDS);
            fs.writeFileSync(PASSWORD_FILE, JSON.stringify({ hash }, null, 2));
            return res.json({ created: true, message: "Password saved for the first time." });
        }

        // File exists: compare
        const { hash } = JSON.parse(fs.readFileSync(PASSWORD_FILE, "utf8"));
        const match = await bcrypt.compare(password, hash);
        return res.json({ match, message: match ? "Password is correct." : "Wrong password." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong on the server." });
    }
});

app.listen(PORT, () => {
    console.log(`Server checker running → http://localhost:${PORT}`);
});
