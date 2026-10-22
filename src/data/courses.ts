export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  subject: 'design' | 'programming' | 'business';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  totalLessons: number;
  lessons: Lesson[];
  tags: string[];
  emoji: string;
}

export const courses: Course[] = [
  {
    id: 'ui-fundamentals',
    title: 'UI Design Fundamentals',
    description: 'Master the core principles of user interface design — from color theory and typography to layout systems and visual hierarchy. Build a strong foundation for creating beautiful, usable digital products.',
    instructor: 'Sarah Chen',
    instructorAvatar: '👩‍🎨',
    subject: 'design',
    difficulty: 'beginner',
    duration: '4h 30min',
    totalLessons: 5,
    emoji: '🎨',
    tags: ['UI', 'Visual Design', 'Typography', 'Color Theory'],
    lessons: [
      {
        id: 'ui-1',
        title: 'Introduction to Visual Hierarchy',
        duration: '12 min',
        content: `<h2>What is Visual Hierarchy?</h2>
<p>Visual hierarchy is the arrangement of elements in a way that implies importance. It influences the order in which users perceive information, guiding their attention through a design.</p>

<h3>Why It Matters</h3>
<p>Without visual hierarchy, every element on a page competes for attention equally. Users become overwhelmed and struggle to find what they need. Good hierarchy creates a clear path through your content.</p>

<h3>The Core Principles</h3>
<ul>
<li><strong>Size</strong> — Larger elements attract more attention. Use size to indicate importance.</li>
<li><strong>Color & Contrast</strong> — High-contrast elements stand out. Use color strategically to draw the eye.</li>
<li><strong>Spacing & Proximity</strong> — Related items grouped together feel connected. White space gives elements room to breathe.</li>
<li><strong>Alignment</strong> — Consistent alignment creates order and guides the eye naturally.</li>
<li><strong>Repetition</strong> — Repeating visual elements creates rhythm and unity.</li>
</ul>

<h3>Applying Hierarchy in Practice</h3>
<p>When designing a page, ask yourself: "What should the user see first? Second? Third?" Then use size, color, and spacing to create that reading order.</p>

<blockquote>Good design is as little design as possible. — Dieter Rams</blockquote>

<p>Start with the most important element — usually the headline or primary action. Make it the largest, boldest element. Then work outward, decreasing visual weight as importance decreases.</p>

<h3>Common Mistakes</h3>
<p>Designers often make everything the same size "just to be safe." This creates a flat, uninteresting layout where nothing stands out. Don't be afraid of dramatic size differences — they're essential for clear communication.</p>`
      },
      {
        id: 'ui-2',
        title: 'Color Theory for Digital Interfaces',
        duration: '15 min',
        content: `<h2>Understanding Color in UI Design</h2>
<p>Color is one of the most powerful tools in a designer's toolkit. It communicates mood, creates hierarchy, and guides user behavior. But using color effectively requires understanding its properties and relationships.</p>

<h3>The Color Wheel</h3>
<p>The color wheel organizes colors into a circular diagram showing relationships between primary, secondary, and tertiary colors. Understanding these relationships helps you create harmonious palettes.</p>

<h3>Color Properties</h3>
<ul>
<li><strong>Hue</strong> — The actual color (red, blue, green, etc.)</li>
<li><strong>Saturation</strong> — The intensity or purity of a color</li>
<li><strong>Brightness/Value</strong> — How light or dark a color is</li>
</ul>

<h3>Building a UI Color Palette</h3>
<p>A good UI palette typically includes:</p>
<ul>
<li><strong>Primary color</strong> — Your brand color, used for key actions and interactive elements</li>
<li><strong>Secondary color</strong> — Supports the primary, used for less prominent elements</li>
<li><strong>Neutral colors</strong> — Grays for text, borders, and backgrounds</li>
<li><strong>Semantic colors</strong> — Green for success, red for errors, yellow for warnings</li>
</ul>

<h3>Accessibility Considerations</h3>
<p>Always ensure sufficient contrast between text and background colors. WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.</p>

<blockquote>Color should never be the only way to communicate information. Always provide additional cues like icons, text, or patterns.</blockquote>`
      },
      {
        id: 'ui-3',
        title: 'Typography Systems',
        duration: '18 min',
        content: `<h2>Typography in Interface Design</h2>
<p>Typography is the foundation of interface design. Since most UI content is text, how you set type directly impacts readability, comprehension, and the overall feel of your product.</p>

<h3>Choosing Typefaces</h3>
<p>For UI design, prioritize legibility over personality. Sans-serif typefaces like Inter, SF Pro, and Roboto work well for most interfaces. Consider pairing a display font for headings with a clean body font.</p>

<h3>Type Scale</h3>
<p>A type scale creates consistent sizing relationships. Use a modular scale (like 1.25 or 1.333 ratio) to generate sizes that feel harmonious:</p>
<pre><code>Base: 16px
Scale (1.25): 16, 20, 25, 31.25, 39px</code></pre>

<h3>Line Height & Spacing</h3>
<ul>
<li>Body text: 1.5–1.7 line height</li>
<li>Headings: 1.1–1.3 line height</li>
<li>Paragraph spacing: 1em margin-bottom</li>
<li>Letter spacing: slightly negative for headings, normal for body</li>
</ul>

<h3>Responsive Typography</h3>
<p>Use fluid typography that scales smoothly between breakpoints. CSS clamp() is perfect for this:</p>
<pre><code>font-size: clamp(1rem, 0.5rem + 2vw, 1.25rem);</code></pre>

<p>This ensures your text is readable on any screen size without abrupt jumps.</p>`
      },
      {
        id: 'ui-4',
        title: 'Layout & Grid Systems',
        duration: '14 min',
        content: `<h2>Creating Structured Layouts</h2>
<p>Grid systems provide the invisible structure that makes layouts feel organized and professional. They create consistency across pages and make responsive design manageable.</p>

<h3>The 12-Column Grid</h3>
<p>The most common grid divides the page into 12 columns. This number is highly divisible (by 2, 3, 4, 6), making it flexible for various layouts.</p>

<h3>Spacing Systems</h3>
<p>Use a consistent spacing scale based on a base unit (typically 4px or 8px):</p>
<ul>
<li>xs: 4px</li>
<li>sm: 8px</li>
<li>md: 16px</li>
<li>lg: 24px</li>
<li>xl: 32px</li>
<li>2xl: 48px</li>
</ul>

<h3>Whitespace as a Design Tool</h3>
<p>Whitespace isn't empty space — it's an active design element. It creates breathing room, separates content groups, and adds sophistication. Don't be afraid of generous margins and padding.</p>

<h3>Mobile-First Grid</h3>
<p>Start with a single column on mobile, then progressively add columns at larger breakpoints. This ensures your layout works everywhere.</p>

<blockquote>The grid is not a cage — it's a guide. Break it intentionally when the content calls for it.</blockquote>`
      },
      {
        id: 'ui-5',
        title: 'Design Patterns & Components',
        duration: '16 min',
        content: `<h2>Reusable Design Patterns</h2>
<p>Design patterns are proven solutions to common interface problems. Learning them helps you make faster decisions and create interfaces that feel familiar to users.</p>

<h3>Navigation Patterns</h3>
<ul>
<li><strong>Top navigation</strong> — Best for 5-7 primary destinations</li>
<li><strong>Sidebar navigation</strong> — Ideal for complex apps with many sections</li>
<li><strong>Tab navigation</strong> — Great for switching between related content views</li>
<li><strong>Bottom navigation</strong> — Mobile-first pattern for 3-5 key destinations</li>
</ul>

<h3>Form Patterns</h3>
<p>Good forms reduce cognitive load:</p>
<ul>
<li>One field per line on mobile</li>
<li>Clear labels above inputs (not inside)</li>
<li>Inline validation with helpful error messages</li>
<li>Progressive disclosure — show only what's needed</li>
</ul>

<h3>Feedback Patterns</h3>
<p>Users need to know the result of their actions:</p>
<ul>
<li><strong>Toast notifications</strong> — Brief, non-blocking messages</li>
<li><strong>Inline feedback</strong> — Validation messages near the relevant field</li>
<li><strong>Progress indicators</strong> — Show ongoing operations</li>
<li><strong>Empty states</strong> — Guide users when there's no content</li>
</ul>

<h3>Building a Component Library</h3>
<p>Start with atomic components (buttons, inputs, badges), compose them into molecules (form fields, cards), then assemble organisms (forms, navigation bars). This atomic design methodology scales beautifully.</p>`
      }
    ]
  },
  {
    id: 'react-mastery',
    title: 'React Development Mastery',
    description: 'Go from React basics to advanced patterns. Learn component architecture, hooks, state management, performance optimization, and real-world application design.',
    instructor: 'Marcus Johnson',
    instructorAvatar: '👨‍💻',
    subject: 'programming',
    difficulty: 'intermediate',
    duration: '6h 15min',
    totalLessons: 5,
    emoji: '⚛️',
    tags: ['React', 'JavaScript', 'Hooks', 'State Management'],
    lessons: [
      {
        id: 'react-1',
        title: 'Component Architecture & Composition',
        duration: '20 min',
        content: `<h2>Thinking in Components</h2>
<p>React applications are built from components — self-contained, reusable pieces of UI. Good component architecture is the foundation of maintainable React apps.</p>

<h3>Component Composition</h3>
<p>Instead of inheritance, React uses composition. Build complex UIs by combining simpler components:</p>
<pre><code>function App() {
  return (
    &lt;Layout&gt;
      &lt;Header /&gt;
      &lt;Main&gt;
        &lt;CourseList courses={courses} /&gt;
      &lt;/Main&gt;
      &lt;Footer /&gt;
    &lt;/Layout&gt;
  );
}</code></pre>

<h3>Presentational vs. Container Components</h3>
<ul>
<li><strong>Presentational</strong> — Focus on how things look. Receive data via props. No side effects.</li>
<li><strong>Container</strong> — Focus on how things work. Manage state and side effects. Pass data down.</li>
</ul>

<h3>The Single Responsibility Principle</h3>
<p>Each component should do one thing well. If a component is getting large, break it into smaller pieces. A good rule: if you need a comment to explain what a section does, it should probably be its own component.</p>

<h3>Props Design</h3>
<p>Design your component APIs carefully:</p>
<ul>
<li>Use descriptive prop names</li>
<li>Provide sensible defaults</li>
<li>Use TypeScript for type safety</li>
<li>Prefer composition over configuration props</li>
</ul>`
      },
      {
        id: 'react-2',
        title: 'Hooks Deep Dive',
        duration: '25 min',
        content: `<h2>Mastering React Hooks</h2>
<p>Hooks let you use state and other React features in function components. Understanding them deeply is essential for modern React development.</p>

<h3>useState — Managing Local State</h3>
<pre><code>const [count, setCount] = useState(0);
// Functional updates for state that depends on previous state
setCount(prev => prev + 1);</code></pre>

<h3>useEffect — Side Effects</h3>
<p>Effects run after render. The dependency array controls when they re-run:</p>
<pre><code>useEffect(() => {
  // Subscribe to something
  const subscription = api.subscribe(handler);
  
  // Cleanup function
  return () => subscription.unsubscribe();
}, [handler]); // Only re-run when handler changes</code></pre>

<h3>useMemo & useCallback — Performance</h3>
<p>Use these when computation is expensive or when passing callbacks to optimized child components:</p>
<pre><code>const sorted = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

const handleClick = useCallback(
  () => doSomething(id),
  [id]
);</code></pre>

<h3>Custom Hooks</h3>
<p>Extract reusable logic into custom hooks. They start with "use" and can call other hooks:</p>
<pre><code>function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}</code></pre>`
      },
      {
        id: 'react-3',
        title: 'State Management Patterns',
        duration: '18 min',
        content: `<h2>Choosing the Right State Approach</h2>
<p>Not all state is equal. The key to good state management is choosing the right tool for each type of state in your application.</p>

<h3>Types of State</h3>
<ul>
<li><strong>Local UI state</strong> — Form inputs, toggles, modals → useState</li>
<li><strong>Shared component state</strong> — Data used by sibling components → Lift up or Context</li>
<li><strong>Server state</strong> — Data from APIs → React Query / SWR</li>
<li><strong>URL state</strong> — Route params, search filters → React Router</li>
<li><strong>Complex app state</strong> — Multi-feature state → Zustand / Redux</li>
</ul>

<h3>Context API</h3>
<p>Context is great for low-frequency updates like themes, auth status, or locale:</p>
<pre><code>const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    &lt;ThemeContext.Provider value={{ theme, setTheme }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
}</code></pre>

<h3>When to Reach for External State</h3>
<p>Consider external state management when:</p>
<ul>
<li>Multiple unrelated components need the same data</li>
<li>State updates frequently and many components depend on it</li>
<li>You need middleware (logging, persistence, etc.)</li>
<li>State logic is complex and benefits from DevTools</li>
</ul>`
      },
      {
        id: 'react-4',
        title: 'Performance Optimization',
        duration: '22 min',
        content: `<h2>Making React Apps Fast</h2>
<p>Performance in React is about minimizing unnecessary work. Understanding React's rendering model helps you write code that's fast by default.</p>

<h3>Understanding Re-renders</h3>
<p>React re-renders a component when:</p>
<ul>
<li>Its state changes</li>
<li>Its parent re-renders (and it receives new props)</li>
<li>A context it consumes changes</li>
</ul>

<h3>React.memo — Preventing Unnecessary Renders</h3>
<pre><code>const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => &lt;ListItem key={item.id} {...item} /&gt;);
});</code></pre>

<h3>Code Splitting</h3>
<p>Use dynamic imports to load components only when needed:</p>
<pre><code>const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
      &lt;Dashboard /&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>

<h3>Virtual Lists</h3>
<p>For long lists (100+ items), use windowing libraries like react-window to only render visible items. This dramatically reduces DOM nodes and improves scroll performance.</p>

<h3>Measuring Performance</h3>
<p>Use React DevTools Profiler to identify slow renders. Look for components that render often or take a long time. Optimize the biggest bottlenecks first.</p>`
      },
      {
        id: 'react-5',
        title: 'Testing React Applications',
        duration: '15 min',
        content: `<h2>Building Confidence with Tests</h2>
<p>Tests give you confidence to change code without fear. A good testing strategy covers different levels of your application.</p>

<h3>The Testing Trophy</h3>
<ul>
<li><strong>Static analysis</strong> — TypeScript, ESLint catch errors before runtime</li>
<li><strong>Unit tests</strong> — Test individual functions and hooks</li>
<li><strong>Integration tests</strong> — Test component interactions</li>
<li><strong>E2E tests</strong> — Test complete user workflows</li>
</ul>

<h3>Testing with React Testing Library</h3>
<p>Test how users interact with your app, not implementation details:</p>
<pre><code>test('submits form with user data', async () => {
  render(&lt;SignupForm /&gt;);
  
  await userEvent.type(screen.getByLabelText(/name/i), 'Alice');
  await userEvent.type(screen.getByLabelText(/email/i), 'alice@test.com');
  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
  
  expect(screen.getByText(/welcome, alice/i)).toBeInTheDocument();
});</code></pre>

<h3>Testing Custom Hooks</h3>
<pre><code>test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => result.current.increment());
  
  expect(result.current.count).toBe(1);
});</code></pre>

<blockquote>Write tests that resemble how your software is used. Focus on user behavior, not implementation details.</blockquote>`
      }
    ]
  },
  {
    id: 'startup-finance',
    title: 'Startup Finance Essentials',
    description: 'Learn the financial fundamentals every founder needs — from reading financial statements to understanding burn rate, runway, and fundraising metrics.',
    instructor: 'Priya Patel',
    instructorAvatar: '👩‍💼',
    subject: 'business',
    difficulty: 'beginner',
    duration: '3h 45min',
    totalLessons: 4,
    emoji: '📊',
    tags: ['Finance', 'Startups', 'Fundraising', 'Metrics'],
    lessons: [
      {
        id: 'fin-1',
        title: 'Reading Financial Statements',
        duration: '18 min',
        content: `<h2>The Three Key Financial Statements</h2>
<p>Every startup needs to understand three fundamental financial documents. They tell the story of your business's financial health.</p>

<h3>Income Statement (P&L)</h3>
<p>Shows revenue, expenses, and profit over a period of time. The key equation:</p>
<pre><code>Revenue - Cost of Goods Sold = Gross Profit
Gross Profit - Operating Expenses = Operating Income
Operating Income - Taxes & Interest = Net Income</code></pre>

<h3>Balance Sheet</h3>
<p>A snapshot of what you own (assets), what you owe (liabilities), and what's left for owners (equity) at a specific moment:</p>
<pre><code>Assets = Liabilities + Equity</code></pre>

<h3>Cash Flow Statement</h3>
<p>Tracks actual cash moving in and out. For startups, this is often the most important statement because <strong>cash is oxygen</strong>.</p>

<h3>Key Metrics to Watch</h3>
<ul>
<li><strong>Gross Margin</strong> — (Revenue - COGS) / Revenue. Aim for 70%+ in SaaS.</li>
<li><strong>Burn Rate</strong> — How much cash you spend per month.</li>
<li><strong>Runway</strong> — Cash / Burn Rate = months until you run out.</li>
<li><strong>ARR/MRR</strong> — Annual/Monthly Recurring Revenue for subscription businesses.</li>
</ul>`
      },
      {
        id: 'fin-2',
        title: 'Unit Economics & Business Models',
        duration: '20 min',
        content: `<h2>Understanding Unit Economics</h2>
<p>Unit economics measure the profitability of a single customer or transaction. If your unit economics don't work at small scale, they won't work at large scale.</p>

<h3>Customer Acquisition Cost (CAC)</h3>
<p>How much you spend to acquire one customer:</p>
<pre><code>CAC = Total Sales & Marketing Spend / Number of New Customers</code></pre>

<h3>Lifetime Value (LTV)</h3>
<p>The total revenue you expect from one customer over their lifetime:</p>
<pre><code>LTV = Average Revenue Per User × Gross Margin / Churn Rate</code></pre>

<h3>The LTV:CAC Ratio</h3>
<p>A healthy SaaS business targets LTV:CAC of 3:1 or higher. Below 1:1 means you lose money on every customer.</p>

<h3>Payback Period</h3>
<p>How long it takes to recover your CAC:</p>
<pre><code>Payback Period = CAC / (Monthly Revenue × Gross Margin)</code></pre>
<p>Aim for under 12 months for SaaS businesses.</p>

<h3>Common Business Models</h3>
<ul>
<li><strong>SaaS Subscription</strong> — Recurring revenue, predictable, high margins</li>
<li><strong>Marketplace</strong> — Takes a percentage of transactions</li>
<li><strong>Freemium</strong> — Free tier converts to paid</li>
<li><strong>Usage-based</strong> — Pay for what you use (APIs, cloud)</li>
</ul>`
      },
      {
        id: 'fin-3',
        title: 'Fundraising & Valuation',
        duration: '22 min',
        content: `<h2>Navigating the Fundraising Process</h2>
<p>Raising capital is a means to an end — growing your business. Understanding the mechanics helps you make better decisions.</p>

<h3>Funding Stages</h3>
<ul>
<li><strong>Pre-seed</strong> — $100K-$500K. Idea stage, friends & family, angels.</li>
<li><strong>Seed</strong> — $500K-$3M. Product-market fit exploration.</li>
<li><strong>Series A</strong> — $3M-$15M. Scaling a proven model.</li>
<li><strong>Series B+</strong> — $15M+. Growth and expansion.</li>
</ul>

<h3>Valuation Methods</h3>
<p>Early-stage valuation is more art than science:</p>
<ul>
<li><strong>Comparables</strong> — What similar companies raised at</li>
<li><strong>Revenue multiples</strong> — More relevant for later stages</li>
<li><strong>DCF</strong> — Discounted cash flow (rarely used for pre-revenue)</li>
<li><strong>Market dynamics</strong> — Supply/demand for the deal</li>
</ul>

<h3>Term Sheet Basics</h3>
<ul>
<li><strong>Pre-money valuation</strong> — Company value before investment</li>
<li><strong>Post-money</strong> — Pre-money + investment amount</li>
<li><strong>Ownership</strong> — Investment / Post-money valuation</li>
<li><strong>Liquidation preference</strong> — Who gets paid first in exit</li>
<li><strong>Option pool</strong> — Shares reserved for future employees</li>
</ul>

<blockquote>Raise money when you don't need it. The best time to fundraise is when you have momentum and options.</blockquote>`
      },
      {
        id: 'fin-4',
        title: 'Financial Planning & Forecasting',
        duration: '16 min',
        content: `<h2>Building a Financial Model</h2>
<p>A financial model is a tool for thinking about your business. It forces you to articulate assumptions and understand how different variables interact.</p>

<h3>Revenue Forecasting</h3>
<p>Start with your growth drivers:</p>
<ul>
<li>How many new customers per month?</li>
<li>What's the average deal size?</li>
<li>What's the churn rate?</li>
<li>How do these change as you scale?</li>
</ul>

<h3>Expense Planning</h3>
<p>Categorize expenses:</p>
<ul>
<li><strong>Fixed costs</strong> — Rent, salaries, software subscriptions</li>
<li><strong>Variable costs</strong> — Server costs, payment processing, support</li>
<li><strong>One-time costs</strong> — Equipment, legal fees, hiring costs</li>
</ul>

<h3>Scenario Planning</h3>
<p>Build three scenarios:</p>
<ul>
<li><strong>Base case</strong> — Most likely outcome</li>
<li><strong>Bull case</strong> — Things go better than expected</li>
<li><strong>Bear case</strong> — Things go worse (plan for this!)</li>
</ul>

<h3>Key Principles</h3>
<p>Your model will be wrong — that's okay. The value is in understanding which assumptions matter most and monitoring them closely. Update regularly and compare actuals to projections.</p>

<blockquote>Plan as if you'll need twice as much money and it'll take twice as long. Then add a buffer.</blockquote>`
      }
    ]
  },
  {
    id: 'advanced-css',
    title: 'Advanced CSS & Animation',
    description: 'Level up your CSS skills with modern layout techniques, custom properties, complex animations, and performance-conscious styling approaches.',
    instructor: 'Alex Rivera',
    instructorAvatar: '🧑‍🎨',
    subject: 'programming',
    difficulty: 'advanced',
    duration: '5h 00min',
    totalLessons: 4,
    emoji: '✨',
    tags: ['CSS', 'Animation', 'Layout', 'Performance'],
    lessons: [
      {
        id: 'css-1',
        title: 'Modern Layout with CSS Grid & Container Queries',
        duration: '20 min',
        content: `<h2>Beyond Flexbox: Advanced Layout</h2>
<p>CSS Grid and Container Queries have transformed how we build responsive layouts. Let's explore techniques that go beyond the basics.</p>

<h3>Grid Subgrid</h3>
<p>Subgrid lets nested elements participate in the parent's grid:</p>
<pre><code>.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 2;
}</code></pre>

<h3>Container Queries</h3>
<p>Style elements based on their container's size, not the viewport:</p>
<pre><code>.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}</code></pre>

<h3>Intrinsic Design</h3>
<p>Let content determine layout using min(), max(), and clamp():</p>
<pre><code>.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 1.5rem;
}</code></pre>

<p>This creates a responsive grid without any media queries!</p>`
      },
      {
        id: 'css-2',
        title: 'CSS Custom Properties & Theming',
        duration: '15 min',
        content: `<h2>Design Tokens with Custom Properties</h2>
<p>CSS custom properties (variables) are the foundation of modern design systems. They enable dynamic theming, consistent spacing, and maintainable code.</p>

<h3>Defining Design Tokens</h3>
<pre><code>:root {
  /* Colors */
  --color-primary: #08c4a6;
  --color-primary-hover: #049e88;
  --color-surface: #fefdfb;
  --color-text: #1a1a1a;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Typography */
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
}</code></pre>

<h3>Dynamic Theming</h3>
<p>Switch themes by changing variables on a parent element:</p>
<pre><code>[data-theme="dark"] {
  --color-surface: #1a1a1a;
  --color-text: #f6f6f6;
}</code></pre>

<h3>Scoped Variables</h3>
<p>Custom properties cascade, so you can scope them to specific components:</p>
<pre><code>.card {
  --card-radius: 12px;
  --card-padding: 1.5rem;
  border-radius: var(--card-radius);
  padding: var(--card-padding);
}</code></pre>`
      },
      {
        id: 'css-3',
        title: 'Animation Performance & Techniques',
        duration: '25 min',
        content: `<h2>Smooth, Performant Animations</h2>
<p>Great animations feel natural and enhance the experience. Bad animations cause jank and frustrate users. The difference comes down to understanding browser rendering.</p>

<h3>The Rendering Pipeline</h3>
<ul>
<li><strong>Style</strong> — Calculate styles for each element</li>
<li><strong>Layout</strong> — Calculate geometry and position</li>
<li><strong>Paint</strong> — Fill in pixels</li>
<li><strong>Composite</strong> — Draw layers to screen</li>
</ul>

<h3>Animating Only Composite Properties</h3>
<p>For 60fps animations, only animate <code>transform</code> and <code>opacity</code>. These skip layout and paint:</p>
<pre><code>/* ✅ Smooth */
.element {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.element:hover {
  transform: translateY(-4px) scale(1.02);
}

/* ❌ Causes jank */
.element:hover {
  width: 120%;
  margin-top: -10px;
}</code></pre>

<h3>View Transitions API</h3>
<p>Native page transitions in the browser:</p>
<pre><code>document.startViewTransition(() => {
  updateDOM();
});</code></pre>

<h3>Scroll-Driven Animations</h3>
<pre><code>@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}</code></pre>

<h3>Respecting User Preferences</h3>
<pre><code>@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}</code></pre>`
      },
      {
        id: 'css-4',
        title: 'CSS Architecture for Scale',
        duration: '18 min',
        content: `<h2>Organizing CSS for Large Projects</h2>
<p>As projects grow, CSS can become a tangled mess. Good architecture keeps styles maintainable, predictable, and performant.</p>

<h3>Methodologies</h3>
<ul>
<li><strong>BEM</strong> — Block__Element--Modifier naming convention</li>
<li><strong>Utility-first</strong> — Tailwind CSS approach, compose with classes</li>
<li><strong>CSS Modules</strong> — Scoped styles per component</li>
<li><strong>CSS-in-JS</strong> — Styled-components, Emotion</li>
</ul>

<h3>The Cascade is a Feature</h3>
<p>Understanding specificity and the cascade helps you write CSS that works with the language, not against it:</p>
<pre><code>/* Specificity: 0-1-0 (one class) */
.button { }

/* Specificity: 0-2-0 (two classes) */
.button.primary { }

/* Specificity: 0-1-1 (one class, one element) */
nav .button { }</code></pre>

<h3>Layered CSS</h3>
<p>The @layer rule gives you explicit control over the cascade:</p>
<pre><code>@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .card-title { font-size: 1.25rem; }
}

@layer utilities {
  .text-lg { font-size: 1.125rem; }
}</code></pre>

<h3>Performance Tips</h3>
<ul>
<li>Minimize selector complexity</li>
<li>Avoid expensive properties in animations</li>
<li>Use <code>content-visibility: auto</code> for off-screen content</li>
<li>Leverage <code>will-change</code> sparingly for known animations</li>
</ul>`
      }
    ]
  },
  {
    id: 'product-strategy',
    title: 'Product Strategy & Discovery',
    description: 'Learn how to discover what users truly need, validate ideas quickly, and build products that create real value. From research to roadmap.',
    instructor: 'Jordan Kim',
    instructorAvatar: '🧑‍💼',
    subject: 'business',
    difficulty: 'intermediate',
    duration: '4h 00min',
    totalLessons: 4,
    emoji: '🎯',
    tags: ['Product', 'Strategy', 'Research', 'Discovery'],
    lessons: [
      {
        id: 'prod-1',
        title: 'User Research Methods',
        duration: '18 min',
        content: `<h2>Understanding Your Users</h2>
<p>Great products start with deep user understanding. Research helps you build what people actually need, not what you assume they want.</p>

<h3>Qualitative Research</h3>
<ul>
<li><strong>User interviews</strong> — 1-on-1 conversations to understand motivations and pain points</li>
<li><strong>Contextual inquiry</strong> — Observe users in their natural environment</li>
<li><strong>Diary studies</strong> — Users log their experiences over time</li>
<li><strong>Usability testing</strong> — Watch users interact with your product</li>
</ul>

<h3>Quantitative Research</h3>
<ul>
<li><strong>Surveys</strong> — Reach many users with structured questions</li>
<li><strong>Analytics</strong> — Behavioral data from your product</li>
<li><strong>A/B testing</strong> — Compare variations with real users</li>
</ul>

<h3>Interview Techniques</h3>
<p>The Mom Test — ask about past behavior, not hypotheticals:</p>
<ul>
<li>❌ "Would you use a tool that...?"</li>
<li>✅ "Tell me about the last time you..."</li>
<li>❌ "How important is X to you?"</li>
<li>✅ "How do you currently handle X?"</li>
</ul>

<blockquote>The goal of an interview is to learn the truth, not to validate your idea.</blockquote>`
      },
      {
        id: 'prod-2',
        title: 'Problem Framing & Opportunity Mapping',
        duration: '20 min',
        content: `<h2>Finding the Right Problem</h2>
<p>The biggest risk in product development isn't building the solution wrong — it's solving the wrong problem. Good problem framing sets you up for success.</p>

<h3>Jobs to Be Done (JTBD)</h3>
<p>Users "hire" products to do a job. Frame problems as jobs:</p>
<pre><code>When [situation], I want to [motivation], 
so I can [expected outcome].</code></pre>

<h3>Opportunity Solution Tree</h3>
<p>Map the space between your desired outcome and potential solutions:</p>
<ul>
<li><strong>Outcome</strong> — What business goal are you working toward?</li>
<li><strong>Opportunities</strong> — User needs, pain points, desires</li>
<li><strong>Solutions</strong> — Features, experiments, changes</li>
</ul>

<h3>Problem Statements</h3>
<p>Write clear problem statements before jumping to solutions:</p>
<ul>
<li>Who has the problem? (user segment)</li>
<li>What is the problem? (specific pain point)</li>
<li>When/where does it occur? (context)</li>
<li>Why does it matter? (impact)</li>
</ul>

<h3>Prioritization Frameworks</h3>
<ul>
<li><strong>Impact/Effort matrix</strong> — Quick wins vs. big bets</li>
<li><strong>RICE scoring</strong> — Reach × Impact × Confidence / Effort</li>
<li><strong>MoSCoW</strong> — Must have, Should have, Could have, Won't have</li>
</ul>`
      },
      {
        id: 'prod-3',
        title: 'MVP & Experimentation',
        duration: '22 min',
        content: `<h2>Building to Learn</h2>
<p>An MVP isn't a half-finished product — it's the smallest thing you can build to test your riskiest assumption. The goal is learning, not launching.</p>

<h3>Types of MVPs</h3>
<ul>
<li><strong>Landing page MVP</strong> — Test demand before building</li>
<li><strong>Concierge MVP</strong> — Manually deliver the service</li>
<li><strong>Wizard of Oz</strong> — Front-end looks automated, human does the work</li>
<li><strong>Piecemeal MVP</strong> — Combine existing tools</li>
<li><strong>Single-feature MVP</strong> — One core feature, done well</li>
</ul>

<h3>Designing Experiments</h3>
<p>Every feature is a hypothesis. Frame them as experiments:</p>
<pre><code>We believe that [change]
will result in [outcome]
We'll know we're right when [measurable signal]</code></pre>

<h3>Validation Metrics</h3>
<ul>
<li><strong>Activation rate</strong> — % of users who reach the "aha moment"</li>
<li><strong>Retention</strong> — Do users come back?</li>
<li><strong>Engagement depth</strong> — How thoroughly do they use it?</li>
<li><strong>Willingness to pay</strong> — Will they give you money?</li>
</ul>

<h3>Pivot or Persevere</h3>
<p>After each experiment, decide: is the evidence strong enough to continue, or should you change direction? Be honest with yourself — sunk cost fallacy kills products.</p>

<blockquote>Fall in love with the problem, not the solution.</blockquote>`
      },
      {
        id: 'prod-4',
        title: 'Roadmapping & Stakeholder Alignment',
        duration: '16 min',
        content: `<h2>Communicating Your Strategy</h2>
<p>A roadmap isn't a feature list with dates — it's a strategic communication tool that aligns your team around outcomes and priorities.</p>

<h3>Roadmap Types</h3>
<ul>
<li><strong>Now / Next / Later</strong> — Simple, flexible, outcome-focused</li>
<li><strong>Outcome-based</strong> — Goals and metrics, not features</li>
<li><strong>Theme-based</strong> — Group work by strategic themes</li>
<li><strong>Date-specific</strong> — Only use when commitments are firm</li>
</ul>

<h3>Stakeholder Management</h3>
<p>Different stakeholders need different information:</p>
<ul>
<li><strong>Executives</strong> — Strategic outcomes, business impact</li>
<li><strong>Product team</strong> — Priorities, rationale, user insights</li>
<li><strong>Engineering</strong> — Technical constraints, dependencies</li>
<li><strong>Sales/Marketing</strong> — Timelines, positioning, competitive context</li>
</ul>

<h3>Saying No Gracefully</h3>
<p>You can't build everything. When saying no:</p>
<ul>
<li>Acknowledge the value of the suggestion</li>
<li>Explain the trade-off (what you'd deprioritize)</li>
<li>Share the framework you're using to decide</li>
<li>Offer an alternative or timeline</li>
</ul>

<h3>Keeping the Roadmap Alive</h3>
<p>Review and update regularly. A roadmap that doesn't change is either perfect (unlikely) or ignored (more likely). Make it a living document that reflects your current understanding.</p>`
      }
    ]
  },
  {
    id: 'typescript-pro',
    title: 'TypeScript for Production Apps',
    description: 'Master TypeScript patterns for real-world applications — generics, utility types, type-safe APIs, and architectural patterns that scale.',
    instructor: 'Marcus Johnson',
    instructorAvatar: '👨‍💻',
    subject: 'programming',
    difficulty: 'advanced',
    duration: '5h 30min',
    totalLessons: 4,
    emoji: '🔷',
    tags: ['TypeScript', 'Generics', 'Types', 'Architecture'],
    lessons: [
      {
        id: 'ts-1',
        title: 'Advanced Generic Patterns',
        duration: '22 min',
        content: `<h2>Generics Beyond the Basics</h2>
<p>Generics are TypeScript's most powerful feature for creating reusable, type-safe code. Let's explore patterns that go far beyond simple <code>T</code>.</p>

<h3>Constrained Generics</h3>
<pre><code>function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 30 };
const name = getProperty(user, 'name'); // type: string</code></pre>

<h3>Conditional Types</h3>
<pre><code>type IsString&lt;T&gt; = T extends string ? true : false;

type A = IsString&lt;'hello'&gt;; // true
type B = IsString&lt;42&gt;;      // false</code></pre>

<h3>Mapped Types</h3>
<pre><code>type Readonly&lt;T&gt; = {
  readonly [P in keyof T]: T[P];
};

type Optional&lt;T&gt; = {
  [P in keyof T]?: T[P];
};

// Custom: make all properties nullable
type Nullable&lt;T&gt; = {
  [P in keyof T]: T[P] | null;
};</code></pre>

<h3>Template Literal Types</h3>
<pre><code>type EventName = 'click' | 'focus' | 'blur';
type Handler = \`\${EventName}Handler\`; 
// 'clickHandler' | 'focusHandler' | 'blurHandler'</code></pre>`
      },
      {
        id: 'ts-2',
        title: 'Type-Safe API Design',
        duration: '20 min',
        content: `<h2>Building APIs That Catch Errors at Compile Time</h2>
<p>TypeScript lets you design APIs that make invalid states unrepresentable. This shifts error detection from runtime to compile time.</p>

<h3>Discriminated Unions</h3>
<pre><code>type Result&lt;T&gt; = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
  | { status: 'loading' };

function handleResult(result: Result&lt;User&gt;) {
  switch (result.status) {
    case 'success':
      console.log(result.data); // TypeScript knows data exists
      break;
    case 'error':
      console.log(result.error); // TypeScript knows error exists
      break;
    case 'loading':
      // No data or error here
      break;
  }
}</code></pre>

<h3>Builder Pattern with Types</h3>
<pre><code>class QueryBuilder&lt;T extends Record&lt;string, unknown&gt; = {}&gt; {
  select&lt;K extends string&gt;(field: K): QueryBuilder&lt;T & { [P in K]: unknown }&gt; {
    return this as any;
  }
  
  where&lt;K extends keyof T&gt;(field: K, value: T[K]): this {
    return this;
  }
}</code></pre>

<h3>Branded Types</h3>
<pre><code>type UserId = string & { __brand: 'UserId' };
type OrderId = string & { __brand: 'OrderId' };

function getUser(id: UserId) { /* ... */ }
function getOrder(id: OrderId) { /* ... */ }

// Can't accidentally pass wrong ID type
getUser(orderId); // TypeScript error!</code></pre>`
      },
      {
        id: 'ts-3',
        title: 'Utility Types & Type Transformers',
        duration: '18 min',
        content: `<h2>TypeScript's Built-in Type Utilities</h2>
<p>TypeScript ships with powerful utility types that transform existing types. Understanding them saves you from reinventing the wheel.</p>

<h3>Essential Utility Types</h3>
<pre><code>// Make all properties optional
type PartialUser = Partial&lt;User&gt;;

// Make all properties required
type FullUser = Required&lt;User&gt;;

// Pick specific properties
type UserPreview = Pick&lt;User, 'id' | 'name'&gt;;

// Exclude specific properties  
type UserWithoutPassword = Omit&lt;User, 'password'&gt;;

// Extract types from a union
type ActiveStatus = Extract&lt;Status, 'active' | 'pending'&gt;;

// Get return type of a function
type UserData = ReturnType&lt;typeof fetchUser&gt;;

// Get parameter types
type FetchParams = Parameters&lt;typeof fetchUser&gt;;</code></pre>

<h3>Creating Custom Utilities</h3>
<pre><code>// Deep partial
type DeepPartial&lt;T&gt; = {
  [P in keyof T]?: T[P] extends object ? DeepPartial&lt;T[P]&gt; : T[P];
};

// Mutable (remove readonly)
type Mutable&lt;T&gt; = {
  -readonly [P in keyof T]: T[P];
};

// Tuple to union
type TupleToUnion&lt;T extends readonly unknown[]&gt; = T[number];</code></pre>

<h3>infer Keyword</h3>
<pre><code>// Extract the element type from an array
type ElementType&lt;T&gt; = T extends (infer U)[] ? U : never;

type Nums = ElementType&lt;number[]&gt;; // number

// Extract resolved type from a Promise
type UnwrapPromise&lt;T&gt; = T extends Promise&lt;infer U&gt; ? U : T;</code></pre>`
      },
      {
        id: 'ts-4',
        title: 'Type-Safe State Machines',
        duration: '20 min',
        content: `<h2>Modeling Complex State with Types</h2>
<p>State machines eliminate impossible states and make transitions explicit. Combined with TypeScript, they create bulletproof state management.</p>

<h3>Basic State Machine</h3>
<pre><code>type PaymentState =
  | { type: 'idle' }
  | { type: 'processing'; transactionId: string }
  | { type: 'success'; receipt: Receipt }
  | { type: 'error'; message: string; retryable: boolean };

type PaymentEvent = 
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS'; receipt: Receipt }
  | { type: 'ERROR'; message: string; retryable: boolean }
  | { type: 'RETRY' };

function reduce(state: PaymentState, event: PaymentEvent): PaymentState {
  switch (true) {
    case state.type === 'idle' && event.type === 'SUBMIT':
      return { type: 'processing', transactionId: generateId() };
    case state.type === 'processing' && event.type === 'SUCCESS':
      return { type: 'success', receipt: event.receipt };
    // TypeScript ensures we handle all valid transitions
  }
}</code></pre>

<h3>Type-Guarded Transitions</h3>
<pre><code>// Only allow valid events for each state
type EventsFor&lt;S extends PaymentState['type']&gt; = 
  S extends 'idle' ? 'SUBMIT' :
  S extends 'processing' ? 'SUCCESS' | 'ERROR' :
  S extends 'error' ? 'RETRY' | 'SUBMIT' :
  never;</code></pre>

<h3>Benefits</h3>
<ul>
<li>Impossible states are unrepresentable</li>
<li>All transitions are explicit and type-checked</li>
<li>Exhaustive switch statements catch missing cases</li>
<li>Easy to test — pure functions with defined inputs/outputs</li>
</ul>

<blockquote>Make impossible states impossible. — Yaron Minsky</blockquote>`
      }
    ]
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(c => c.id === id);
};

export const getCourseByLessonId = (lessonId: string): { course: Course; lessonIndex: number } | undefined => {
  for (const course of courses) {
    const index = course.lessons.findIndex(l => l.id === lessonId);
    if (index !== -1) return { course, lessonIndex: index };
  }
  return undefined;
};
