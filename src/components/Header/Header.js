import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./Header.module.scss";
import { Button } from '../Button/Button';
import { HomeHeader } from "../HomeHeader/HomeHeader";
import SearchHeader from '../SearchHeader/SearchHeader';

export class Header extends React.Component {



    render() {
        const isHome = this.props.isHome;

        return (
            <header className={styles.container}>
                {isHome ? <HomeHeader isMobile={this.props.isMobile} /> : <SearchHeader isMobile={this.props.isMobile} />// <SearchHeader />
                }

            </header>
        );
    }
}
