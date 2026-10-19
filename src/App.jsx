import { useEffect, useState } from 'react';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(USERS_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setStatus('success');
      } catch (requestError) {
        // An aborted request is an expected cleanup path, not an error state.
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load users.');
          setStatus('error');
        }
      }
    }

    loadUsers();

    // Cancels an in-flight request if this component unmounts.
    return () => controller.abort();
  }, []); // Empty dependencies ensure one request per mounted component.

  return (
    <main className="page">
      <section className="directory" aria-labelledby="page-title">
        <header className="hero">
          <div>
            <p className="eyebrow">People workspace</p>
            <h1 id="page-title">Team directory</h1>
            <p className="subtitle">Meet the people and companies in your network.</p>
          </div>
          <div className="member-count" aria-label={`${users.length} members`}>
            <span>{status === 'success' ? users.length : '—'}</span>
            <small>members</small>
          </div>
        </header>

        {status === 'loading' && (
          <div className="loading-card" role="status">
            <span className="spinner" aria-hidden="true" />
            <span>Loading your directory…</span>
          </div>
        )}

        {status === 'error' && (
          <p className="error" role="alert">
            Could not load users: {error}
          </p>
        )}

        {status === 'success' && (
          <ul className="user-list" aria-label="Users">
            {users.map((user) => (
              <li className="user-card" key={user.id}>
                <div className="card-top">
                  <div className="avatar" aria-hidden="true">
                    {user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                  </div>
                  <span className="status-dot" title="Active" />
                </div>
                <h2>{user.name}</h2>
                <a className="email" href={`mailto:${user.email}`}>{user.email}</a>
                <div className="company">
                  <span className="company-icon" aria-hidden="true">⌂</span>
                  <span>{user.company?.name ?? 'No company listed'}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
