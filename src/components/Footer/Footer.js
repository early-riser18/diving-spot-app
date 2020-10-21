import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

export class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footerContainer}>
        <div>
          <ul className={styles.list1}>
            <Link to={"/"}>
              <li>Accueil</li>
            </Link>
            <Link to={"/add-spot"}>
              {" "}
              <li>Ajouter un spot</li>
            </Link>
            <li>Mon Profil</li>
            <li>Nous contacter</li>
            <Link to={"/result"}>
              <li>Test spot page</li>
            </Link>
          </ul>

          <ul className={styles.list2}>
            <li>Conditions d'utilisation</li>
            <li>Politique de confidentialité</li>
            <li>Reporter un problème</li>
            <li>Changer de langue</li>
          </ul>

          <ul className={styles.list3}>
            <li>©2020 How-To-Sea</li>
            <li>Tous droits réservés</li>
            <li>
              <img
                className={styles.footerLogo}
                src={require("../../assets/logo-sm.png")}
                alt=""
              />
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}
