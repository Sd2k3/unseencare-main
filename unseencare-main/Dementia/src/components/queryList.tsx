import React, { useState, useEffect } from 'react';

interface Query {
  name: string;
  email: string;
  message: string;
}

const QueryList: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch('http://localhost:5000/queries');
        if (res.ok) {
          const data = await res.json();
          setQueries(data);
        } else {
          setError('Failed to fetch queries.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch queries.');
      }
    };
    fetchQueries();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">User Queries</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {queries.length === 0 ? (
        <p className="text-center text-gray-500">No queries submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {queries.map((query, index) => (
            <li key={index} className="border border-gray-200 rounded-md p-4">
              <p>
                <span className="font-medium">Name:</span> {query.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {query.email}
              </p>
              <p>
                <span className="font-medium">Message:</span> {query.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueryList;