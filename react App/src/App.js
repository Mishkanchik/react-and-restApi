import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadCategories = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:4096/api/categories/')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Помилка при завантаженні категорій');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const clearForm = () => {
    setName('');
    setSlug('');
    setDescription('');
    setEditingId(null);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !slug || !description) {
      setError('Заповніть всі поля');
      return;
    }

    const categoryData = { name, slug, description };

    const request = editingId
      ? axios.put(`http://127.0.0.1:4096/api/categories/${editingId}/`, categoryData)
      : axios.post('http://127.0.0.1:4096/api/categories/', categoryData);

    request
      .then(() => {
        clearForm();
        loadCategories();
      })
      .catch(() => setError('Помилка при збереженні категорії'));
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setSlug(category.slug);
    setDescription(category.description);
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити категорію?')) {
      axios.delete(`http://127.0.0.1:4096/api/categories/${id}/`)
        .then(() => loadCategories())
        .catch(() => setError('Помилка при видаленні'));
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Категорії</span>
        </div>
      </nav>

      <main className="container mt-4 mb-5">
        <h3>{editingId ? 'Редагування категорії' : 'Додати категорію'}</h3>

        <form onSubmit={handleSubmit} className="mb-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-2">
            <input type="text" placeholder="Назва" className="form-control"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-2">
            <input type="text" placeholder="Slug" className="form-control"
              value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className="mb-2">
            <textarea placeholder="Опис" className="form-control" rows={3}
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success me-2">
            {editingId ? 'Зберегти зміни' : 'Додати'}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={clearForm} type="button">Скасувати</button>
          )}
        </form>

        <h4>Список категорій</h4>
        {loading ? (
          <div className="progress mb-3">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}>Завантаження...</div>
          </div>
        ) : (
          <div className="row">
            {categories.map(cat => (
              <div className="col-md-6 mb-4" key={cat.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{cat.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{cat.slug}</h6>
                    <p className="card-text">{cat.description}</p>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(cat)}>Редагувати</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat.id)}>Видалити</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-dark text-white text-center py-3 fixed-bottom">
        &copy; 2025 Категорії
      </footer>
    </div>
  );
}

export default App;
