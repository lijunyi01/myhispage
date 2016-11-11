/**
 * Created by ljy on 16/9/29.
 */
import React from 'react';
import { Link,IndexLink } from 'react-router';
import styles from '../styles/LayoutAndHome.css';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>
            <div className={styles.app}>
                {/*<header className={styles.primaryheader}>www.myhis.com</header>*/}
                <aside className={styles.primaryaside}>
                    <ul>
                        <li><IndexLink to="/" activeClassName={styles.active}>Home</IndexLink></li>
                        <li><Link to="/myHisList" activeClassName={styles.active}>MyHisList</Link></li>
                    </ul>
                </aside>
                <main>
                    {props.children}
                </main>
            </div>
        </div>
    );
}

