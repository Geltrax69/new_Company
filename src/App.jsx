import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'
import Work from './pages/Work.jsx'
import Love from './pages/Love.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { Services, Book, Apply, Login, BlogPost, NotFound } from './pages/Misc.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="work" element={<Work />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="love" element={<Love />} />
          <Route path="apply" element={<Apply />} />
          <Route path="book" element={<Book />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
