/**
 * Created by ljy on 16/9/29.
 */
import React from 'react';
import { Link,IndexLink } from 'react-router';
import styles from '../styles/Main-Layout.css';
// import MyModal from '../components/MyModal';
// import appleimage from '../images/apple.png';

// Using "Stateless Functional Components"
export default function(props) {
    return (

        <div className={styles.mainlayout}>
            {/*<header className={styles.primaryheader}>www.myhis.com</header>*/}
            <aside className={styles.aside}>
                <div className={styles.item1}></div>
                <div className={styles.item2}>
                    <Link activeClassName={styles.active} to="/aa">
                        <div className={styles.item_add}></div>
                    </Link>
                </div>

                <div className={styles.item2}>
                    <Link activeClassName={styles.active} to="/">
                        <div className={styles.item_bj}></div>
                    </Link>
                </div>

                <div className={styles.item2}>
                    <Link activeClassName={styles.active} to="/userSet">
                        <div className={styles.item_bj}></div>
                    </Link>
                </div>


                <div className={styles.itembottom} onClick={ logout }>
                </div>

            </aside>
            <main className={styles.main}>
                {props.children}
            </main>
        </div>
    );
}

function logout() {
    // console.log('logout !');
    sessionStorage.setItem("umid","");
    sessionStorage.setItem("token","");
    sessionStorage.setItem("siteip","");
    sessionStorage.setItem("siteport","");
    window.location.href="index.html";
}

