import { useEffect, useState } from "react";
import { Database, db } from "./schema";
import TodoForm from "./form";
import { dbDrizzle, drizzleSchema } from "./drizzle";
import { toCompilableQuery } from "@powersync/drizzle-driver";
import { useQuery } from "@powersync/react";

type Data = Database["todos"]

const abortController = new AbortController();

async function watchLists(onUpdate: (update: Data[]) => void) {
  for await (const update of db.watch(
    'SELECT * from todos',
    [],
    { signal: abortController.signal }
  )
  ) {
    onUpdate(update.rows?._array);
  }
}

async function setCompleted(id: string, completed: boolean, completed_by: string) {
  await db.execute(
    'UPDATE todos SET completed =?, completed_at =?, completed_by =? WHERE id =?',
    [completed ? 1 : 0, new Date().toISOString(), completed_by, id]
  );
}


function App() {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        watchLists(async (update) => {
          console.log('update:', update);
          setData(update);
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  const query = dbDrizzle.select().from(drizzleSchema.todos)
  const { data: fetchData, isLoading } = useQuery(toCompilableQuery(query))
  console.log({ fetchData })

  return (
    <>
      <h1>Simple Powersync example</h1>

      <h2>Todos</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <div>
              <div>
                <input
                  type="checkbox"
                  checked={!!item.completed}
                  onChange={() => setCompleted(
                    item.id,
                    !item.completed,
                    item.created_by!
                  )}
                />
                <label htmlFor={item.id}>{item.description}</label>
              </div>
              <span>Created by: {item.created_by}</span>
              <br />
            </div>
          </li>
        ))}
      </ul>
      {error && <div>Error: {error}</div>}
      <TodoForm />
    </>
  );
}

// Find a list item by ID


export default App
