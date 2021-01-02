import React, { useState, useRef, useEffect } from 'react';
import styles from "./HeaderHOC.module.scss";
import { Header } from "../Header/Header";
import SearchHeader from '../SearchHeader/SearchHeader';
import { useHistory } from 'react-router-dom';

export function HeaderHOC(props) {
    const headerRef = useRef(null);
    const [isSticky, setSticky] = useState(false);
    const [overlayMenu , setOverlayMenu] = useState(false);
    let history = useHistory();
    const handleScroll = () => {
        if (headerRef.current) {
            setSticky(window.pageYOffset > headerRef.current.offsetTop);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

  const  toggleMobMenu = (event) => {
        event.preventDefault();
        setOverlayMenu(!overlayMenu)
    }

    const handleSelectedLink = location => {
        // only for mobile
        setOverlayMenu(!overlayMenu)
        
        history.push(location)
    }
    return (

        <header className={styles.container}>
            <div ref={headerRef} className={`${styles.myHeader} ${isSticky ? styles.sticky : ''}`}>
                <Header user={props.props.user} handleSelectedLink={handleSelectedLink} overlayMenu={overlayMenu} toggleMobMenu={toggleMobMenu} />
                 </div>
        </header>




    );
}
/*export class Header extends React.Component {
constructor(props){
    super(props);
    this.state = {isSticky: false};
    const handleScroll = () => {
    if (headerRef.current) {
        headerRef.current.getBoundingClientRect().top <= 0 ? setState({isSticky: true}) : this.setState({isSticky: false});
    }
    };
}

useEffect();


    render() {
        const isHome = this.props.isHome;

        return (

            <header className={styles.myHeader} >
                <div className={styles.container}>
                {isHome ? <Header isMobile={this.props.isMobile} /> : <SearchHeader isMobile={this.props.isMobile} />
                }
                </div>


            </header>
        );
    }
} */
