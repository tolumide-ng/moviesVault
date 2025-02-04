import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MovieDetail } from './MovieDetail';

describe('MovieDetail', () => {
  it('renders release date correctly', () => {
    const releaseDate = '2022-10-20';
    render(<MovieDetail releaseDate={releaseDate} usCertificates={[]} />);

    const releaseDateText = screen.getByText('Release Date:');
    expect(releaseDateText).toBeVisible();

    const formattedDate = new Date(releaseDate).toLocaleDateString(
      navigator.language,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    );

    expect(screen.getByText(formattedDate)).toBeVisible();
  });

  it('renders default date when no release date is provided', () => {
    render(<MovieDetail releaseDate={undefined} usCertificates={[]} />);

    const defaultDate = new Date().toLocaleDateString(navigator.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    expect(screen.getByText(defaultDate)).toBeVisible();
  });

  it('renders US certificates', () => {
    const certificates = ['PG-13', 'R'];
    render(
      <MovieDetail releaseDate="2022-10-20" usCertificates={certificates} />,
    );

    expect(screen.getByText('US Certificates:')).toBeVisible();
    expect(screen.getByText('PG-13')).toBeVisible();
    expect(screen.getByText('R')).toBeVisible();
  });

  test('renders correctly when no props are provided', () => {
    render(<MovieDetail releaseDate={undefined} usCertificates={[]} />);

    const releaseDateText = screen.getByText('Release Date:');
    expect(releaseDateText).toBeVisible();

    const defaultDate = new Date().toLocaleDateString(navigator.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    expect(screen.getByText(defaultDate)).toBeVisible();
    expect(screen.queryByText('US Certificates:')).not.toBeInTheDocument();
  });
});
