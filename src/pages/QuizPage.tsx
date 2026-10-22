import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import { getCourseByLessonId } from '../data/courses';
import { quizzes } from '../data/quizzes';
import { useProgress } from '../hooks/useProgress';

export function QuizPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const result = getCourseByLessonId(lessonId || '');
  const { saveQuizScore, markLessonComplete, isLessonCompleted } = useProgress();

  const quizQuestions = lessonId ? quizzes[lessonId] : undefined;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  if (!result || !quizQuestions) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="text-5xl mb-4 block">📝</span>
        <h2 className="text-xl font-semibold text-ink-700 mb-2">No quiz available</h2>
        <p className="text-ink-500 mb-6">This lesson doesn't have a quiz yet.</p>
        <Link to="/" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
          Browse courses
        </Link>
      </div>
    );
  }

  const { course, lessonIndex } = result;
  const lesson = course.lessons[lessonIndex];
  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    setAnswers(prev => [...prev, selectedAnswer]);
  };

  const handleNext = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Calculate score - answers array includes all previous answers
      // The current answer was already added to answers when handleSubmitAnswer was called
      const allAnswers = [...answers];
      const correctCount = quizQuestions.reduce((acc, q, i) => {
        return acc + (allAnswers[i] === q.correctIndex ? 1 : 0);
      }, 0);
      const finalScore = Math.round((correctCount / totalQuestions) * 100);
      setScore(finalScore);
      setQuizComplete(true);
      saveQuizScore(course.id, lesson.id, finalScore);
      
      // Auto-mark lesson complete if score >= 60%
      if (finalScore >= 60 && !isLessonCompleted(course.id, lesson.id)) {
        markLessonComplete(course.id, lesson.id);
      }
    }
  }, [currentQuestion, totalQuestions, answers, quizQuestions, course.id, lesson.id, saveQuizScore, markLessonComplete, isLessonCompleted]);

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setQuizComplete(false);
    setScore(0);
  };

  if (quizComplete) {
    const passed = score >= 60;
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: passed ? '#ecfdf5' : '#fef2f2' }}
          >
            {passed ? (
              <Trophy className="w-10 h-10 text-teal-500" />
            ) : (
              <RotateCcw className="w-10 h-10 text-coral-500" />
            )}
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-2">
            {passed ? 'Great job!' : 'Keep learning!'}
          </h2>
          <p className="text-ink-500 mb-6">
            {passed
              ? 'You passed the quiz. The lesson has been marked as complete.'
              : 'You need 60% or higher to pass. Review the lesson and try again.'}
          </p>

          {/* Score Display */}
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white border border-paper-200 rounded-2xl mb-8">
            <span className="text-4xl font-bold text-ink-900">{score}%</span>
            <div className="text-left">
              <div className="text-sm font-medium text-ink-700">
                {quizQuestions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0)} / {totalQuestions}
              </div>
              <div className="text-xs text-ink-400">correct answers</div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="text-left space-y-3 mb-8">
            {quizQuestions.map((q, i) => {
              const userAnswer = answers[i] ?? null;
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-xl border ${isCorrect ? 'bg-teal-50 border-teal-200' : 'bg-red-50 border-red-200'}`}
                >
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-coral-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-ink-800">{q.question}</p>
                      {!isCorrect && (
                        <p className="text-xs text-ink-500 mt-1">
                          Correct answer: {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {!passed && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetry}
                className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </motion.button>
            )}
            <Link
              to={`/lesson/${lesson.id}`}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-paper-200 text-ink-700 rounded-xl font-medium text-sm hover:border-ink-300 transition-colors text-center flex items-center justify-center gap-2"
            >
              Back to Lesson
            </Link>
            {lessonIndex < course.lessons.length - 1 && (
              <Link
                to={`/lesson/${course.lessons[lessonIndex + 1].id}`}
                className="w-full sm:w-auto px-6 py-3 bg-ink-900 text-white rounded-xl font-medium text-sm hover:bg-ink-800 transition-colors flex items-center justify-center gap-2"
              >
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 mb-6 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to lesson
      </button>

      {/* Quiz Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-violet-500 mb-2">
          <Trophy className="w-4 h-4" />
          <span>Quiz: {lesson.title}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-ink-900">Test Your Knowledge</h1>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-ink-500">Question {currentQuestion + 1} of {totalQuestions}</span>
          <span className="text-ink-400">{Math.round(((currentQuestion) / totalQuestions) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-violet-500 rounded-full"
            animate={{ width: `${((currentQuestion + (showExplanation ? 1 : 0)) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-paper-200 rounded-2xl p-5 sm:p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-ink-900 mb-5">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3" role="radiogroup" aria-label="Answer options">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctIndex;
              const showResult = showExplanation;

              let optionClasses = 'border-paper-200 hover:border-teal-300 hover:bg-teal-50/30';
              if (isSelected && !showResult) {
                optionClasses = 'border-teal-500 bg-teal-50 ring-1 ring-teal-500';
              } else if (showResult && isCorrect) {
                optionClasses = 'border-teal-500 bg-teal-50';
              } else if (showResult && isSelected && !isCorrect) {
                optionClasses = 'border-coral-400 bg-red-50';
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!showExplanation ? { scale: 1.01 } : {}}
                  whileTap={!showExplanation ? { scale: 0.99 } : {}}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionClasses}`}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected && !showResult ? 'border-teal-500 bg-teal-500' :
                      showResult && isCorrect ? 'border-teal-500 bg-teal-500' :
                      showResult && isSelected ? 'border-coral-400 bg-coral-400' :
                      'border-ink-300'
                    }`}>
                      {(isSelected || (showResult && isCorrect)) && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`text-sm sm:text-base ${showResult && isCorrect ? 'text-teal-700 font-medium' : 'text-ink-700'}`}>
                      {option}
                    </span>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-teal-500 ml-auto flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-coral-400 ml-auto flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-5 overflow-hidden"
              >
                <div className={`p-4 rounded-xl ${selectedAnswer === question.correctIndex ? 'bg-teal-50 border border-teal-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    <strong>{selectedAnswer === question.correctIndex ? '✓ Correct!' : '✗ Not quite.'}</strong>{' '}
                    {question.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Action Button */}
      <div className="flex justify-end">
        {!showExplanation ? (
          <motion.button
            whileHover={{ scale: selectedAnswer !== null ? 1.02 : 1 }}
            whileTap={{ scale: selectedAnswer !== null ? 0.98 : 1 }}
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
              selectedAnswer !== null
                ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm'
                : 'bg-paper-200 text-ink-400 cursor-not-allowed'
            }`}
          >
            Check Answer
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium text-sm hover:bg-violet-700 transition-colors shadow-sm flex items-center gap-2"
          >
            {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
