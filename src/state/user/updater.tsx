import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../index';
import { updateMatchesDarkMode } from './actions';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();

  // keep dark mode in sync with the system
  useEffect(() => {
    const darkHandler = (match: MediaQueryListEvent) => {
      dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }));
    };

    const match = window?.matchMedia('(prefers-color-scheme: dark)');
    dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }));

    if (match?.addListener) {
    //eslint-disable-next-line
      match?.addListener(darkHandler);
    } else if (match?.addEventListener) {
    //eslint-disable-next-line
      match?.addEventListener('change', darkHandler);
    }

    return () => {
      if (match?.removeListener) {
    //eslint-disable-next-line
        match?.removeListener(darkHandler);
      } else if (match?.removeEventListener) {
    //eslint-disable-next-line
        match?.removeEventListener('change', darkHandler);
      }
    };
  }, [dispatch]);

  return null;
}
