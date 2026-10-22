import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LessonPlayerPage } from './pages/LessonPlayerPage';
import { DashboardPage } from './pages/DashboardPage';
import { QuizPage } from './pages/QuizPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DiscoveryPage />} />
          <Route path="course/:courseId" element={<CourseDetailPage />} />
          <Route path="lesson/:lessonId" element={<LessonPlayerPage />} />
          <Route path="quiz/:lessonId" element={<QuizPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
