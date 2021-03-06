import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`

export default function SinglePizzaPage({data}) {
    const { pizza } = data;

    return (
        <>
            <SEO
                title={pizza.name}
                image={pizza.image?.asset?.fluid?.src}
            />
            <PizzaGrid>
                <Helmet>
                    <title>{pizza.name}</title>
                </Helmet>
                <Img fluid={pizza.image.asset.fluid} />
                <div>
                    <h2 className="mark">{pizza.name}</h2>
                    <ul>
                        {pizza.toppings.map((topping) => {
                            return (
                                <li key={topping.id}>
                                    {topping.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </PizzaGrid>
        </>

    );
}

// This needs to be dunamic based on the slug pased in via context in gatsby-node.js
export const query = graphql`
    query($slug: String!) {
        pizza: sanityPizza(
            slug: {
                current : {
                    eq: $slug,
                }
            }
        ) {
            name
            id
            image {
                asset {
                    fluid(maxWidth: 800) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
            toppings {
                name
                id
                vegetarian
            }
        }

    }
`;