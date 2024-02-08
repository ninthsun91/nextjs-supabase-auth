'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ChatBox() {
  const supabase = createClient();

  const [chats, setChats] = useState<Chat[]>([...mockChats]);

  useEffect(() => {
    const channel = supabase.channel('chat');

    supabase.channel('chat').on(
      'broadcast',
      { event: 'chat' },
      ({ payload }) => {
        const { name, message } = payload;
        setChats((prev) => [...prev, { name, message }]);
      }
    ).subscribe((status) => {
      if (status !== 'SUBSCRIBED') {
        console.error('failed to subscribe chat');
      }
    });

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase]);

  return (
    <div id="chat-box" className="border border-black min-h-48">
      {chats.map(({ name, message }, index) => (
        <div key={index} className="border border-black flex flex-row space-x-2">
          <div>{name}:</div>
          <div>{message}</div>
        </div>
      ))}
    </div>
  );
}

type Chat = {
  name: string;
  message: string;
}

const mockChats: Chat[] = [
  { name: 'user1', message: 'hello' },
  { name: 'user2', message: 'hi' },
  { name: 'user1', message: 'how are you?' },
  { name: 'user2', message: 'fine' },
  { name: 'user1', message: 'good to hear that' },
  { name: 'user2', message: 'yeah' },
  { name: 'user1', message: 'bye' },
  { name: 'user2', message: 'bye' },
];
