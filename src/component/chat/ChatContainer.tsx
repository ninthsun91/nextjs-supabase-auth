import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

export default function ChatContainer() {
  return (
    <div id="chat-container" className="border border-blue-500 flex-1">
      <ChatBox />
      <ChatInput />
    </div>
  );
}