import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiFillCloseSquare } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';

function NavBar() {
  const { pathname } = useLocation();

  const [isNavOpened, setIsNavOpened] = useState(false);

  function openNav() {
    document.getElementsByTagName('nav')[0].setAttribute('class', 'sidebar');
    document
      .getElementsByClassName('nav-tools')[0]
      .setAttribute('class', 'temp');
    document
      .getElementsByClassName('mobile-nav-menu')[0]
      .setAttribute('class', 'mobile-nav-menu-opened');
    setIsNavOpened(true);
  }

  function closeNav() {
    document
      .getElementsByClassName('temp')[0]
      .setAttribute('class', 'nav-tools');
    document.getElementsByTagName('nav')[0].setAttribute('class', 'nav-menu');
    document
      .getElementsByClassName('mobile-nav-menu-opened')[0]
      .setAttribute('class', 'mobile-nav-menu');
    setIsNavOpened(false);
  }

  useEffect(() => {
    try {
      document
        .getElementById(pathname)
        .setAttribute('class', 'current-nav-section');
    } catch (e) {
      document.getElementById('/').setAttribute('class', 'current-nav-section');
    }
  }, [pathname]);
  return (
    <nav className="nav-menu">
      <Link to="/">
        <h2>Blog Posts</h2>
      </Link>
      <section className="nav-tools">
        <ul>
          <Link to="/">
            <li id="/">Home</li>
          </Link>
          <Link to="/news/create">
            <li id="/news/create">Criar Post</li>
          </Link>
          <li>Meus Posts</li>
        </ul>
        <section className="search">
          <label htmlFor="search">
            <BsSearch />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Buscar author, posts..."
          ></input>
        </section>
      </section>
      <section
        className="mobile-nav-menu"
        onClick={isNavOpened ? closeNav : openNav}
      >
        {isNavOpened ? (
          <AiFillCloseSquare className="nav-icon" />
        ) : (
          <HiDotsVertical className="nav-icon" />
        )}
      </section>
    </nav>
  );
}

export default NavBar;
