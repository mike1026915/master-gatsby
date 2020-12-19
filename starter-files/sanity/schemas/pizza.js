import { MdLocalPizza as icon } from 'react-icons/md';

import PriceInput from '../component/PriceInput';

export default {
  // computer name
  name: 'pizza',
  // visiable title
  title: 'Pizzas',
  icon,
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'topping',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      toppingName0: 'toppings.0.name',
      toppingName1: 'toppings.1.name',
      toppingName2: 'toppings.2.name',
      toppingName3: 'toppings.3.name',
      toppingVeg0: 'toppings.0.vegetarian',
      toppingVeg1: 'toppings.1.vegetarian',
      toppingVeg2: 'toppings.2.vegetarian',
      toppingVeg3: 'toppings.3.vegetarian',
    },
    prepare: ({
      title,
      media,
      toppingName0,
      toppingName1,
      toppingName2,
      toppingName3,
      toppingVeg0,
      toppingVeg1,
      toppingVeg2,
      toppingVeg3,
    }) => ({
      title: `${title}${
        [toppingVeg0, toppingVeg1, toppingVeg2, toppingVeg3]
          .filter((t) => t !== undefined)
          .every(Boolean)
          ? '🌿'
          : ''
      }`,
      media,
      subtitle: [toppingName0, toppingName1, toppingName2, toppingName3]
        .filter(Boolean)
        .join(', '),
    }),
  },
};
