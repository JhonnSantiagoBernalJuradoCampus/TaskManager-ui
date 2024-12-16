interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  onToggleCompletion: (taskId: number, completed: boolean) => void
  onDeleteCompleted: () => void
}

export default function TaskList({ tasks, onToggleCompletion, onDeleteCompleted }: TaskListProps) {
  return (
    <div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="p-2 border rounded">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleCompletion(task.id, !task.completed)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Completada</span>
            </div>
          </li>
        ))}
      </ul>
      {tasks.some((task) => task.completed) && (
        <button
          onClick={onDeleteCompleted}
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Eliminar Tareas Completadas
        </button>
      )}
    </div>
  )
}