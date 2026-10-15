import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

const STATUSES = ['Queued', 'In progress', 'In review', 'Done']
const SEED = [
  { id: 1, title: 'Landing page redesign', type: 'UI/UX', status: 'In progress' },
  { id: 2, title: 'Launch announcement banners', type: 'Marketing', status: 'Queued' },
  { id: 3, title: 'Brand logo refresh', type: 'Branding', status: 'In review' },
  { id: 4, title: 'Onboarding email sequence', type: 'Marketing', status: 'Done' },
]
const KEY = 'simpedu_tasks'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || SEED } catch { return SEED }
}

export default function Dashboard() {
  useDocumentTitle('Dashboard')
  const [tasks, setTasks] = useState(load)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('UI/UX')

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(tasks)) }, [tasks])

  function addTask(e) {
    e.preventDefault()
    if (!title.trim()) return
    setTasks((t) => [{ id: Date.now(), title: title.trim(), type, status: 'Queued' }, ...t])
    setTitle('')
  }
  // Cycle a task to the next status (wraps at Done → stays Done).
  function advance(id) {
    setTasks((t) => t.map((task) => {
      if (task.id !== id) return task
      const i = STATUSES.indexOf(task.status)
      return { ...task, status: STATUSES[Math.min(i + 1, STATUSES.length - 1)] }
    }))
  }
  function remove(id) { setTasks((t) => t.filter((x) => x.id !== id)) }

  const counts = STATUSES.map((s) => tasks.filter((t) => t.status === s).length)

  return (
    <div className="dash">
      <aside className="dash-side">
        <Link to="/" className="logo">Simpedu<span>:</span></Link>
        <nav>
          <a className="active">◳ Task queue</a>
          <a>★ Brands</a>
          <a>◷ Activity</a>
          <a>▣ Billing</a>
          <a>⚙ Settings</a>
        </nav>
        <div className="dash-plan">
          <strong>Pro plan</strong>
          <span>Renews in 18 days</span>
          <Button as={Link} to="/book" variant="outline">Manage</Button>
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-head">
          <div>
            <h1 className="heading">Good to see you 👋</h1>
            <p className="body">Queue a task — your designer picks it up within a day.</p>
          </div>
          <div className="dash-avatar" />
        </header>

        <div className="dash-stats">
          {STATUSES.map((s, i) => (
            <div key={s} className="dash-stat">
              <span className="num">{counts[i]}</span>
              <span className="lbl">{s}</span>
            </div>
          ))}
        </div>

        <form className="dash-add" onSubmit={addTask}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Describe a new task…" aria-label="New task" />
          <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Task type">
            {['UI/UX', 'Branding', 'Marketing', 'Motion', 'Development'].map((t) => <option key={t}>{t}</option>)}
          </select>
          <Button type="submit">Add task</Button>
        </form>

        <ul className="dash-tasks">
          {tasks.length === 0 && <li className="dash-empty">No tasks yet — add your first one above.</li>}
          {tasks.map((t) => (
            <li key={t.id} className="dash-task">
              <span className={`dash-dot s-${t.status.replace(/\s/g, '')}`} />
              <div className="dash-task-main">
                <strong>{t.title}</strong>
                <span className="dash-type">{t.type}</span>
              </div>
              <button className="dash-status" onClick={() => advance(t.id)} title="Advance status">{t.status}</button>
              <button className="dash-del" onClick={() => remove(t.id)} aria-label="Delete task">✕</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
