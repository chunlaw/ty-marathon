export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Landmark {
  name: string;
  description: string;
  coordinate: Coordinate;
}

export interface Route {
  name: string;
  description: string;
  coordinates: Coordinate[];
  landmarks: string[];
}

