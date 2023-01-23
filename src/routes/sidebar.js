/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/orders',
    icon: 'FormsIcon',
    name: 'Orders',
  },
  {
    path: '/app/reviews',
    icon: 'FormsIcon',
    name: 'Reviews',
  },
  {
    path: '/app/attributes',
    icon: 'FormsIcon',
    name: 'Attributes',
  },
  {
    path: '/app/costumers',
    icon: 'CardsIcon',
    name: 'Customers',
  },
  {
    icon: 'PagesIcon',
    name: 'Products',
    routes: [
      // submenu
      {
        path: '/app/all-products',
        name: 'All Products',
      },
      {
        path: '/app/new-product',
        name: 'Add New',
      },
      {
        path: '/app/404',
        name: 'Tags',
      },
      {
        path: '/app/blank',
        name: 'Attributes',
      },
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Categories',
    routes: [
      // submenu
      {
        path: '/app/category',
        name: 'All Categories',
      },
      {
        path: '/app/create/category',
        name: 'Add New',
      },
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Flash Sales',
    routes: [
      // submenu
      {
        path: '/app/allSales',
        name: 'All Sales',
      },
      {
        path: '/app/createSale',
        name: 'Add New',
      },
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Category Sales',
    routes: [
      // submenu
      {
        path: '/app/categorySale',
        name: 'Add Category Sale',
      },
      {
        path: '/app/allCategorySale',
        name: 'All Category Sale',
      },

    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Coupen',
    routes: [
      // submenu
      {
        path: '/app/allCoupens',
        name: 'All Coupens',
      },
      {
        path: '/app/createCoupen',
        name: 'Create Coupen',
      },
    ],
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Reports',
  },
  {
    path: '/app/buttons',
    icon: 'ButtonsIcon',
    name: 'Settings',
  },
  {
    path: '/app/appearance',
    icon: 'ModalsIcon',
    name: 'Appearance',
  },
  {
    path: '/app/tables',
    icon: 'TablesIcon',
    name: 'Marketing',
  },
  {
    path: '/app/layout',
    icon: 'PagesIcon',
    name: 'Application Layout',
  },
]

export default routes
