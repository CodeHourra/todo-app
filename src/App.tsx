import { useState } from 'react'
import './App.css'
import Stats from './Stats'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

interface EditingTodo {
  id: number
  text: string
  priority: 'high' | 'medium' | 'low'
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium')
  const [editingTodo, setEditingTodo] = useState<EditingTodo | null>(null)
  const [showStats, setShowStats] = useState(false)

  const addTodo = () => {
    if (input.trim()) {
      const newTodos = [...todos, { id: Date.now(), text: input.trim(), completed: false, priority }]
      setTodos(newTodos)
      localStorage.setItem('todos', JSON.stringify(newTodos))
      setInput('')
    }
  }

  const toggleTodo = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const deleteTodo = (id: number) => {
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    if (todoElement) {
      todoElement.classList.add('deleting');
      setTimeout(() => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        if (editingTodo?.id === id) {
          setEditingTodo(null);
        }
      }, 300);
    }
  }

  const startEditing = (todo: Todo) => {
    setEditingTodo({ id: todo.id, text: todo.text, priority: todo.priority })
  }

  const saveEdit = () => {
    if (editingTodo) {
      const newTodos = todos.map(todo =>
        todo.id === editingTodo.id ? { ...todo, text: editingTodo.text, priority: editingTodo.priority } : todo
      )
      setTodos(newTodos)
      localStorage.setItem('todos', JSON.stringify(newTodos))
      setEditingTodo(null)
    }
  }

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      setEditingTodo(null)
    }
  }

  if (showStats) {
    return (
      <div className="app-container">
        <div className="nav-container">
          <button onClick={() => setShowStats(false)} className="nav-button">返回</button>
        </div>
        <Stats todos={todos} />
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="todo-container">
        <h1>待办事项</h1>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="添加新的待办事项"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            className="priority-select"
          >
            <option value="high" title="高优先级">🔴</option>
            <option value="medium" title="中优先级">🟡</option>
            <option value="low" title="低优先级">🔵</option>
          </select>
          <button onClick={addTodo}>添加</button>
          <button onClick={() => setShowStats(true)} className="stats-button">统计</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} data-id={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {editingTodo?.id === todo.id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editingTodo.text}
                    onChange={(e) => setEditingTodo({ ...editingTodo, text: e.target.value })}
                    onKeyDown={handleEditKeyPress}
                    onBlur={saveEdit}
                    autoFocus
                  />
                  <select
                    value={editingTodo.priority}
                    onChange={(e) => setEditingTodo({ ...editingTodo, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className="priority-select"
                  >
                    <option value="high" title="高优先级">🔴</option>
                    <option value="medium" title="中优先级">🟡</option>
                    <option value="low" title="低优先级">🔵</option>
                  </select>
                </div>
              ) : (
                <span onDoubleClick={() => startEditing(todo)}>{todo.text}</span>
              )}
              <button onClick={() => deleteTodo(todo.id)}>删除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
