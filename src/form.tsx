import React, { useState, FormEvent } from 'react';
import { db } from './schema';

interface TodoFormData {
  description: string;
  list_id: string;
  created_by: string;
}

const TodoForm: React.FC = () => {
  const [formData, setFormData] = useState<TodoFormData>({
    description: '',
    list_id: '',
    created_by: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newTodo = {
      ...formData,
      created_at: new Date().toISOString(),
      completed: 0,
      completed_at: null,
      completed_by: null
    };

    try {
      // TODO: API呼び出しなどの処理を追加
      console.log('Submitted:', newTodo);
      // フォームをリセット
      setFormData({ description: '', list_id: '', created_by: '' });
      db.execute(
        'INSERT INTO todos (id, description, list_id, created_by) VALUES (?, ?, ?, ?)',
        [
          Math.random().toString(36).slice(2),
          newTodo.description,
          newTodo.list_id,
          newTodo.created_by
        ]
      );


    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          タスクの説明
        </label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="list_id" className="block text-sm font-medium">
          リストID
        </label>
        <input
          type="text"
          id="list_id"
          value={formData.list_id}
          onChange={(e) => setFormData({ ...formData, list_id: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="created_by" className="block text-sm font-medium">
          作成者
        </label>
        <input
          type="text"
          id="created_by"
          value={formData.created_by}
          onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        タスクを追加
      </button>
    </form>
  );
};

export default TodoForm;
