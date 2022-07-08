import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NewsCard(props) {
  const notice = props.news;
  return (
    <article>
      <Link to={`/news/${notice.id}`}>
        <h1>{notice.title}</h1>
        <p>{notice.content}</p>
        <span>
          ~<em>{notice.categoryName}</em>
        </span>
      </Link>
    </article>
  );
}

NewsCard.propTypes = {
  news: PropTypes.object,
};

export default NewsCard;
