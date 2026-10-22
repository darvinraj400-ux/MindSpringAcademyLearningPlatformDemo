import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { courses, Course } from '../data/courses';
import { useProgress } from '../hooks/useProgress';

const subjects = [
  { value: 'all', label: 'All Subjects', emoji: '📚' },
  { value: 'design', label: 'Design', emoji: '🎨' },
  { value: 'programming', label: 'Programming', emoji: '💻' },
  { value: 'business', label: 'Business', emoji: '📊' },
];

const difficulties = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const difficultyColors: Record<string, string> = {
  beginner: 'bg-teal-100 text-teal-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-violet-100 text-violet-700',
};

function CourseCard({ course, index }: { course: Course; index: number }) {
  const { getCourseCompletion, isCourseStarted, isCourseCompleted } = useProgress();
  const completion = getCourseCompletion(course.id, course.totalLessons);
  const started = isCourseStarted(course.id);
  const completed = isCourseCompleted(course.id, course.totalLessons);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/course/${course.id}`}
        className="block group"
        aria-label={`${course.title} - ${course.difficulty} level ${course.subject} course`}
      >
        <article className="bg-white rounded-2xl border border-paper-200 p-5 sm:p-6 h-full transition-all duration-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100/50 group-hover:-translate-y-0.5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl" role="img" aria-hidden="true">{course.emoji}</span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[course.difficulty]}`}>
              {course.difficulty}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-semibold text-ink-900 mb-2 group-hover:text-teal-700 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-ink-500 line-clamp-2 mb-4 leading-relaxed">
            {course.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-ink-400 mb-4">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">{course.instructorAvatar}</span>
            <span className="text-sm text-ink-600">{course.instructor}</span>
          </div>

          {/* Progress */}
          {started && (
            <div className="mt-auto">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-ink-500">
                  {completed ? '✓ Completed' : 'In progress'}
                </span>
                <span className="font-medium text-teal-600">{completion}%</span>
              </div>
              <div className="h-1.5 bg-paper-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-teal-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completion}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {!started && (
            <div className="flex items-center gap-1 text-sm text-teal-600 font-medium mt-auto group-hover:gap-2 transition-all">
              Start learning
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </article>
      </Link>
    </motion.div>
  );
}

export function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = searchQuery === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
      const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;

      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [searchQuery, selectedSubject, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 mb-3 sm:mb-4">
          Learn something <span className="text-teal-600">new today</span>
        </h1>
        <p className="text-base sm:text-lg text-ink-500 max-w-2xl leading-relaxed">
          Structured courses in design, programming, and business. Learn at your own pace with interactive lessons, quizzes, and progress tracking.
        </p>
      </motion.section>

      {/* Search & Filters */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-6 sm:mb-8"
      >
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search courses, topics, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-white border border-paper-200 rounded-xl text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow text-sm sm:text-base"
            aria-label="Search courses"
          />
        </div>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-paper-200 rounded-xl text-sm font-medium text-ink-600 mb-4 w-full justify-center"
          aria-expanded={showFilters}
        >
          <Filter className="w-4 h-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} sm:block space-y-4`}>
          {/* Subject Pills */}
          <div>
            <label className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-2 block">Subject</label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by subject">
              {subjects.map(subject => (
                <button
                  key={subject.value}
                  onClick={() => setSelectedSubject(subject.value)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSubject === subject.value
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white border border-paper-200 text-ink-600 hover:border-teal-300 hover:text-teal-700'
                  }`}
                  aria-pressed={selectedSubject === subject.value}
                >
                  <span className="mr-1.5">{subject.emoji}</span>
                  {subject.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Pills */}
          <div>
            <label className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-2 block">Difficulty</label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by difficulty">
              {difficulties.map(diff => (
                <button
                  key={diff.value}
                  onClick={() => setSelectedDifficulty(diff.value)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDifficulty === diff.value
                      ? 'bg-ink-900 text-white shadow-sm'
                      : 'bg-white border border-paper-200 text-ink-600 hover:border-ink-300 hover:text-ink-900'
                  }`}
                  aria-pressed={selectedDifficulty === diff.value}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Results Count */}
      <div className="mb-4 text-sm text-ink-500">
        {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <span className="text-5xl mb-4 block">🔍</span>
          <h3 className="text-lg font-semibold text-ink-700 mb-2">No courses found</h3>
          <p className="text-ink-500 text-sm">Try adjusting your search or filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubject('all');
              setSelectedDifficulty('all');
            }}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
