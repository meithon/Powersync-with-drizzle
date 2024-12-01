import { useEffect, useState } from "react";
import { db, setupPowerSync } from "./schema";

interface Data {
  id: number;
  // 他の必要なプロパティを追加
}

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setupPowerSync()
        const result = await db.get('SELECT * FROM lists WHERE id = ?', [1]);
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Simple Powersync example</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}

// Find a list item by ID


export default App
