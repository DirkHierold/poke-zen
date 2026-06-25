# 🧘‍♂️ PokeZen

> **"Secure your Pokedex through absolute Zen. One stray swipe, and your Pokéball shatters."**

PokeZen is a brutal, gamified focus timer designed to break digital dopamine addiction using the mechanics of early monochrome handheld gaming. It forces you into a state of absolute presence by chaining your Pokedex progression to your ability to leave your phone untouched.

Unlike traditional productivity apps that gently nudge you to stay focused, PokeZen enforces strict, unyielding rules: **If you leave the tab, switch apps, check a notification, or trigger a system lock, your Pokéball is instantly destroyed, leaving you with nothing but a permanent error screen.**

---

## 🕹️ The Core Principle: Capture or Break

PokeZen uses the smartphone browser's background limitations as a harsh gameplay mechanic. 

1. **The Pokedex Grid:** The home screen displays a clean, minimalist retro grid showing your caught monsters. Locked entries remain hidden behind a mystery symbol (`0.png`).
2. **The Pokéball Overlay:** Tapping the grid triggers the ritual. A massive Pokéball overlay (`egg.png`) appears alongside a relentless countdown.
3. **The OLED Eco Mode:** Tapping the screen during the countdown dims the entire app into a pitch-black, battery-saving mode. Only the tiny outline of the Pokéball remains visible, pulsing softly as a sign of life.
4. **The Verdict:** 
   - **Success (✓):** Complete the timer to successfully open the Pokéball. The application flashes green, and the random retro monster is permanently slotted into your grid with a green highlight.
   - **Failure (✕):** Switching apps or minimizing the browser instantly turns the border red, shatters the catch, and forces you to stare at the back-sprite of the monster (`_back.png`) you failed to capture. The timer freezes as unmerciful proof of your distraction.

---

## ⚙️ Features

- 🧘 **True Mindfulness:** No texts, no icons, no clutter. Designed to be monitored purely out of the corner of your eye.
- 📱 **OLED Power Saver:** Intuitively dim the entire application by tapping anywhere on the screen during a session to lock all pixels to pure black.
- 🔒 **Anti-Cheat Protection:** Uses native state-saving (`localStorage`). If you force-close or refresh the web app mid-session, the app registers a malicious exit and greets you with a shattered screen upon your return.
- 🌐 **100% Self-Hosted & Local:** No external API dependencies. All sprites and visual states are served directly from your repository, making the app entirely immune to network latency, server downtime, or CORS blocks.
- 📲 **PWA Optimization:** Designed to be added directly to your iPhone Home Screen via Safari (`Add to Home Screen`) for an immersive, borderless fullscreen console experience.

---

## 🚀 Asset Structure

To make PokeZen work flawlessly offline on iOS, place your assets directly in the root directory alongside your `index.html`:

- `0.png` — The mystery/locked placeholder for the grid.
- `egg.png` — Your custom Pokéball graphic used during incubation.
- `fail.png` — The broken/error asset.
- `[id].png` — Front sprites of your monsters (e.g., `1.png`, `4.png`, `7.png`, `25.png`).
- `[id]_back.png` — Back sprites shown upon failure (e.g., `1_back.png`, `4_back.png`).

---

## 📜 License

This project is open-source. Cultivate your focus, guard your Pokéballs, and complete the Dex.
