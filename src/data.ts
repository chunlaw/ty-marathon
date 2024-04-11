export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Route {
  name: string;
  description: string;
  coordinates: Coordinate[];
}

export interface Route {
  id: string;
  entries: string[];
}

