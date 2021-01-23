import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

const BeerGridStyles = styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingeBeerStyles = styled.div`
    border: 1px solid var(--gray);
    padding: 2rem;
    text-align: center;
    img {
        width: 100%;
        height: 200px;
        object-fit: contain;
        display: grid;
        align-items: center;
        font-size: 10px;
        color: black;
    }
`;

export default function BeerPage({data}) {
    return (
        <>
            <SEO title={`Beers! We have ${data.beers.nodes.length}` } />
            <h2 className="center">
                we have {data.beers.nodes.length} Beers Avaliiable. Dine in Only! Dine in Only!!
            </h2>
            <BeerGridStyles>
                {
                    data.beers.nodes.map((beer) => {
                        const rating = Math.round(beer.rating.average)

                        return (
                            <SingeBeerStyles key={beer.id}>
                                <img src={beer.image} alt={beer.name} />
                                <h3>{beer.name}</h3>
                                {beer.price}
                                <p title={`${rating} of 5 star`}>
                                    {`⭐`.repeat(rating)}
                                    <span style={{filter: `grayscale(100%)`}}>
                                        {`⭐`.repeat(5-rating)}
                                    </span>
                                    <span>
                                        ({beer.rating.reviews})
                                    </span>
                                </p>
                            </SingeBeerStyles>
                        )
                    })
                }
            </BeerGridStyles>
        </>
    );
}
/*
export const query = graphql`
  query {
    beers: allBear {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
*/