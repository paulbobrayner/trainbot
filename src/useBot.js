import { getTrains, getStations } from './api';

export default function useBot() {
  const callBot = async (message, messages, setMessages, setMessage) => {
    const userMessage = { type: 'user', message };

    // if user mentions station we'll get a list of stations
    const regex = /(station)/g;
    const match = message.match(regex);

    if (match) {
      const stationsResponse = await getStations();
      const { data, status } = stationsResponse;

      if (status === 200) {
        // format data and add to message
        const stationList = data.map((station) => {
          const { StationDesc } = station;
          const name = StationDesc._text;
          return { type: 'bot', message: name };
        });

        const notice = { type: 'bot', message: 'List of available stations' };
        setMessages([...messages, userMessage, notice, ...stationList]);
      }
      return;
    }

    const response = await getTrains(message);
    const { status, data } = response;

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

      // format data and add to message
      const nextTrains = data.map((train) => {
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
