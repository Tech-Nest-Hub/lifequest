# 🧭 LifeQuest Vision Document

## 🎮 Overview

**LifeQuest** is a life gamification simulator where your real life becomes an RPG. Every real-world action, task, or habit you complete strengthens your in-game character, motivating you to improve yourself while having fun.

Your character represents *you* — gaining XP, leveling up, and developing skills based on your real-life actions. The app turns productivity, growth, and balance into a game.

---

## ⚙️ Core Concept

* Blend **life productivity tracking** with **RPG-style progression**.
* Transform real-world tasks into quests that reward XP, gold, and stats.
* Visualize personal growth with levels, achievements, and stats.
* Build balance using energy and rest mechanics to prevent burnout.

---

## 🧙‍♂️ Player Flow

### 1. **Sign Up / Onboarding**

* Log in using Google or email.
* On first login, choose your **Race** and **Class**.

  * Race = personality archetype (e.g., Elf, Human, Dwarf)
  * Class = skill archetype (e.g., Fighter, Wizard, Rogue)
* A starter profile and inventory are created automatically.

### 2. **Dashboard (Player Hub)**

Shows all key information:

* **Character Card:** Level, XP, Health, Energy, Stats (STR, INT, CHA, etc.)
* **Current Quests:** Real-life tasks and habits.
* **Inventory:** Tools, items, or boosters.
* **Skills Progress:** Learning, work, fitness, social, etc.
* **Badges & Achievements:** Milestones, streaks, and special accomplishments.

### 3. **Quests (Task System)**

* Add personal tasks (e.g., "Go for a run", "Study for 2 hours").
* Completing tasks grants XP, coins, and skill bonuses.
* Task types influence which stats increase.
* Streaks or quest chains yield bonus rewards.

### 4. **Stats & Growth**

Stats evolve based on activity type:

* **STR** – Physical effort (exercise, chores)
* **INT** – Learning and studying
* **CHA** – Social and communication
* **CON** – Consistency and health
* **WIS** – Mindfulness and reflection
* **DEX** – Creativity and adaptability

### 5. **Economy & Equipment**

* Earn gold by completing quests.
* Spend gold on items that give bonuses or look cool.

  * Examples: "Focus Potion" (restore energy), "Notebook of Wisdom" (boost INT XP)

### 6. **Resting & Energy**

* Every task costs energy.
* Rest, meditation, or sleep refills energy.
* Encourages healthy pacing and balance.

### 7. **Community / Multiplayer (Later Phase)**

* Join guilds or form parties.
* Share or compete on quests.
* Trade items, view leaderboards, and celebrate growth together.

---

## 🧩 Technical Architecture

| Layer       | Purpose                           | Tools                                     |
| ----------- | --------------------------------- | ----------------------------------------- |
| Frontend    | UI, dashboard, interactions       | Next.js (App Router), Tailwind, Shadcn UI |
| Backend     | Game logic and CRUD APIs          | Next.js API Routes                        |
| Database    | Stores users, stats, quests, etc. | PostgreSQL + Prisma ORM                   |
| Auth        | Authentication                    | Supabase Auth                             |
| Realtime    | Sync stats and XP live            | Supabase Realtime                         |
| Storage     | Images, icons, assets             | Supabase Storage                          |
| Logic Layer | XP, leveling, skills              | Server-side utilities                     |

---

## 🗺️ Development Roadmap

### **Phase 1: Foundation**

* ✅ Setup Next.js + Prisma + Supabase
* 🧩 Create schema: Users, Races, Classes, Tasks, Equipment, Badges
* ⚙️ Build APIs: `/api/users`, `/api/tasks`, `/api/races`, `/api/classes`
* 🧠 Implement Auth + Onboarding
* 🎯 Basic dashboard with XP and tasks

### **Phase 2: Gameplay Systems**

* XP & Leveling logic
* Skill categories + progress bars
* Inventory system
* Badges & achievements

### **Phase 3: UI & Engagement**

* Animated dashboard (character card, energy bar)
* Streak tracking and daily quests
* Energy and rest mechanics

### **Phase 4: Multiplayer / Social**

* Guilds and teams
* Shared quests and leaderboards
* Trading and collaboration

### **Phase 5: Expansion**

* Mobile app (React Native / Expo)
* Dynamic theming and music
* AI quest suggestions (based on habits)

---

## 💡 Vision Summary

> "LifeQuest turns your daily grind into an epic adventure. You are the hero — your tasks are quests, your growth is your level-up, and every day you become a stronger version of yourself."
