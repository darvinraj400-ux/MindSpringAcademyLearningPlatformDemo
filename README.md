# 🎓 Mindspring Academy

An interactive online learning platform for design, programming, and business skills. Built with React, TypeScript, and Tailwind CSS.

![Mindspring Academy](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 📚 Course Discovery
- Browse courses across **Design**, **Programming**, and **Business**
- Filter by difficulty level (Beginner, Intermediate, Advanced)
- Full-text search across titles, descriptions, and tags
- Responsive card grid with progress indicators

### 📖 Course Detail Pages
- Complete course overview with instructor info, duration, and tags
- Full curriculum listing with lesson-by-lesson progress tracking
- Visual progress bar showing completion percentage
- Quick-start button to resume learning

### 🎯 Lesson Player
- Immersive reading experience with optimized typography
- **Desktop**: Persistent sidebar with course outline and progress
- **Mobile**: Collapsible dropdown outline for navigation
- **Keyboard navigation**: Arrow keys to move between lessons
- Mark lessons as complete with animated feedback
- Direct links to associated quizzes

### 🧠 Interactive Quizzes
- Multiple-choice questions with immediate feedback
- Detailed explanations for each answer
- Score calculation with pass/fail threshold (60%)
- Full answer review after completion
- Auto-marks lessons complete on passing score
- Retry functionality for improvement

### 📊 Learning Dashboard
- Personal statistics at a glance
- Continue-learning cards with progress bars
- Course completion tracking (Not Started / In Progress / Completed)
- Quiz score history and averages
- Reset progress with confirmation modal

### 💾 Progress Persistence
- All progress saved to **localStorage**
- Tracks completed lessons, quiz scores, and course start dates
- Survives page refreshes and browser restarts
- No account required — fully client-side

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript 5.7** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **React Router 6** | Client-side routing (hash-based) |
| **Lucide React** | Icon library |
| **Vite 6** | Build tool & dev server |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mindspring-academy

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Type Checking

```bash
npm run typecheck
```

## 📁 Project Structure

```
src/
├── App.tsx                    # Router setup
├── main.tsx                   # Entry point
├── index.css                  # Global styles & design tokens
├── components/
│   └── Layout.tsx             # Header, navigation, footer
├── pages/
│   ├── DiscoveryPage.tsx      # Course catalog with filters
│   ├── CourseDetailPage.tsx   # Course overview & curriculum
│   ├── LessonPlayerPage.tsx   # Lesson reader with sidebar
│   ├── QuizPage.tsx           # Interactive quiz player
│   └── DashboardPage.tsx      # Personal learning dashboard
├── data/
│   ├── courses.ts             # Course & lesson content data
│   └── quizzes.ts             # Quiz question data
└── hooks/
    └── useProgress.ts         # Progress tracking hook
```

## 📖 Sample Courses

| Course | Subject | Level | Lessons |
|---|---|---|---|
| 🎨 UI Design Fundamentals | Design | Beginner | 5 |
| ⚛️ React Development Mastery | Programming | Intermediate | 5 |
| 📊 Startup Finance Essentials | Business | Beginner | 4 |
| ✨ Advanced CSS & Animation | Programming | Advanced | 4 |
| 🎯 Product Strategy & Discovery | Business | Intermediate | 4 |
| 🔷 TypeScript for Production Apps | Programming | Advanced | 4 |

**Total**: 26 lessons with rich content and 3 interactive quizzes (13 questions)

## 🎨 Design System

### Color Palette
- **Paper tones**: Warm cream/beige backgrounds (`#fefdfb` → `#d4b880`)
- **Teal accents**: Primary interactive color (`#08c4a6` → `#10534b`)
- **Ink**: Text hierarchy from `#f6f6f6` to `#1a1a1a`
- **Semantic**: Coral (errors), Amber (warnings), Violet (quizzes)

### Typography
- **Font**: Inter (400, 500, 600, 700, 800)
- **Body**: 1.0625rem / 1.8 line-height for comfortable reading
- **Headings**: Bold with clear hierarchy (h1 → h2 → h3)

### Motion
- Page transitions with fade + slide
- Staggered card animations
- Progress bar animations
- Button press feedback (scale)
- Respects `prefers-reduced-motion`

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels and roles on interactive elements
- Keyboard navigation (Tab, Arrow keys, Enter/Space)
- Visible focus indicators (teal outline)
- Color contrast meets WCAG 2.1 AA
- Screen reader friendly content structure
- Reduced motion support
- Touch targets ≥ 44×44px

## 📱 Responsive Design

Mobile-first approach supporting:
- **320px** — Small phones
- **375px** — Standard phones
- **390px** — Large phones
- **768px** — Tablets
- **1024px** — Small desktops
- **1280px+** — Wide desktops

## 🧪 Quiz System

Quizzes are associated with specific lessons:

| Lesson | Quiz Questions |
|---|---|
| Introduction to Visual Hierarchy | 5 questions |
| Component Architecture & Composition | 3 questions |
| Reading Financial Statements | 3 questions |

**Scoring**: 
- 60%+ = Pass (auto-marks lesson complete)
- Below 60% = Retry option available
- Full answer review shown after completion

## 🗄️ Data Persistence

Progress is stored in `localStorage` under the key `mindspring-progress`:

```typescript
interface ProgressState {
  courses: {
    [courseId: string]: {
      lessons: {
        [lessonId: string]: {
          completed: boolean;
          completedAt?: string;
        }
      };
      quizScores: {
        [lessonId: string]: number;
      };
      startedAt?: string;
    }
  }
}
```

## 📋 Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome for Android)

## 📄 License

MIT

---

Built with ❤️ for learners everywhere.
