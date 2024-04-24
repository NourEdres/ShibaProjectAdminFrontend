export type Page = {
  sectorPage: 1;
  gamesPage: 2;
  roomsPage: 3;
};

export const buttonsName = {
  Sectors: "סקטורים",
  Games: "משחקים",
  Rooms: "חדרים",
  Tasks: "משימות",
  Logout: "יציאה",
};

export type Sector = {
  name: string;
  userName: string;
  password: string;
  gamesNumber: number;
  color: string;
};
export type Task = {
  name: string;
  description: string;
  sector: string;
};
export type Game = {
  name: string;
  image: string;
  description: string;
  lastModifiedDate: Date;
  sector: string;
};
export type Room = {
  name: string;
  description: string;
  objects: Object[];
};
export type Object = {
  name: string;
  image: string;
  description: string;
  lastModifiedDate: Date;
  sector: string;
};
