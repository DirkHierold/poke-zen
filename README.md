# 🧘‍♂️ PokeZen

> **"Secure your Pokedex through absolute Zen. One stray swipe, and your Pokéball shatters."**

PokeZen is a brutal, gamified focus timer designed to break digital dopamine addiction using the mechanics of early monochrome handheld gaming. It forces you into a state of absolute presence by chaining your Pokedex progression to your ability to leave your phone untouched.

Unlike traditional productivity apps that gently nudge you to stay focused, PokeZen enforces strict, unyielding rules: **If you leave the tab, switch apps, check a notification, or trigger a system lock, your Pokéball is instantly destroyed, leaving you with nothing but a permanent error screen.**

---

## 🕹️ The Core Principle: Capture or Break

PokeZen uses the smartphone browser's background limitations as a harsh gameplay mechanic. 

1. **The Pokedex Grid:** The home screen displays a clean, minimalist retro grid showing your caught monsters. Locked entries remain hidden behind a mystery symbol (`0.png`).
2. **The Pokéball Overlay:** Tapping the **Fangen** button triggers the ritual. A massive Pokéball overlay (`poke-ball.png`) appears alongside a relentless countdown.
3. **The OLED Eco Mode:** Pressing the **Zen** button in the footer dims the app into a pitch-black, battery-saving mode. Only a white line-art Pokéball (center band, button and hinge) remains, wiggling like the colored one, plus a dimmed footer with a single **Zurück** button that returns to the catch view.
4. **The Back Button:** While catching, a **Zurück** button is available. Pressing it asks for confirmation and warns that the Pokémon will flee. Confirming ("Fliehen lassen") counts as a failure; "Weiter fangen" resumes the session.
5. **Consistent Layout:** Every screen except Zen mode shows the home header and an opaque background. Results are announced with "Du hast ein neues Pokemon gefangen!" or "Das Pokemon ist geflohen!".
6. **Consistent Footer:** All buttons (Fangen, Zurück, Weiter fangen, Fliehen lassen, Zen, Reset?) live in the footer at the bottom, exactly like on the home screen. After a failure, success or when viewing a Pokémon, tap **Zurück** in the footer to return; tapping the screen does nothing.
7. **The Verdict:** 
   - **Success (✓):** Complete the timer to successfully open the Pokéball. The application flashes green, and the random retro monster is permanently slotted into your grid with a green highlight.
   - **Failure (✕):** Switching apps or minimizing the browser instantly turns the border red, shatters the catch, and forces you to stare at the back-sprite of the monster (`_back.png`) you failed to capture. The timer freezes as unmerciful proof of your distraction.

---

## ⚙️ Features

- 🧘 **True Mindfulness:** No texts, no icons, no clutter. Designed to be monitored purely out of the corner of your eye.
- 📱 **OLED Power Saver:** Intuitively dim the entire application with the **Zen** button during a session to lock all pixels to pure black.
- 🔒 **Anti-Cheat Protection:** Uses native state-saving (`localStorage`). If you force-close or refresh the web app mid-session, the app registers a malicious exit and greets you with a shattered screen upon your return.
- 🌐 **100% Self-Hosted & Local:** No external API dependencies. All sprites and visual states are served directly from your repository, making the app entirely immune to network latency, server downtime, or CORS blocks.
- 📲 **PWA Optimization:** Designed to be added directly to your iPhone Home Screen via Safari (`Add to Home Screen`) for an immersive, borderless fullscreen console experience.

---

## 🚀 Development & Assets

Built with Vite, React, TypeScript, Tailwind CSS 4 and shadcn/ui (same stack as MathFeed). The header offers a light/dark theme toggle.

```bash
npm install
npm run dev     # local dev server
npm run build   # type-check + production build
```

**Test mode (dev server only):** it is active automatically with `npm run dev` (add `?notest` to disable) and gives a 10-second catch timer and a prefilled Pokedex (if empty), so every state can be tested instantly. It has no effect in production builds.

Static assets live in `public/`: `poke-ball.png`, `pokezen-icon.png`, `showdown/[id].gif` (front sprites) and `showdown/back/[id].gif` (back sprites shown on failure).

---

## 📜 License

This project is open-source. Cultivate your focus, guard your Pokéballs, and complete the Dex.
