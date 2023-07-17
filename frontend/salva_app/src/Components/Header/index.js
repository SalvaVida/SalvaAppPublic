import React, { useRef, useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";

import DateTime from '../DateTime';

import logo from '../../images/branding/logotype_color_web.svg';
import user from '../../images/icons/user--avatar--filled.svg';

import './_index.scss'

function Header() {
  return (
    <>
    <nav class="row ibm-plex">
      <div className='d-flex flex-wrap align-items-center justify-content-between my-3'>

        <NavLink exact to="/" className="d-flex align-items-center mb-2 mb-lg-0 me-8 text-dark text-decoration-none">
          <img src={logo} className="nav-logo" alt="logo" />
        </NavLink>

        <ul class="nav justify-content-start flex-fill fs-5">
            <li>
              <NavLink to="/chamado" className="nav-link link-dark px-0">Chamado</NavLink>
            </li>
            {/* <li>
              <NavLink to="/viagens" className="nav-link link-dark px-0">Viagens</NavLink>
            </li> */}
            <li>
              <NavLink to="/estatisticas" className="nav-link link-dark px-0">Estatísticas</NavLink>
            </li>
        </ul>

        <div className="d-flex align-items-center justify-content-end">
          <DateTime />
          <img src={user} className="nav-icon" alt="user" />
        </div>

      </div>
    </nav>
    </>
  );
}

export default Header;
