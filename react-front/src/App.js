import React, {useEffect} from 'react';
import MainRouter from "./components/MainRouter/MainRouter";
import MainMenu from "./components/MainMenu/MainMenu";
import { compose } from "redux";
import { connect } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/appReducer";

const App = ({ initializeApp, initialized }) => {

    useEffect(() => {
        initializeApp();
    }, [initialized]);

    if (!initialized) return <Preloader />;

    return (
        <div className='container'>
            <MainMenu/>
            <MainRouter/>
        </div>
    )
};

const mapStateToProps = state => ({
    initialized: state.app.initialized
});

export default compose(
    connect(mapStateToProps, { initializeApp })
)(App);
