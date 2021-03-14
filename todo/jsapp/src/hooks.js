import React from "react";

export const useAddToDo = () => {
  const [adding, setAdding] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  const postData = ({ todoName }) => {
    setAdding(true);
    setSuccess(false);
    setError(undefined);

    fetch(`/api/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: todoName }),
    })
      .then((r) => {
        setAdding(false);
        setSuccess(true);
        setError(undefined);
      })
      .catch((e) => {
        console.error("Oops:", e);
        setAdding(false);
        setSuccess(false);
        setError(e);
      });
  };

  return { addToDo: postData, adding, success, error };
};
