import calculatePizzaPrice from "./calculatePizzaPrice";

export default function calculateOrderTotal(order, pizzas){
    return order.reduce((acc, o) => {
        const pizza = pizzas.find((p) => (p.id === o.id));

        return acc + calculatePizzaPrice(pizza.price, o.size);
    }, 0);
}