import { MdPerson as icon } from 'react-icons/md';

export default {
  // computer name
  name: 'storeSettings',
  // visiable title
  title: 'Settings',
  icon,
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the store',
    },
    {
      name: 'Slicemaster',
      title: 'Slicemasters Current Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices available in the case',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
