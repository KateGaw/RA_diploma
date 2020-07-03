import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import headerlogo from "./img/header-logo.png";
import "./App.css";

import MainPage from "./components/MainPage";
import CatalogPage from "./components/CatalogPage";
import AboutPage from "./components/AboutPage";
import ContactsPage from "./components/ContactsPage";
import ChartPage from "./components/ChartPage";
import ErrorPage from "./components/ErrorPage";
import Banner from "./components/Banner";

function App() {
  return (
    <>
      <Router>
        {/* HEADER */}
        <header className="container">
          <div className="row">
            <div className="col">
              <div className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand" href="/">
                  <img src={headerlogo} alt="Bosa Noga" />
                </a>

                <div className="collapase navbar-collapse" id="navbarMain">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">
                        Главная
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/catalog" className="nav-link">
                        Каталог
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about" className="nav-link">
                        О магазине
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contacts" className="nav-link">
                        Контакты
                      </Link>
                    </li>
                  </ul>

                  <div>
                    <div className="header-controls-pics">
                      <div
                        data-id="search-expander"
                        className="header-controls-pic header-controls-search"
                      ></div>
                      {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                      <Link to="/chart">
                        <div className="header-controls-pic header-controls-cart">
                          <div className="header-controls-cart-full">1</div>
                          <div className="header-controls-cart-menu"></div>
                        </div>
                      </Link>
                    </div>
                    <form
                      data-id="search-form"
                      className="header-controls-search-form form-inline invisible"
                    >
                      <input className="form-control" placeholder="Поиск" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="container">
          <div className="row">
            <div className="col">
              <Banner />

              <Switch>
                <Route path="RA_diploma/" exact>
                  <MainPage />
                </Route>
                <Route path="RA_diploma/catalog">
                  <CatalogPage />
                </Route>
                <Route path="RA_diploma/about">
                  <AboutPage />
                </Route>
                <Route path="RA_diploma/contacts">
                  <ContactsPage />
                </Route>
                <Route path="RA_diploma/chart">
                  <ChartPage />
                </Route>
                <Route>
                  <ErrorPage />
                </Route>
              </Switch>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="container bg-light footer">
          <div className="row">
            <div className="col">
              <section>
                <h5>Информация</h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/about" className="nav-link">
                      О магазине
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/catalog" className="nav-link">
                      Каталог
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contacts" className="nav-link">
                      Контакты
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
            <div className="col">
              <section>
                <h5>Принимаем к оплате:</h5>
                <div className="footer-pay">
                  <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                  <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                  <div className="footer-pay-systems footer-pay-systems-visa"></div>
                  <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                  <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                  <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
                </div>
              </section>
              <section>
                <div className="footer-copyright">
                  2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
                  аксессуаров. Все права защищены.
                  <br />
                  Доставка по всей России!
                </div>
              </section>
            </div>
            <div className="col text-right">
              <section className="footer-contacts">
                <h5>Контакты:</h5>
                <a
                  className="footer-contacts-phone"
                  href="tel:+7-495-790-35-03"
                >
                  +7 495 79 03 5 03
                </a>
                <span className="footer-contacts-working-hours">
                  Ежедневно: с 09-00 до 21-00
                </span>
                <a
                  className="footer-contacts-email"
                  href="mailto:office@bosanoga.ru"
                >
                  office@bosanoga.ru
                </a>
                <div className="footer-social-links">
                  <div className="footer-social-link footer-social-link-twitter"></div>
                  <div className="footer-social-link footer-social-link-vk"></div>
                </div>
              </section>
            </div>
          </div>
        </footer>
      </Router>
    </>
  );
}

export default App;
