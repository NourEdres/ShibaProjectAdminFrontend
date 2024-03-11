import { ReactNode } from 'react';

// Defines the structure of each individual card

export type PageType = {
    sectorPage:1,
    gamesPage:2,
    roomsPage:3,
}

export type SectorType={
    name:string,
    userName:string,
    code:string,
    gamesNumber:number,
    color:string
}