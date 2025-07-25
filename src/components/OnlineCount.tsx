'use client';
import { useEffect, useState } from 'react';

export default function OnlineCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/online-count');
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error('Failed to fetch online count:', error);
      }
    };
    
    fetchCount();
    const interval = setInterval(fetchCount, 10000); // Refresh every 10s
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/50 px-3 py-1 rounded-lg text-sm">
      Online Now: {count}
    </div>
  );
}