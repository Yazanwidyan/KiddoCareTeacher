import React, { createContext, useContext, useState } from 'react';

// All rooms must be objects with label & value
const rooms = [
  { label: 'Bunnies Room', value: 'Bunnies Room' },
  { label: 'Teddy Room', value: 'Teddy Room' },
  { label: 'Sunshine Room', value: 'Sunshine Room' },
];

type RoomOption = { label: string; value: string };

type RoomContextType = {
  rooms: RoomOption[];
  selectedRoom: RoomOption;
  setSelectedRoom: (room: RoomOption) => void;
};

const RoomContext = createContext<RoomContextType | null>(null);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(rooms[0]);

  return (
    <RoomContext.Provider
      value={{
        rooms,
        selectedRoom,
        setSelectedRoom,
      }}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used inside RoomProvider');
  }
  return context;
}
