import React from "react";

const ToDoForm = ({ handleSaveToDo, loading, success }) => {
  const [todoName, setToDoName] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveToDo(todoName);
  };

  React.useEffect(() => {
    if (success) {
      setToDoName("");
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="todoID" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="todoID"
          aria-describedby="todoHelpID"
          onChange={(e) => setToDoName(e.target.value)}
          disabled={loading}
          value={todoName}
        />
        <div id="todoHelpID" className="form-text">
          Name what you are planning to do.
        </div>
      </div>

      <button
        class="btn btn-primary"
        type="submit"
        disabled={todoName.length === 0 || loading}
      >
        {loading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        Submit
      </button>
    </form>
  );
};

export default ToDoForm;
