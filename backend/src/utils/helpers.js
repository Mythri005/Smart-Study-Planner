const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

const validateDate = (date) => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

const calculateDaysRemaining = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getPriorityOrder = (priority) => {
  const order = { 'High': 3, 'Medium': 2, 'Low': 1 };
  return order[priority] || 0;
};

const sortTasks = (tasks, sortBy = 'deadline', order = 'asc') => {
  const sortedTasks = [...tasks];
  
  sortedTasks.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'deadline':
        comparison = new Date(a.deadline) - new Date(b.deadline);
        break;
      case 'priority':
        comparison = getPriorityOrder(b.priority) - getPriorityOrder(a.priority);
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'subject':
        comparison = a.subject.localeCompare(b.subject);
        break;
      default:
        comparison = new Date(a.deadline) - new Date(b.deadline);
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sortedTasks;
};

const generateTaskId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getTaskStatus = (deadline, currentStatus) => {
  if (currentStatus === 'Completed') return 'Completed';
  
  const today = new Date();
  const deadlineDate = new Date(deadline);
  
  if (deadlineDate < today) return 'Overdue';
  return 'Pending';
};

module.exports = {
  formatDate,
  validateDate,
  calculateDaysRemaining,
  sortTasks,
  generateTaskId,
  getTaskStatus,
  getPriorityOrder
};