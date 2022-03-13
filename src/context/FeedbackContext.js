import { createContext, useState, useCallback, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    feedback: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const deleteFeedback = async id => {
    if (window.confirm('Tens certeza que deseja excluir?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });

      setFeedback(prevState => prevState.filter(item => item.id !== id));
    }
  };

  const addFeedback = async feedback => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });

    const data = await response.json();

    setFeedback(prevState => [data, ...prevState]);
  };

  const editFeedback = feedback => {
    setFeedbackEdit({
      feedback,
      edit: true,
    });
  };

  const updateFeedback = async (id, updFeedback) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updFeedback),
    });

    const data = await response.json();

    setFeedback(
      feedback.map(item => (item.id === id ? { ...item, ...data } : item))
    );
  };

  const fetchFeedback = async () => {
    const response = await fetch('/feedback?_sort=id&_order=desc');
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
