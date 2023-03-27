import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import { Character, Api } from '@/api';
import { useCallback, useEffect, useState } from 'react';
import Thumbnail, { ThumbnailSize } from '@/Thumbnail';
import ControlBar from '@/ControlBar';
import Loader from '@/loader';

interface HomeState {
  current: Character | null;
  previous: Character[];
  filtered: Character[];
  filter: string;
}

const TEN_SECONDS = 10 * 1000;
const ALIVE_FILTER = 'alive';

export default function Home() {
  const [isPaused, setIsPaused] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [state, setState] = useState<HomeState>({
    current: null,
    previous: [],
    filtered: [],
    filter: '',
  });

  const filterPrevious = useCallback((previous: Character[], filter: string) => {
    if (filter) {
      return previous.filter(p => p.status.toLowerCase() !== filter);
    }
    return previous;
  }, []);

  const handleFetch = useCallback(() => {
    setIsFetching(true);
    Api.getRandomCharacter()
    .then(character => {
      if (!state.current) {
        setState({
          ...state,
          current: character,
        });
        return;
      }

      const previous = [...state.previous, state.current];

      const indexOf = previous.findIndex(c => {
        return c.id === character.id;
      });

      if (indexOf >= 0) {
        previous.splice(indexOf, 1);
      }

      setState({
        current: character,
        previous,
        filtered: filterPrevious(previous, state.filter),
        filter: state.filter,
      });
    }).catch(() => {
      console.error('Failed to fetch character');
    }).finally(() => {
      setIsFetching(false);
    });
  }, [state, setState, filterPrevious, isFetching, setIsFetching]);

  const nextHandler = useCallback(() => {
    handleFetch();
  }, [handleFetch]);

  const pauseHandler = useCallback(() => {
    if (isPaused) {
      handleFetch();
    }
    setIsPaused(!isPaused);
  }, [isPaused, setIsPaused, handleFetch]);

  const filterHandler = useCallback(() => {
    if (state.filter) {
      setState({
        ...state,
        filtered: filterPrevious(state.previous, ''),
        filter: '',
      });
      return;
    }

    setState({
      ...state,
      filtered: filterPrevious(state.previous, ALIVE_FILTER),
      filter: ALIVE_FILTER,
    })
  }, [state, setState, filterPrevious]);

  useEffect(() => {
    if (!state.current) {
      handleFetch();
      return;
    }
  }, [handleFetch]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timeout = setTimeout(() => {
      handleFetch();
    }, TEN_SECONDS);

    return () => {
      clearTimeout(timeout);
    }
  }, [isPaused, handleFetch]);

  const {
    current,
    filtered,
    filter
  } = state;

  const filterLabel = filter === ALIVE_FILTER
    ? 'Include Alive'
    : 'Remove Alive';
  const pauseLabel = isPaused 
    ? 'Resume'
    : 'Pause';

  return (
    <>
      <Head>
        <title>Rick and Morty Go to Faro</title>
        <meta name="description" content="A fun little app for a CodeBytes assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ControlBar 
          nextHandler={nextHandler} 
          pauseHandler={pauseHandler} 
          filterHandler={filterHandler} 
          filterLabel={filterLabel}
          pauseLabel={pauseLabel}/>
        <div className={styles.current}>
          {current && <Thumbnail character={current} displayExtendedInfo={true} size={ThumbnailSize.Full}/>}
          { isFetching && <Loader/>}
        </div>
        <div className={styles.previous}>
            {filtered.map(character => <Thumbnail key={character.id.toString()} character={character} displayExtendedInfo={false} size={ThumbnailSize.Small}/>)}
        </div>
      </main>
    </>
  )
}
