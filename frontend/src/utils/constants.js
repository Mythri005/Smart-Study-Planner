// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// Priority Levels
export const PRIORITIES = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

// Task Status
export const TASK_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  OVERDUE: 'Overdue',
};

// Priority Colors (for UI)
export const PRIORITY_COLORS = {
  [PRIORITIES.HIGH]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    dot: 'bg-red-500',
  },
  [PRIORITIES.MEDIUM]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    dot: 'bg-yellow-500',
  },
  [PRIORITIES.LOW]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    dot: 'bg-green-500',
  },
};

// Status Colors
export const STATUS_COLORS = {
  [TASK_STATUS.PENDING]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    dot: 'bg-yellow-500',
  },
  [TASK_STATUS.COMPLETED]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    dot: 'bg-green-500',
  },
  [TASK_STATUS.OVERDUE]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    dot: 'bg-red-500',
  },
};

// Subject Suggestions
export const SUBJECT_SUGGESTIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Information Technology',
  'Programming',
  'Data Structures',
  'Algorithms',
  'Database Systems',
  'Web Development',
  'Mobile Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Statistics',
  'Calculus',
  'Linear Algebra',
  'English Literature',
  'English Language',
  'Creative Writing',
  'Business Communication',
  'History',
  'World History',
  'Modern History',
  'Ancient History',
  'Geography',
  'Physical Geography',
  'Human Geography',
  'Economics',
  'Microeconomics',
  'Macroeconomics',
  'Business Studies',
  'Marketing',
  'Finance',
  'Accounting',
  'Psychology',
  'Social Psychology',
  'Cognitive Psychology',
  'Art History',
  'Drawing',
  'Painting',
  'Digital Art',
  'Music Theory',
  'Music History',
  'Instrument Practice',
  'Physical Education',
  'Sports Science',
  'Health Education',
  'Political Science',
  'Sociology',
  'Anthropology',
  'Philosophy',
  'Ethics',
  'Logic',
  'Law',
  'Environmental Science',
  'Astronomy',
  'Geology',
  'Other',
];

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'EEEE, MMMM do, yyyy',
  TIME: 'hh:mm a',
  DATETIME: 'MMM dd, yyyy hh:mm a',
};

// Validation Constants
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  TASK: {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 255,
    SUBJECT_MAX_LENGTH: 100,
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'smart_study_planner_token',
  USER: 'smart_study_planner_user',
  THEME: 'smart_study_planner_theme',
  SETTINGS: 'smart_study_planner_settings',
};

// Default Task Filters
export const DEFAULT_FILTERS = {
  status: '',
  priority: '',
  subject: '',
  sortBy: 'deadline',
  sortOrder: 'asc',
};

// Sort Options
export const SORT_OPTIONS = [
  { value: 'deadline', label: 'Deadline' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
  { value: 'subject', label: 'Subject' },
  { value: 'created_at', label: 'Created Date' },
];

// Application Settings
export const APP_SETTINGS = {
  AUTO_SAVE_DELAY: 2000, // milliseconds
  NOTIFICATION_DURATION: 5000, // milliseconds
  ITEMS_PER_PAGE: 10,
  ENABLE_ANIMATIONS: true,
  THEME: 'light', // 'light' | 'dark' | 'auto'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'Resource not found.',
  FORBIDDEN: 'You do not have permission to perform this action.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task created successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  TASK_DELETED: 'Task deleted successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Welcome!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  TASKS: '/tasks',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};