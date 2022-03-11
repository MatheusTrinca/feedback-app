import Card from './shared/Card';
import RatingSelect from './RatingSelect';
import { useState, useEffect } from 'react';
import Button from './shared/Button';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.feedback.text);
      setRating(feedbackEdit.feedback.rating);
    }
  }, [feedbackEdit]);

  const handleTextChange = e => {
    setText(e.target.value);
    if (text.length < 10) {
      setMessage('Insira ao menos 10 caracteres');
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
      setMessage('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newFeedback = {
      text,
      rating,
    };

    if (text.trim().length > 10) {
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.feedback.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
    }
    setText('');
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h4>Como você avavaliaria nosso serviço?</h4>
        <RatingSelect select={rating => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Deixe seu comentário"
            onChange={handleTextChange}
            value={text}
          />
          <Button type="submit" version="primary" isDisabled={btnDisabled}>
            Enviar
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
