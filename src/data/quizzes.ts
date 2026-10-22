import { QuizQuestion } from './courses';

export const quizzes: Record<string, QuizQuestion[]> = {
  'ui-1': [
    {
      id: 'q1',
      question: 'What is the primary purpose of visual hierarchy in UI design?',
      options: [
        'To make the design look more colorful',
        'To guide users\' attention and indicate importance of elements',
        'To reduce the number of elements on a page',
        'To make text harder to read for emphasis'
      ],
      correctIndex: 1,
      explanation: 'Visual hierarchy arranges elements to imply importance, guiding users through content in a logical order based on what matters most.'
    },
    {
      id: 'q2',
      question: 'Which of the following is NOT a core principle of visual hierarchy?',
      options: [
        'Size',
        'Color & Contrast',
        'Animation Speed',
        'Spacing & Proximity'
      ],
      correctIndex: 2,
      explanation: 'The core principles are Size, Color & Contrast, Spacing & Proximity, Alignment, and Repetition. Animation speed is not a foundational hierarchy principle.'
    },
    {
      id: 'q3',
      question: 'When creating visual hierarchy, what should you do first?',
      options: [
        'Choose a color palette',
        'Add animations to all elements',
        'Identify what the user should see first, second, and third',
        'Make all elements the same size for consistency'
      ],
      correctIndex: 2,
      explanation: 'Start by determining the reading order — what\'s most important should be seen first. Then use size, color, and spacing to create that order.'
    },
    {
      id: 'q4',
      question: 'What common mistake do designers make with visual hierarchy?',
      options: [
        'Using too much white space',
        'Making everything the same size',
        'Using too many colors',
        'Adding too many animations'
      ],
      correctIndex: 1,
      explanation: 'Making everything the same size creates a flat layout where nothing stands out. Dramatic size differences are essential for clear communication.'
    },
    {
      id: 'q5',
      question: 'How does whitespace contribute to visual hierarchy?',
      options: [
        'It wastes screen space',
        'It has no effect on hierarchy',
        'It gives elements room to breathe and creates separation between groups',
        'It only matters in print design'
      ],
      correctIndex: 2,
      explanation: 'Whitespace is an active design tool. It creates breathing room, separates content groups, and adds sophistication to a layout.'
    }
  ],
  'react-1': [
    {
      id: 'rq1',
      question: 'What is the recommended approach for building complex UIs in React?',
      options: [
        'Use class inheritance',
        'Use component composition',
        'Put everything in one large component',
        'Use only functional components with no children'
      ],
      correctIndex: 1,
      explanation: 'React uses composition over inheritance. Build complex UIs by combining simpler, focused components together.'
    },
    {
      id: 'rq2',
      question: 'What characterizes a presentational component?',
      options: [
        'It manages state and side effects',
        'It connects to APIs directly',
        'It focuses on how things look and receives data via props',
        'It handles routing'
      ],
      correctIndex: 2,
      explanation: 'Presentational components focus on how things look. They receive data via props and have no side effects or state management.'
    },
    {
      id: 'rq3',
      question: 'According to the Single Responsibility Principle, when should you split a component?',
      options: [
        'When it has more than 50 lines of code',
        'When you need a comment to explain what a section does',
        'When it has more than 3 props',
        'Never — bigger components are more efficient'
      ],
      correctIndex: 1,
      explanation: 'If you need a comment to explain what a section does, it should probably be its own component. Each component should do one thing well.'
    }
  ],
  'fin-1': [
    {
      id: 'fq1',
      question: 'Which financial statement shows revenue, expenses, and profit over a period of time?',
      options: [
        'Balance Sheet',
        'Cash Flow Statement',
        'Income Statement (P&L)',
        'Statement of Equity'
      ],
      correctIndex: 2,
      explanation: 'The Income Statement (Profit & Loss) shows revenue, expenses, and profit over a specific period of time.'
    },
    {
      id: 'fq2',
      question: 'What does "burn rate" measure?',
      options: [
        'How fast revenue is growing',
        'How much cash a company spends per month',
        'How quickly customers churn',
        'The rate of employee turnover'
      ],
      correctIndex: 1,
      explanation: 'Burn rate is how much cash you spend per month. It\'s critical for startups to monitor because it determines how long they can operate.'
    },
    {
      id: 'fq3',
      question: 'How do you calculate runway?',
      options: [
        'Revenue / Expenses',
        'Cash / Burn Rate',
        'Profit × 12',
        'Investment / Revenue'
      ],
      correctIndex: 1,
      explanation: 'Runway = Cash / Burn Rate. It tells you how many months until you run out of money at your current spending rate.'
    }
  ]
};
