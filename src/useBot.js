import { getTrains } from './api';

export default function useBot() {
  const callBot = async (message, messages, setMessages, setMessage) => {
    // analyse message for keywords - station
    const response = await getTrains(message);
    const { status, data } = response;
    const userMessage = { type: 'user', message };

    if (status === 200) {
      if (data.message) {
        const notice = {
          type: 'bot',
          message: data.message,
        };
        setMessages([...messages, userMessage, notice]);
        setMessage('');
        return;
      }
      const nextTrains = response.data.map((train) => {
        const { Schdepart, Destination } = train;
        const depart = Schdepart._text;
        const destination = Destination._text;
        return { type: 'bot', message: `${depart} to ${destination}` };
      });

      const notice = { type: 'bot', message: 'The next two trains are:' };

      setMessages([...messages, userMessage, notice, ...nextTrains]);
      setMessage('');
    }
  };

  return { callBot };
}
