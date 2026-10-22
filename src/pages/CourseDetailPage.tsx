import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle2, Circle, Play, Trophy } from 'lucide-react';
import { getCourseById } from '../data/courses';
import { useProgress } from '../hooks/useProgress';
import { quizzes } from '../data/quizzes';

const difficultyColors: Record<string, string> = {
  beginner: 'bg-teal-100 text-teal-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-violet-100 text-violet-700',
};

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = getCourseById(courseId || '');
  const { getCourseCompletion, isLessonCompleted, isCourseStarted, isCourseCompleted, startCourse, getQuizScore } = useProgress();

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="text-5xl mb-4 block">😕</span>
        <h2 className="text-xl font-semibold text-ink-700 mb-2">Course not found</h2>
        <p className="text-ink-500 mb-6">The course you're looking for doesn't exist.</p>
        <Link to="/" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
          Browse all courses
        </Link>
      </div>
    );
  }

  const completion = getCourseCompletion(course.id, course.totalLessons);
  const started = isCourseStarted(course.id);
  const completed = isCourseCompleted(course.id, course.totalLessons);

  // Find the next incomplete lesson
  const nextLessonIndex = course.lessons.findIndex(l => !isLessonCompleted(course.id, l.id));
  const nextLesson = nextLessonIndex !== -1 ? course.lessons[nextLessonIndex] : course.lessons[0];

  const handleStartCourse = () => {
    startCourse(course.id);
    navigate(`/lesson/${nextLesson.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 mb-6 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      {/* Course Header */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl border border-paper-200 p-6 sm:p-8 mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          <span className="text-5xl sm:text-6xl" role="img" aria-hidden="true">{course.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[course.difficulty]}`}>
                {course.difficulty}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-paper-200 text-ink-600 capitalize">
                {course.subject}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">{course.title}</h1>
            <p className="text-ink-500 leading-relaxed mb-4">{course.description}</p>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-ink-500 mb-4">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {course.totalLessons} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-base">{course.instructorAvatar}</span>
                {course.instructor}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {course.tags.map(tag => (
                <span key={tag} className="text-xs bg-paper-100 text-ink-500 px-2.5 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>

            {/* Progress */}
            {started && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-ink-500">
                    {completed ? (
                      <span className="flex items-center gap-1.5 text-teal-600 font-medium">
                        <Trophy className="w-4 h-4" /> Course completed!
                      </span>
                    ) : 'In progress'}
                  </span>
                  <span className="font-semibold text-teal-600">{completion}%</span>
                </div>
                <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartCourse}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-medium text-sm sm:text-base hover:bg-teal-700 transition-colors shadow-sm"
            >
              <Play className="w-4 h-4" />
              {completed ? 'Review Course' : started ? 'Continue Learning' : 'Start Course'}
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* Curriculum */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-xl font-bold text-ink-900 mb-4">Curriculum</h2>
        <div className="space-y-2">
          {course.lessons.map((lesson, index) => {
            const isCompleted = isLessonCompleted(course.id, lesson.id);
            const hasQuiz = !!quizzes[lesson.id];
            const quizScore = getQuizScore(course.id, lesson.id);

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Link
                  to={`/lesson/${lesson.id}`}
                  className={`block p-4 sm:p-5 rounded-xl border transition-all duration-200 hover:border-teal-300 hover:shadow-md ${
                    isCompleted
                      ? 'bg-teal-50/50 border-teal-200'
                      : 'bg-white border-paper-200'
                  }`}
                  aria-label={`Lesson ${index + 1}: ${lesson.title}${isCompleted ? ' (completed)' : ''}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
                      ) : (
                        <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-ink-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={`font-medium text-sm sm:text-base ${isCompleted ? 'text-teal-700' : 'text-ink-900'}`}>
                            <span className="text-ink-400 mr-2">{index + 1}.</span>
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-ink-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </span>
                            {hasQuiz && (
                              <span className="flex items-center gap-1 text-violet-500">
                                <Trophy className="w-3 h-3" />
                                Quiz {quizScore !== undefined ? `• ${quizScore}%` : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
