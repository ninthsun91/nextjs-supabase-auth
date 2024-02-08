'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Profile = {
  userId: string;
  name: string;
  avatar: string;
  online_at: string;
}

export default function DocUserList() {
  const supabase = createClient();

  const [userList, setUserList] = useState<Profile[]>([]);

  useEffect(() => {
    const channel = supabase.channel('doc');
    
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const userStatus = {
        userId: user?.id,
        name: user?.user_metadata.name || user?.user_metadata.full_name || 'guest',
        avatar: user?.user_metadata.avatar_url || user?.user_metadata.picture || '',
        online_at: new Date().toISOString(),
      }

      channel
        .on('presence', { event: 'sync' }, () => {
          const newState = channel.presenceState<Profile>();
          setUserList(Object.values(newState).map((presence) => presence[0]));
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          setUserList((prev) => [...prev, newPresences[0] as unknown as Profile]);
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          const leftUsersId = leftPresences.map((profile) => (profile as unknown as Profile).userId);
          setUserList((prev) => prev.filter((user) => !leftUsersId.includes(user.userId)));
        })
        .subscribe(async (status) => {
          if (status !== 'SUBSCRIBED') return;
          await channel.track(userStatus);
        });
    })();

    return () => {
      channel.untrack().then((status) => {
        supabase.removeChannel(channel);
      });
    }
  }, [supabase]);

  return (
    <div id="user-list" className="border border-black flex flex-col" style={{ padding: 5 }}>
      {userList.map((user, index) => (
        <div className="flex flex-row" key={index}>
          <div>{user.name}</div>
        </div>
      ))}
    </div>
  );
}

