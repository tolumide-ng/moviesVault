#!/usr/bin/env ts-node

import { Movie } from '@/types/manual/movies';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import { TOTAL_MOVIES } from '../constants';

export function generateFakeMovies(count: number) {
  const movies: Array<Movie> = [];

  for (let i = 0; i < count; i++) {
    movies.push({
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      images: Array.from({ length: 3 }, () =>
        faker.image.urlLoremFlickr({
          height: 300,
          width: 300,
        }),
      ),
      releaseDate: faker.date
        .between({
          from: '1991-01-01T00:00:00.000Z',
          to: new Date().toString(),
        })
        .toISOString(),
      rating: faker.number.float({ min: 1, max: 5 }),
      genres: faker.helpers.arrayElements(
        [
          'Action',
          'Adventure',
          'Animation',
          'Comedy',
          'Drama',
          'Horror',
          'Thriller',
          'Sci-Fi',
          'Fantasy',
          'Romance',
          'Mystery',
          'Crime',
          'Documentary',
          'Musical',
          'Historical',
          'Culture',
          'War',
          'Biography',
          'Western',
          'Family',
          'Sport',
        ],
        { min: 2, max: 5 },
      ),
      country: faker.location.country(),
      castCrew: Array.from(
        { length: faker.number.int({ min: 10, max: 23 }) },
        () => faker.person.fullName(),
      ),
      directors: Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) },
        () => faker.person.fullName(),
      ),
      usCertificates: faker.helpers.arrayElements(
        ['G', 'PG', 'PG-13', 'R', 'NC-13'],
        { min: 1, max: 2 },
      ),
    });
  }

  return movies;
}

const db = {
  movies: generateFakeMovies(TOTAL_MOVIES),
};

fs.writeFile(
  './src/utils/mockServer/db.json',
  JSON.stringify(db, null, 2),
  (error) => {
    if (error) {
      throw new Error('Error writing to db.json', error);
    }
  },
);
