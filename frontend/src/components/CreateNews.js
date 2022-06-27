import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createThunk } from '../redux/action/news';
import NavBar from './NavBar';

function CreateNews() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.news.form);

  function submitForm(form) {
    dispatch(createThunk(form));
  }

  return (
    <div className='app-news-create-wrapper'>
      <header className="app-header">
        <NavBar />
      </header>
      <section className='app-news-create-form-wrapper'>
        {
          form !== 'submitted' ? (
            <section>
              <h1>Edite sua Notícia</h1>
              <form method='POST' onSubmit={submitForm}>
                <label htmlFor='title'>Título</label>
                <input id='title' type='text' name='title' required />
                <label htmlFor='content'>Conteúdo</label>
                <input id='content' type='textarea' name='content' maxLength={500} required />
                <label htmlFor='category'>Categoria</label>
                <input id='category' name='categoryName' type='text' required />
                <button type='submit'>Postar</button>
              </form>
            </section>
          ) : <div>Enviado com sucesso!</div>
        }
        <section className='app-news-create-lastnews '>
          <h2>Últimas notícias!</h2>
          <div>Em breve...</div>
        </section>
      </section>
    </div>
  );
}

export default CreateNews;
