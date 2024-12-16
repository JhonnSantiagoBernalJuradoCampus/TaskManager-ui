import { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/tasks/')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const addTask = async (title: string, description: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })
      if (!response.ok) throw new Error('Failed to add task')
      fetchTasks()
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const toggleTaskCompletion = async (taskId: number, completed: boolean) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      })
      if (!response.ok) throw new Error('Failed to update task')
      fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteCompletedTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/tasks/completed/', {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete completed tasks')
      fetchTasks()
    } catch (error) {
      console.error('Error deleting completed tasks:', error)
    }
  }

  return (
    <div className="container">
      <h1 className="task-manager__title">Gestor de Tareas</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleCompletion={toggleTaskCompletion}
        onDeleteCompleted={deleteCompletedTasks}
      />
    </div>
  )
}