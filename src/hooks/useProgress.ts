import { useState, useEffect, useCallback } from 'react';

export interface LessonProgress {
  completed: boolean;
  completedAt?: string;
}

export interface CourseProgress {
  lessons: Record<string, LessonProgress>;
  quizScores: Record<string, number>;
  startedAt?: string;
}

export interface ProgressState {
  courses: Record<string, CourseProgress>;
}

const STORAGE_KEY = 'mindspring-progress';

const defaultProgress: ProgressState = { courses: {} };

function loadProgress(): ProgressState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return defaultProgress;
}

function saveProgress(progress: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markLessonComplete = useCallback((courseId: string, lessonId: string) => {
    setProgress(prev => {
      const courseProgress = prev.courses[courseId] || { lessons: {}, quizScores: {} };
      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseId]: {
            ...courseProgress,
            startedAt: courseProgress.startedAt || new Date().toISOString(),
            lessons: {
              ...courseProgress.lessons,
              [lessonId]: {
                completed: true,
                completedAt: new Date().toISOString(),
              },
            },
          },
        },
      };
    });
  }, []);

  const saveQuizScore = useCallback((courseId: string, lessonId: string, score: number) => {
    setProgress(prev => {
      const courseProgress = prev.courses[courseId] || { lessons: {}, quizScores: {} };
      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseId]: {
            ...courseProgress,
            startedAt: courseProgress.startedAt || new Date().toISOString(),
            quizScores: {
              ...courseProgress.quizScores,
              [lessonId]: score,
            },
          },
        },
      };
    });
  }, []);

  const startCourse = useCallback((courseId: string) => {
    setProgress(prev => {
      if (prev.courses[courseId]?.startedAt) return prev;
      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseId]: {
            lessons: {},
            quizScores: {},
            startedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const getCourseCompletion = useCallback((courseId: string, totalLessons: number): number => {
    const courseProgress = progress.courses[courseId];
    if (!courseProgress) return 0;
    const completedCount = Object.values(courseProgress.lessons).filter(l => l.completed).length;
    return Math.round((completedCount / totalLessons) * 100);
  }, [progress]);

  const isLessonCompleted = useCallback((courseId: string, lessonId: string): boolean => {
    return progress.courses[courseId]?.lessons[lessonId]?.completed || false;
  }, [progress]);

  const isCourseStarted = useCallback((courseId: string): boolean => {
    return !!progress.courses[courseId]?.startedAt;
  }, [progress]);

  const isCourseCompleted = useCallback((courseId: string, totalLessons: number): boolean => {
    return getCourseCompletion(courseId, totalLessons) === 100;
  }, [getCourseCompletion]);

  const getQuizScore = useCallback((courseId: string, lessonId: string): number | undefined => {
    return progress.courses[courseId]?.quizScores[lessonId];
  }, [progress]);

  const getActiveCourses = useCallback(() => {
    return Object.entries(progress.courses)
      .filter(([_, cp]) => cp.startedAt)
      .map(([courseId]) => courseId);
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    progress,
    markLessonComplete,
    saveQuizScore,
    startCourse,
    getCourseCompletion,
    isLessonCompleted,
    isCourseStarted,
    isCourseCompleted,
    getQuizScore,
    getActiveCourses,
    resetProgress,
  };
}
