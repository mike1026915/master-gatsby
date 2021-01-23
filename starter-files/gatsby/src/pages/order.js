import React from 'react';
import useForm from '../utils/userForm';
import Img from 'gatsby-image';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import SEO from '../components/SEO';
import usePizzas from '../utils/usePizzas';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({data}) {
    const pizzas = data.pizzas.nodes;
    const { values, updateValues } = useForm({
        name: '',
        email: '',
        sugar: '',
    })
    const {order, addToOrder, removeFromOrder, error, loading, message, submitOrder} = usePizzas({
        pizzas,
        values,
    });

    if(message) {
        return <p>{message}</p>
    }

    return (
        <>
            <SEO
                title="Order a pizza!"
            />
           <OrderStyles onSubmit={submitOrder}>
               <fieldset disable={loading}>
                    <legend>Your Info</legend>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={values.name} onChange={updateValues}/>
                    <label htmlFor="email" id="email" >Email</label>
                    <input type="text" name="email" value={values.email} onChange={updateValues} />
                    <input type="text" name="sugar" value={values.sugar} onChange={updateValues} />
               </fieldset>
               <fieldset  disable={loading} className="menu">
                    <legend>Menu</legend>
                    {pizzas.map((pizza) => (
                        <MenuItemStyles key={pizza.id}>
                            <Img width="50px" height="50px" alt={pizza.name} fluid={pizza.image.asset.fluid} />
                            <div>
                                <h2>{pizza.name}</h2>
                            </div>
                            <div>
                                {['S', 'M', 'L'].map((size) => {
                                    return (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={(event) => (
                                            addToOrder({
                                                id: pizza.id,
                                                size,
                                            })
                                        )}>
                                            {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                                        </button>
                                    );
                                })}
                            </div>
                        </MenuItemStyles>
                    ))}
               </fieldset>

               <fieldset  disable={loading} className="order">
                    <legend>Order</legend>
                    <PizzaOrder
                        order={order}
                        removeFromOrder={removeFromOrder}
                        pizzas={pizzas}
                    />
               </fieldset>
               <fieldset  disable={loading}>
                    <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
                    <button type="submit" disable={loading.toString()}>
                        {loading ? 'Placing Order... ' : 'Order Ahead'}
                    </button>
                    <div>
                            {error ? (<p>Error: {error}</p> ) : ''}
                    </div>
               </fieldset>
           </OrderStyles>
        </>
    );
}

export const query = graphql`
query {
  pizzas: allSanityPizza {
    nodes {
      name
      id
      slug {
        current
      }
      price
      image {
        asset {
          fluid(maxWidth: 100) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
}

`