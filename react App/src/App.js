import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:4096/api/categories/')

      .then(response => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Помилка при завантаженні категорій:', error);
      });
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Pricing</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-5">
        <h2>Category List</h2>
        <div className="row">
          {categories.map(category => (
            <div className="col-md-4 mb-4" key={category.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{category.slug}</h6>
                  <p className="card-text">{category.description}</p>
                  <small className="text-muted">Created: {new Date(category.created_at).toLocaleString()}</small><br />
                  <small className="text-muted">Updated: {new Date(category.updated_at).toLocaleString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3 fixed-bottom">
        <p>Copyright &copy; 2025 My Website</p>
      </footer>
    </div>
  );
}

export default App;