import React, { Children } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Footer from './Footer';
import Nav from './Nav';

import stripes from '../assets/images/stripes.svg';

const SideBorderStyles = styled.div`
    max-width: 1000px;
    margin: 12rem auto 4rem auto;
    margin-top: clamp(2rem, 10vw, 12rem);
    background: white url(${stripes});
    background-size: 1500px;
    border: 5px solid white;
    padding: 5px;
    padding: clamp(5px, 1vw, 25px);
    box-shadow: 0 0 5px 3px rgba(0,0,0, 0.05);

    @media (max-width: 1100px) {
        margin-left: 1.5rem;
        margin-right: 1.5rem;
    }
`;

const ContentStyles = styled.div`
    background: white;
    padding: 2rem;
`;

export default function Layout(props) {
    return (
        <>
            <GlobalStyles />
            <Typography />

            <SideBorderStyles>
                <ContentStyles>
                    <Nav />
                    {props.children}
                    <Footer />
                </ContentStyles>
            </SideBorderStyles>
        </>
    );
}
