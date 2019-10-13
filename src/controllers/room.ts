/** This controller counts the current active users */

const activeUsers: any[] = [];
activeUsers.push({ id: 'test' });
activeUsers.push({ id: 'test' });
activeUsers.push({ id: 'test' });
activeUsers.push({ id: 'test' });
const Rooms: any[] = [];

export const addUser = ({ id, username, roomid }: any): any => {
  const user = { id, username, roomid };
  activeUsers.push(user);
  return { user };
};

export const addRoom = ({ roomid }: any): any => {
  const room = { roomid };

  if (Rooms.includes(room.roomid)) {
    return;
  }
  Rooms.push(room);
};

export const GetUsers = (): number => {
  return activeUsers.length;
};

export const GetGames = (): number => {
  return activeUsers.length;
};
