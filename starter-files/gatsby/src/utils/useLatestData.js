import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = gql`
    name
    _id
    image {
        asset {
        url
        metadata {
            lqip
        }
        }
    }
`;

export default function userLastestData() {
    const [hotSlices, setHotSlices] = useState();
    const [slicemasters, setSlicemaster] = useState();

    // use a side effect to fetch the data from the sanity graphql endpoint
    useEffect(() => {
        //when the component laads, fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: gql`

                query {
                   StoreSettings(id: "downtown") {
                    name
                    Slicemaster {
                        ${deets}
                    }
                    hotSlices {
                        ${deets}
                    }
                }
            }
                `,
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data)
                setHotSlices(res.data.StoreSettings.hotSlices);
                setSlicemaster(res.data.StoreSettings.Slicemaster);
        }).catch((err) => {
            console.log('gg')
            console.log({err})
        })
    }, [])

    return {
        hotSlices,
        slicemasters,
    }
}