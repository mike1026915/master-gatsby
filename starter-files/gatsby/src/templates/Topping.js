import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

export default function SingleToppingPage({data, pageContext}) {
    const pizzas = data.pizza.nodes;

    return (
        <>
            <SEO
                title={`Pizza With ${pageContext.topping}`}
            />
            <ToppingsFilter />
            <PizzaList
                pizzas={pizzas}
            />
        </>
    );
}

export const query = graphql`
query($toppingId: String!) {
  pizza: allSanityPizza(filter: {
    toppings: {
      elemMatch: {
        id: {
          eq: $toppingId
          }
        }
      }
    }) {
    nodes {
      name
      id
      slug {
        current
      }
      toppings {
        id
        name
      }
      image {
        asset {
          fixed(width: 200, height: 200) {
            ...GatsbySanityImageFixed
          }
          fluid(maxWidth: 400) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
}
`