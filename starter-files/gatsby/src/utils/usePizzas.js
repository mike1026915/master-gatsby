import { useContext, useState } from "react";
import OrderContext from "../components/OrderContext";
import attachNameAndPrices from "./attachNameAndPrices";
import calculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";

export default function userPizzas({pizzas, values}) {
    // save state
    // We got rid of this line because we moved userState up to Provider
    // const [order, setOrder] = useState([]);
    // Now we access both our state and our updater function(setOrder) via context
    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('');

    // add order
    function addToOrder(orderPizza) {
        setOrder([...order, orderPizza]);
    }
    // remove order
    function removeFromOrder(index) {
        setOrder([...order.slice(0, index), ...order.slice(index+1)]);
    }

    //Run when someone submit the form
    async function submitOrder(e){
        e.preventDefault()
        setLoading(true);
        setError(null);
        setMessage(null);
        const body = {
            order: attachNameAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            sugar: values.sugar,
        }
        console.log(body)

            // send order
        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const text = JSON.parse(await res.text())

        if(res.status >= 400 && res.status < 600) {
            setLoading(false);
            setError(text.message)
        } else {
            setLoading(false);
            setMessage('Success! Come on down for your pizza')
        }
    }




    return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    }
}