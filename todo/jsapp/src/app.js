import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrXE3xx4fIE_KbbCUUQjeFPMqQFR6FdNY",
  authDomain: "test-app-notifications-e38ef.firebaseapp.com",
  databaseURL: "https://test-app-notifications-e38ef.firebaseio.com",
  projectId: "test-app-notifications-e38ef",
  storageBucket: "test-app-notifications-e38ef.appspot.com",
  messagingSenderId: "643695626316",
  appId: "1:643695626316:web:097aac8bfb257938570ce9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const App = () => {
  const handleStatusChange = (id) => {
    console.log("Change for Id: ", id);
    fetch(`/api/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_done: true }),
    })
      .then((r) => console.log("Updated"))
      .catch((e) => {
        console.error("Oops:", e);
      });
  };

  const [todoList, setTodoList] = React.useState([]);
  React.useEffect(() => {
    const listener = db
      .collection("todo")
      .where("is_done", "==", false)
      .onSnapshot((querySnapshot) => {
        const todoDataList = [];
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          todoDataList.push({ id: doc.id, ...doc.data() });
        });
        setTodoList(todoDataList);
      });
    return listener;
  }, [db]);
  return (
    <div>
      <h2>Todo's</h2>
      <Table todoList={todoList} onToDoStatusChange={handleStatusChange} />
    </div>
  );
};
export default App;

const Table = ({ todoList, onToDoStatusChange }) => {
  return (
    <table className="table">
      <tbody>
        {todoList.map((todo) => (
          <Row
            key={todo.id}
            isDone={todo.is_done}
            todoName={todo.name}
            onChange={() => onToDoStatusChange(todo.id)}
          />
        ))}
      </tbody>
    </table>
  );
};
const Row = ({ isDone, todoName, onChange }) => {
  return (
    <tr>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          id="checkboxNoLabel"
          value=""
          aria-label="..."
          onChange={onChange}
        />
      </td>
      <td>{isDone ? <del>todoName</del> : todoName} </td>
    </tr>
  );
};
