import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/';
import { News, Footer } from './components/';
import { maxOffsetThunk, someThunk, setOffset } from './redux/action/news';

function App() {
  const dispatch = useDispatch();
  const [actualOffset, setActualOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [loading, setLoading] = useState(0);
  const actualReduxOffset = useSelector((state) => state.news.actualOffset);
  const actualReduxMaxOffset = useSelector((state) => state.news.maxOffset);

  function checkIfExists(e, actualOffset, maxOffset) {
    const scrollSection = e.target;
    const { scrollHeight, scrollTop, clientHeight } = scrollSection;
    if (clientHeight + scrollTop >= scrollHeight) {
      if (actualOffset <= maxOffset * 6) {
        setLoading(true);
      }
      return false;
    }
  }

  useEffect(() => {
    if (actualOffset <= maxOffset * 6 && loading) {
      dispatch(someThunk(actualOffset));
      dispatch(setOffset(actualOffset));
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const scrollSection =
      document.getElementsByClassName('app-news-section')[0];
    scrollSection.addEventListener('scroll', (e) =>
      checkIfExists(e, actualOffset, maxOffset)
    );

    return scrollSection.removeEventListener('scroll', (e) =>
      checkIfExists(e, actualOffset, maxOffset)
    );
  }, []);

  useEffect(() => {
    dispatch(someThunk(actualOffset));
    dispatch(maxOffsetThunk());
    dispatch(setOffset(actualOffset));
  }, []);

  useEffect(() => {
    setActualOffset(actualReduxOffset);
    setMaxOffset(actualReduxMaxOffset);
  }, [actualReduxMaxOffset, actualReduxOffset]);

  return (
    <div className="app">
      <header className="app-header">
        <NavBar />
      </header>
      <section className="app-news-section">
        <News />
      </section>
      <footer className="footer-wrapper">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
