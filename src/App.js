import styled from 'styled-components';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  function sendMessage(event) {
    event.preventDefault();
    const messageData = { type: 'user', message };
    setMessages([...messages, messageData]);
    setMessage('');
  }

  function handleInput(event) {
    const { value } = event.target;

    setMessage(value);
  }

  function renderMessages() {
    return messages.map((text) => {
      const { message, type } = text;

      if (type === 'user') {
        return <UserMessage>{message}</UserMessage>;
      } else {
        return <BotMessage>{message}</BotMessage>;
      }
    });
  }

  return (
    <Wrap>
      <Header>Train bot</Header>
      <Chat>
        <Messages> {renderMessages()}</Messages>
        <InputWrap onSubmit={(event) => sendMessage(event)}>
          <Input
            placeholder="Enter message here"
            onChange={(event) => handleInput(event)}
            value={message}
          />
        </InputWrap>
      </Chat>
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  text-align: center;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  text-align: center;
`;

const Chat = styled.div`
  background: #ece5dd;

  @media (min-width: 900px) {
    width: 800px;
    height: 75vh;
    position: relative;
  }
`;

const Header = styled.div`
  background: #f2f6f8;
  margin: 0;
  padding: 10px;
  position: sticky;
  font-size: 1.25em;
  font-weight: 700;
  z-index: 1001;
  display: flex;

  @media (max-width: 899px) {
    position: fixed;
    width: 100%;
  }
`;

const InputWrap = styled.form`
  background: #f2f6f8;
  padding: 10px 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  @media (max-width: 899px) {
    padding: 10px 20px 20px;
    position: fixed;
  }
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid lightGray;
  padding-left: 10px;
  height: 40px;

  @media (max-width: 575px) {
    width: 100%;
  }

  @media (min-width: 576px) {
    width: 65%;
  }
`;

const Messages = styled.div`
  padding: 30px 30px 20px;
  display: flex;
  flex-direction: column;
  bottom: 0;
  margin-bottom: 60px;
  width: 750px;
`;

const UserMessage = styled.div`
  background: #afe1af;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  justify-self: right;
  align-self: flex-end;
  text-align: right;
  margin-top: 15px;
  position: relative;
`;

const BotMessage = styled.div`
  background: white;
  padding: 10px;
  border-radius: 10px;
  max-width: 65%;
  position: relative;
  margin-top: 15px;
  align-self: flex-start;
`;
