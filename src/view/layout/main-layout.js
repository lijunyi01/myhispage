/**
 * Created by ljy on 16/9/29.
 */
import React from 'react';
import { Link,IndexLink } from 'react-router';
import styles from '../styles/Main-Layout.css';
// import appleimage from '../images/apple.png';

// Using "Stateless Functional Components"
export default function(props) {
    return (

        <div className={styles.mainlayout}>
            {/*<header className={styles.primaryheader}>www.myhis.com</header>*/}
            {/*<aside className={styles.primaryaside}>*/}
                {/*<ul>*/}
                    {/*<li><img src={appleimage} alt=""/></li>*/}
                    {/*<li><p>&nbsp;</p></li>*/}
                    {/*<li><IndexLink to="/" activeClassName={styles.active}>Home</IndexLink></li>*/}
                    {/*<li><Link to="/myHisList" activeClassName={styles.active}>MyHisList</Link></li>*/}
                    {/*<li><Link to="/addHisProj" activeClassName={styles.active}>AddHisProj</Link></li>*/}
                {/*</ul>*/}
            {/*</aside>*/}
            <aside className={styles.aside}>
                <div className={styles.item1}></div>
                <br/><br/>

                <Link className={styles.link_add} to="/addHisProj">
                    <div className={styles.item_add}></div>
                </Link>

                <div className={styles.item1}></div>
                <div className={styles.item1}></div>
            </aside>
            <main className={styles.main}>
                {props.children}
            </main>
        </div>
    );
}

