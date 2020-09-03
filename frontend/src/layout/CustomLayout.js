import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from "react-router-dom";

const CustomLayout = props => {
    return (
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    {/* <Link to="/"> Phonebook and calculator </Link> */}
                </div>
                <div className="header-links">
                    <div className="dropdown">
                        <Link to="/">
                            Home
                    </Link>
                        <Link to="/phonebook">
                            Phonebook
                    </Link>
                    </div>
                </div>
            </header>
            <main className="main">
                <div className="content">
                    {props.children}
                </div>
            </main>
            <footer className="footer">
                All reserved
        </footer>
        </div>
    );
}

export default CustomLayout;
