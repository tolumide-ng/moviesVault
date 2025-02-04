import { components } from '@/types/generated/schema';

export enum Rating {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export enum Genre {
  Action = 'Action',
  Adventure = 'Adventure',
  Animation = 'Animation',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Horror = 'Horror',
  Thriller = 'Thriller',
  Sci = 'Sci-Fi',
  Fantasy = 'Fantasy',
  Romance = 'Romance',
  Mystery = 'Mystery',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Musical = 'Musical',
  Historical = 'Historical',
  Culture = 'Culture',
  War = 'War',
  Biography = 'Biography',
  Western = 'Western',
  Family = 'Family',
  Sport = 'Sport',
}

export enum UsCertificate {
  G = 'G',
  PG = 'PG',
  'PG-13' = 'PG-13',
  R = 'R',
  'NC-13' = 'NC-13',
}

export type Movie = components['schemas']['Movies']['data'][0];

export type FilterData = {
  title: string;
  rating: Array<Rating> | null;
  genres: Array<Genre>;
  usCertificates: Array<UsCertificate>;
};

export type FavoriteMovie = Movie & { favorite: boolean };
