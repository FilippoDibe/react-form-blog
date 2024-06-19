import { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Form.css';  

const Form = () => {
  const [titles, setTitles] = useState([]);
  const [titleValue, setTitleValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleValue.trim().length === 0) {
      return;
    }
    if (editIndex !== null) {
      setTitles((curr) => curr.map((title, index) => (index === editIndex ? titleValue : title)));
      setEditIndex(null);
    } else {
      setTitles((curr) => [...curr, titleValue]);
    }
    setTitleValue('');
  };

  const deleteTitle = (index) => {
    setTitles((curr) => curr.filter((_, i) => i !== index));
  };

  const editTitle = (index) => {
    setTitleValue(titles[index]);
    setEditIndex(index);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Titolo del blog"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <button disabled={titleValue.trim().length === 0}>Salva</button>
      </form>
      <ul>
        {titles.map((title, index) => (
          <li key={`title${index}`}>
            {title}
            <button onClick={() => editTitle(index)}>
              <FaEdit />
            </button>
            <button onClick={() => deleteTitle(index)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Form;
