import { createContext, useState, useCallback } from 'react';
import FeedbackData from '../data/FeedbackData';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    feedback: {},
    edit: false,
  });

  const deleteFeedback = useCallback(id => {
    if (window.confirm('Tens certeza que deseja excluir?')) {
      setFeedback(prevState => prevState.filter(item => item.id !== id));
    }
  }, []);

  const addFeedback = feedback => {
    feedback.id = uuidv4();
    setFeedback(prevState => [feedback, ...prevState]);
  };

  const editFeedback = feedback => {
    setFeedbackEdit({
      feedback,
      edit: true,
    });
  };

  const updateFeedback = (id, updFeedback) => {
    setFeedback(
      feedback.map(item =>
        item.id === id ? { ...item, ...updFeedback } : item
      )
    );
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
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
