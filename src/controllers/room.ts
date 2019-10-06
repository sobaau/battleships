const activeUsers: any[] = [];

export const addUser = ({ id, username, roomid }: any): any => {
  const existingUser = activeUsers.find(user => user.roomid === roomid && user.username === username);

  if (!username || !roomid) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, username, roomid };

  activeUsers.push(user);

  return { user };
};

export const removeUser = (id: any): void => {
  const index = activeUsers.findIndex(user => user.id === id);

  if (index !== -1) return activeUsers.splice(index, 1)[0];
};

export const getUser = (id: any): any => activeUsers.find(user => user.id === id);

export const getUsersInRoom = (room: any): any => activeUsers.filter(user => user.room === room);
