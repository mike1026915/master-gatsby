import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import userLastestData from '../utils/useLatestData';

function CurrentSlicing({ slicemasters }) {
    console.log(slicemasters)

    return (
        <div>
            <h2 className="center">
                <span className="mark tilt">Slicemasters On</span>
            </h2>
            <p>Standing by, ready to slice you up!</p>
            {!slicemasters && <LoadingGrid count={4}/>}
            {slicemasters && !slicemasters?.length && <p>No onw is working right now</p>}
            {slicemasters?.length && <ItemGrid items={slicemasters} />}
        </div>
    );
}

function HotSlices({hotSlices}) {
    console.log(hotSlices)

    return (
        <div>
            <h2 className="center">
                <span className="mark tilt">Hot Slices On</span>
            </h2>
            <p>Come on by, buy the slice!</p>
            {!hotSlices && <LoadingGrid count={4}/>}
            {hotSlices?.length && <ItemGrid items={hotSlices} />}
            {hotSlices?.length && <ItemGrid items={hotSlices} />}
        </div>
    );
}

export default function HomePage() {
    const {slicemasters, hotSlices} = userLastestData();

    return (
        <div className="center">
            <h1> The Best Pizza Donwtown! </h1>
            <p> Open 1am to 11am Every Single Day</p>
            <HomePageGrid>
                <CurrentSlicing slicemasters={slicemasters}/>
                <HotSlices hotSlices={hotSlices}/>
            </HomePageGrid>
        </div>
    );
}
