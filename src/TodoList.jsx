
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

// Daily motivational quotes
const quotes = [
  "You're doing amazing, sweetie! ✨",
  "Dream big, sparkle more! 💖",
  "You're stronger than you think! 🌸",
  "Make today magical! 🦄",
  "Self-care is never selfish 💅",
  "You shine brighter than diamonds 💎",
  "Be your own kind of beautiful 🌹"
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: new Date(),
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Get today's quote
  const todayQuote = quotes[new Date().getDay() % quotes.length];

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('cute-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setIsLoading(false);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cute-tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setNewTask({ ...newTask, dueDate: date });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        dueDate: newTask.dueDate,
        completed: false,
        createdAt: new Date(),
      };
      
      setTasks([task, ...tasks]);
      setNewTask({ title: '', dueDate: selectedDate });
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Filter tasks for selected date
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getDate() === selectedDate.getDate() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="app">
      {/* Background elements */}
      <div className="background-glitter"></div>
      <div className="background-stickers">
        <div className="sticker cherry">🍒</div>
        <div className="sticker star">⭐</div>
        <div className="sticker bow">🎀</div>
      </div>

      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="header">
          <h1>TO DO LIST PLANNER</h1>
          <p className="subtitle">{todayQuote}</p>
        </header>

        <div className="content">
          <div className="calendar-section">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="cute-calendar"
              tileClassName={({ date, view }) => {
                const hasTasks = tasks.some(task => {
                  const taskDate = new Date(task.dueDate);
                  return (
                    taskDate.getDate() === date.getDate() &&
                    taskDate.getMonth() === date.getMonth() &&
                    taskDate.getFullYear() === date.getFullYear()
                  );
                });
                return hasTasks ? 'has-tasks' : '';
              }}
            />
          </div>

          <div className="tasks-section">
            <form onSubmit={addTask} className="task-form">
              <div className="input-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Add a magical task..."
                  value={newTask.title}
                  onChange={handleInputChange}
                  required
                  className="task-input"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate.toISOString().split('T')[0]}
                  onChange={(e) => handleDateChange(new Date(e.target.value))}
                  className="date-input"
                />
                <motion.button 
                  type="submit"
                  className="add-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="button-icon">💖</span>
                  <span className="button-text">Add</span>
                </motion.button>
              </div>
            </form>

            <div className="task-list-header">
              <h2>{formatDate(selectedDate)}</h2>
              <motion.button 
                onClick={clearCompletedTasks}
                className="clear-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!tasks.some(t => t.completed)}
              >
                Clear Completed
              </motion.button>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks for this day, sweetie! 💕</p>
                <p>Add something to make it magical!</p>
              </div>
            ) : (
              <ul className="task-list">
                <AnimatePresence>
                  {filteredTasks.map((task) => (
                    <motion.li
                      key={task.id}
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <div className="task-content">
                        <motion.label 
                          className="checkbox-container"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="checkbox-input"
                          />
                          <span className="checkmark"></span>
                        </motion.label>
                        <div className="task-details">
                          <span className="task-title">{task.title}</span>
                          {!task.completed && task.dueDate && (
                            <span className="task-date">
                              Due: {formatDate(new Date(task.dueDate))}
                            </span>
                          )}
                        </div>
                      </div>
                      <motion.button
                        onClick={() => deleteTask(task.id)}
                        className="delete-button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        ✕
                      </motion.button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;