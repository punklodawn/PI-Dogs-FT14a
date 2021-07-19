import React from 'react'
import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import SearchBar from "../searchBar/SearchBar";

export default function Navbar() {
    return (
        <header className={style.header}>
          <nav className={style.nav}>
            <ul className={style.ulmenu}>
              <li className={style.imgli}>
                <Link to="/">
                  <img
                    className={style.img}
                    src=""
                    alt="main-img-logo"
                  />
                </Link>
              </li>

              <div className ={style.SearchBar}>
              <SearchBar></SearchBar>
            </div>

              <div className={style.rightMenu}>
         
                <li className={style.li}>
                  <Link className={style.link} to={`/dog/addbreed`}>
                    ADD BREEDS
                  </Link>
                </li>

                <li className={style.li}>
                  <Link className={style.link} onClick={() => {window.location.href="/dogs"}} >
                    HOME
                  </Link>
                </li>
              </div>
            </ul>
          </nav>
        </header>
      )
    }
