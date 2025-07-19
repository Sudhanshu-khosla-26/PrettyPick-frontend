// // hooks/useAuth.ts
// import { useState, useEffect } from 'react';

// type User = {
//   id: string;
// };

// export default function useAuth() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setUser(null); // or setUser({ id: '123' }) to simulate login
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return { user, loading }; // ✅ Must return both
// }
import { useState, useEffect } from 'react';

export default function useAuth() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user (replace with real auth later)
    const timer = setTimeout(() => {
      setUser({ id: '1', name: 'Pretty Pink User', email: 'prettypink@example.com' });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const logout = () => {
    setUser(null);
  };

  return { user, loading, logout };
}
