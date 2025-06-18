import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]); // store fetched data
  const [loading, setLoading] = useState(true); // show loading spinner
  const [error, setError] = useState(null); // store error if any

  useEffect(() => {
    // Fetch data when component mounts
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // convert to JSON
      })
      .then((data) => {
        setUsers(data); // save data to state
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // empty dependency array => run once on mount

  return (
    <div style={{ padding: '20px' }}>
      <h2>Fetched Users</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;