'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useWindowEventListener } from '@/hooks/useWindowEventListener';

export default function ChatInput() {
  const supabase = createClient();
  const channel = supabase.channel('chat');

  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    const name = user?.user_metadata.name || 'anonymous';
    channel.send({
      type: 'broadcast',
      event: 'chat',
      payload: { message, name }
    });
    setMessage('');
  }

  useWindowEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, channel]);

  return (
    <div id="chat-input" className="border border-black flex flex-row space-x-1">
      <input className="border border-black flex grow" type="text" placeholder="type anything..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="border border-black" onClick={sendMessage}>Send</button>
    </div>
  );
}