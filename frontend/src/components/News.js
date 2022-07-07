import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NewsCard from './NewsCard';

function News() {
  const { allNews } = useSelector((state) => state.news);

  useEffect(() => {
    console.log('WIP...');
  }, [allNews]);
  return (
    <>
      <h2>Todas as noticias</h2>
      <section className="app-news-card-wrapper">
        <section className="app-news-card-section">
          <section className="app-news-card-article-wrapper">
            {allNews && allNews.length > 0 ? (
              allNews.map((notice) => {
                return (
                  <NewsCard news={notice} key={notice.id + Math.random()} />
                );
              })
            ) : (
              <h2>Sem noticias no momento... :0</h2>
            )}
          </section>
        </section>
      </section>
    </>
  );
}

export default News;
