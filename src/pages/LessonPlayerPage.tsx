import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Circle,
  Clock, Trophy, ChevronDown, ChevronUp, Menu, X, BookOpen
} from 'lucide-react';
import { getCourseByLessonId } from '../data/courses';
import { useProgress } from '../hooks/useProgress';
import { quizzes } from '../data/quizzes';

export function LessonPlayerPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const result = getCourseByLessonId(lessonId || '');
  const { markLessonComplete, isLessonCompleted, getCourseCompletion } = useProgress();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonId]);

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="text-5xl mb-4 block">😕</span>
        <h2 className="text-xl font-semibold text-ink-700 mb-2">Lesson not found</h2>
        <Link to="/" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
          Browse courses
        </Link>
      </div>
    );
  }

  const { course, lessonIndex } = result;
  const lesson = course.lessons[lessonIndex];
  const isCompleted = isLessonCompleted(course.id, lesson.id);
  const hasQuiz = !!quizzes[lesson.id];
  const completion = getCourseCompletion(course.id, course.totalLessons);

  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  const handleMarkComplete = () => {
    markLessonComplete(course.id, lesson.id);
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && prevLesson) {
      navigate(`/lesson/${prevLesson.id}`);
    } else if (e.key === 'ArrowRight' && nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="main"
    >
      {/* Mobile Outline Toggle */}
      <div className="lg:hidden sticky top-14 z-40 bg-paper-50 border-b border-paper-200 px-4 py-3">
        <button
          onClick={() => setOutlineOpen(!outlineOpen)}
          className="flex items-center gap-2 w-full text-sm font-medium text-ink-700"
          aria-expanded={outlineOpen}
          aria-controls="lesson-outline"
        >
          <Menu className="w-4 h-4" />
          <span className="flex-1 text-left">
            Lesson {lessonIndex + 1} of {course.totalLessons}
          </span>
          <span className="text-xs text-teal-600 font-medium">{completion}% complete</span>
          {outlineOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Mobile Outline Dropdown */}
        <AnimatePresence>
          {outlineOpen && (
            <motion.div
              id="lesson-outline"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <nav className="pt-3 pb-1 space-y-1" aria-label="Course outline">
                {course.lessons.map((l, i) => {
                  const completed = isLessonCompleted(course.id, l.id);
                  const isCurrent = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      to={`/lesson/${l.id}`}
                      onClick={() => setOutlineOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isCurrent
                          ? 'bg-teal-50 text-teal-700 font-medium'
                          : completed
                          ? 'text-ink-500 hover:bg-paper-100'
                          : 'text-ink-600 hover:bg-paper-100'
                      }`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-ink-300 flex-shrink-0" />
                      )}
                      <span className="truncate">{l.title}</span>
                      <span className="ml-auto text-xs text-ink-400 flex-shrink-0">{l.duration}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0 border-r border-paper-200 bg-paper-50 overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
        <div className="p-5">
          {/* Course Info */}
          <Link
            to={`/course/${course.id}`}
            className="flex items-center gap-2 text-sm text-ink-500 hover:text-teal-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="truncate">{course.title}</span>
          </Link>

          {/* Progress */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-ink-500">Progress</span>
              <span className="font-medium text-teal-600">{completion}%</span>
            </div>
            <div className="h-1.5 bg-paper-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-teal-500 rounded-full"
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Lesson List */}
          <nav aria-label="Course outline">
            <h3 className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-3">Lessons</h3>
            <div className="space-y-1">
              {course.lessons.map((l, i) => {
                const completed = isLessonCompleted(course.id, l.id);
                const isCurrent = l.id === lesson.id;
                const hasQuizLesson = !!quizzes[l.id];
                return (
                  <Link
                    key={l.id}
                    to={`/lesson/${l.id}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isCurrent
                        ? 'bg-teal-50 text-teal-700 font-medium border border-teal-200'
                        : completed
                        ? 'text-ink-500 hover:bg-paper-100'
                        : 'text-ink-600 hover:bg-paper-100'
                    }`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {completed ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    ) : (
                      <Circle className={`w-4 h-4 flex-shrink-0 ${isCurrent ? 'text-teal-400' : 'text-ink-300'}`} />
                    )}
                    <span className="truncate flex-1">{l.title}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {hasQuizLesson && <Trophy className="w-3 h-3 text-violet-400" />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Lesson Header */}
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-ink-400 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Lesson {lessonIndex + 1} of {course.totalLessons}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-2">{lesson.title}</h1>
            <div className="flex items-center gap-4 text-sm text-ink-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {lesson.duration}
              </span>
              {hasQuiz && (
                <span className="flex items-center gap-1 text-violet-500">
                  <Trophy className="w-4 h-4" />
                  Includes quiz
                </span>
              )}
            </div>
          </motion.header>

          {/* Lesson Content */}
          <motion.article
            key={lesson.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="lesson-content mb-8"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          {/* Completion & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="border-t border-paper-200 pt-6 space-y-4"
          >
            {/* Mark Complete Button */}
            <AnimatePresence mode="wait">
              {isCompleted || justCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-4 py-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-700 font-medium text-sm"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Lesson completed!
                </motion.div>
              ) : (
                <motion.button
                  key="mark-complete"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleMarkComplete}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark as Complete
                </motion.button>
              )}
            </AnimatePresence>

            {/* Quiz Link */}
            {hasQuiz && (
              <Link
                to={`/quiz/${lesson.id}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-50 border border-violet-200 text-violet-700 rounded-xl text-sm font-medium hover:bg-violet-100 transition-colors"
              >
                <Trophy className="w-4 h-4" />
                Take the Quiz
              </Link>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              {prevLesson ? (
                <Link
                  to={`/lesson/${prevLesson.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-ink-600 hover:text-ink-900 bg-white border border-paper-200 rounded-xl hover:border-ink-300 transition-all"
                  aria-label={`Previous lesson: ${prevLesson.title}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Link>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <Link
                  to={`/lesson/${nextLesson.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors"
                  aria-label={`Next lesson: ${nextLesson.title}`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to={`/course/${course.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition-colors"
                >
                  Back to Course
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
