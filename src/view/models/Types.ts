import { ReactNode } from "react";

// Defines the structure of each individual card

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
