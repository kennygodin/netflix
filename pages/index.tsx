import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useFavourites from '@/hooks/useFavourites';
import useMovieList from '@/hooks/useMovieLists';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-10">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="Favourites" data={favourites} />
      </div>
    </>
  );
}
