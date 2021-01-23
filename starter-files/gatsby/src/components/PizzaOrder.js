import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import Img from 'gatsby-image';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({order, pizzas, removeFromOrder}) {
    return (
        <>
        {order.map((o, index) => {
            const pizza = pizzas.find(pizza => pizza.id === o.id)
            return (
                <MenuItemStyles key={`${o.id}-${index}`}>
                    <Img fluid={pizza.image.asset.fluid}></Img>
                    <h2>{pizza.name}</h2>
                    <p>{formatMoney(calculatePizzaPrice(pizza.price, o.size))}</p>
                    <button type="button" className="remove" title={`Remove ${o.isze} ${pizza.name}`}
                        onClick={() => removeFromOrder(index)}
                    >
                        &times;
                    </button>
                </MenuItemStyles>
            )
        })}
        </>
    );
}