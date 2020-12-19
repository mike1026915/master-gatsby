import path from 'path';

import fetch from 'isomorphic-fetch';

async function trunPizzaIntoPage({actions}, data) {

    // 1. Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js')

    // 3. Loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach((pizza) => {
        actions.createPage({
            path: `/pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            }
        })
    })

}

async function turnToppingsIntoPage({actions}, data) {
    const toppingTemplate = path.resolve('./src/templates/Topping.js');

    data.pizzas.nodes.map(t=>t.toppings).flat().forEach((topping) => {
        actions.createPage({
            path: `/topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
                toppingId: topping.id,
            }
        })
    })
}

async function fetchBeetsAndTrunIntoNodes({actions, createNodeId, createContentDigest}) {
    const res = await fetch('https://sampleapis.com/beers/api/ale');
    const beers = await res.json();
    beers.forEach((beer) => {
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Bear',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer),
            },
        }
        actions.createNode({
            ...beer,
            ...nodeMeta,
        })
    })

}

// sourceNodes will execute before createPages, because it is fetching the data
export async function sourceNodes(params) {
    // fetch a list of beets and source them into our gatsby API
    await Promise.all([fetchBeetsAndTrunIntoNodes(params)]);

}

export async function createPages(params) {
    // Query all pizzas
    const { data } = await params.graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                    toppings {
                        id
                        name
                      }
                }
            }
        }

    `)
    // create page dynamically
    await Promise.all([
        trunPizzaIntoPage(params, data),
        turnToppingsIntoPage(params, data)
    ]);

    // 1. pizzas
    // 2. toppings
    // 3. slicemasters
}