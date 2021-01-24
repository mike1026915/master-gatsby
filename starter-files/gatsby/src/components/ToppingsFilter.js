import React from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';

const ToppingStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;
    font-size: clamp(1.5rem, 1.5vw, 2.5rem);
    a {
        display: grid;
        grid-template-columns: auto auto;
        padding: 5px;
        grid-gap: 0 1rem;
        align-items: center;
        padding: 5px;
        background: var(--grey);
        border-radius : 2px;
        .count {
            background: white;
            padding: 2px 5px
        }
        &[aria-current="page"] {
            background: var(--yellow);
        }
    }

`;

function countToppingsInPizzas(pizzas) {
    return pizzas.nodes.map((t=>t.toppings)).flat().reduce((acc, topping) => {
       if(topping.id in acc){
           acc[topping.id].count += 1
       } else {
           acc[topping.id] = {
               count: 1,
               name: topping.name,
               id: topping.id,
           }
       }

       return acc;
   }, {});
}

export default function ToppingsFilter() {
    const {toppings, pizzas} = useStaticQuery(graphql`
    query toppingQuery {
        toppings: allSanityTopping {
            nodes {
                id
                name
                vegetarian
            }
        }
        pizzas: allSanityPizza {
            nodes {
                toppings {
                    id
                    name
                }
            }
        }
    }`);
    const lookup = countToppingsInPizzas(pizzas)
    const sortedToppings = Object.values(lookup).sort((a,b) => b.count-a.count);

    return (
        <ToppingStyles>
            <Link to="/pizzas" >
                <span className="name">All</span>
                <span className="count">{pizzas.nodes.length}</span>
            </Link>
            {sortedToppings.map((topping) => (
                <Link to={`/topping/${topping.name}`} >
                    <span className="name">{topping.name}</span>
                    <span className="count">{topping.count}</span>
                </Link>
            ))}
        </ToppingStyles>
    );
}