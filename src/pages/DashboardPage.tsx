import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Clock, TrendingUp, RotateCcw, CheckCircle2, Play } from 'lucide-react';
import { courses } from '../data/courses';
import { useProgress } from '../hooks/useProgress';
import { useState } from 'react';

export function DashboardPage() {
  const {
    getCourseCompletion,
    isCourseStarted,
    isCourseCompleted,
    getActiveCourses,
    progress,
    resetProgress,
  } = useProgress();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const activeCourseIds = getActiveCourses();
  const activeCourses = courses.filter(c => activeCourseIds.includes(c.id));

  // Calculate overall stats
  const totalLessonsCompleted = Object.values(progress.courses).reduce((acc, cp) => {
    return acc + Object.values(cp.lessons).filter(l => l.completed).length;
  }, 0);

  const totalCoursesStarted = activeCourseIds.length;
  const totalCoursesCompleted = activeCourses.filter(c => isCourseCompleted(c.id, c.totalLessons)).length;

  const totalQuizzesTaken = Object.values(progress.courses).reduce((acc, cp) => {
    return acc + Object.keys(cp.quizScores).length;
  }, 0);

  const averageQuizScore = (() => {
    const allScores = Object.values(progress.courses).flatMap(cp => Object.values(cp.quizScores));
    if (allScores.length === 0) return 0;
    return Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-2">Your Learning Dashboard</h1>
        <p className="text-ink-500">Track your progress and continue where you left off.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
      >
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-teal-600" />}
          label="Lessons Done"
          value={totalLessonsCompleted.toString()}
          color="teal"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-violet-500" />}
          label="Courses Active"
          value={`${totalCoursesStarted}`}
          color="violet"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5 text-amber-500" />}
          label="Quizzes Taken"
          value={totalQuizzesTaken.toString()}
          color="amber"
        />
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5 text-teal-500" />}
          label="Avg. Quiz Score"
          value={totalQuizzesTaken > 0 ? `${averageQuizScore}%` : '—'}
          color="teal"
        />
      </motion.div>

      {/* Active Courses */}
      {activeCourses.length > 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-ink-900">Continue Learning</h2>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-xs text-ink-400 hover:text-coral-500 transition-colors flex items-center gap-1"
              aria-label="Reset all progress"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {activeCourses.map((course, index) => {
              const completion = getCourseCompletion(course.id, course.totalLessons);
              const completed = isCourseCompleted(course.id, course.totalLessons);
              const completedLessons = Object.values(progress.courses[course.id]?.lessons || {}).filter(l => l.completed).length;

              // Find next lesson
              const nextLessonIndex = course.lessons.findIndex(l => !progress.courses[course.id]?.lessons[l.id]?.completed);
              const nextLesson = nextLessonIndex !== -1 ? course.lessons[nextLessonIndex] : course.lessons[0];

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <div className="bg-white border border-paper-200 rounded-2xl p-4 sm:p-5 hover:border-teal-200 transition-colors">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">{course.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <Link
                            to={`/course/${course.id}`}
                            className="font-semibold text-ink-900 hover:text-teal-700 transition-colors text-sm sm:text-base truncate"
                          >
                            {course.title}
                          </Link>
                          {completed && (
                            <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full">
                              ✓ Done
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-ink-400 mb-3">
                          {course.instructor} · {completedLessons}/{course.totalLessons} lessons
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-ink-500">
                              {completed ? 'Completed!' : 'In progress'}
                            </span>
                            <span className="font-medium text-teal-600">{completion}%</span>
                          </div>
                          <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-teal-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${completion}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Continue Button */}
                        {!completed && (
                          <Link
                            to={`/lesson/${nextLesson.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-teal-700 transition-colors"
                          >
                            <Play className="w-3 h-3" />
                            Continue
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12 sm:py-16 bg-white border border-paper-200 rounded-2xl mb-8"
        >
          <span className="text-5xl mb-4 block">📚</span>
          <h3 className="text-lg font-semibold text-ink-700 mb-2">No courses started yet</h3>
          <p className="text-ink-500 text-sm mb-6 max-w-md mx-auto">
            Browse our course catalog and start your learning journey today.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Explore Courses
          </Link>
        </motion.section>
      )}

      {/* All Courses Overview */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg sm:text-xl font-bold text-ink-900 mb-4">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {courses.map((course, index) => {
            const started = isCourseStarted(course.id);
            const completion = started ? getCourseCompletion(course.id, course.totalLessons) : 0;
            const completed = isCourseCompleted(course.id, course.totalLessons);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link
                  to={`/course/${course.id}`}
                  className="block p-4 bg-white border border-paper-200 rounded-xl hover:border-teal-200 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{course.emoji}</span>
                    <h3 className="font-medium text-sm text-ink-900 group-hover:text-teal-700 transition-colors truncate">
                      {course.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-paper-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          completed ? 'bg-teal-500' : started ? 'bg-teal-400' : 'bg-paper-300'
                        }`}
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                    <span className="text-xs text-ink-400 flex-shrink-0">
                      {!started ? 'Not started' : completed ? '✓ Done' : `${completion}%`}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setShowResetConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Confirm reset progress"
          >
            <h3 className="text-lg font-bold text-ink-900 mb-2">Reset Progress?</h3>
            <p className="text-sm text-ink-500 mb-6">
              This will clear all your progress, quiz scores, and completed lessons. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-paper-100 text-ink-700 rounded-xl text-sm font-medium hover:bg-paper-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="flex-1 px-4 py-2.5 bg-coral-500 text-white rounded-xl text-sm font-medium hover:bg-coral-400 transition-colors"
              >
                Reset All
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const bgColors: Record<string, string> = {
    teal: 'bg-teal-50',
    violet: 'bg-violet-50',
    amber: 'bg-amber-50',
  };

  return (
    <div className={`${bgColors[color] || 'bg-paper-100'} rounded-xl p-3 sm:p-4`}>
      <div className="mb-2">{icon}</div>
      <div className="text-xl sm:text-2xl font-bold text-ink-900">{value}</div>
      <div className="text-xs text-ink-500">{label}</div>
    </div>
  );
}
