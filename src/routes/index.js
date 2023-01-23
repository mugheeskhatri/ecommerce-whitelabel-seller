import { lazy } from 'react'
// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Costumers = lazy(() => import('../pages/Costumers'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const newProduct = lazy(() => import('../pages/products/NewProduct'))
const category = lazy(() => import('../pages/Category'))
const allProducts = lazy(() => import('../pages/products/allproducts'))
const orders = lazy(() => import('../pages/orders'))
const reviews = lazy(() => import('../pages/reviews'))
const editProduct = lazy(() => import('../pages/products/editProduct'))
const appearance = lazy(() => import('../pages/appearance'))
const allSales = lazy(() => import('../pages/sale/flashSale'))
const createSale = lazy(() => import('../pages/sale/createFlashSale'))
const allCoupens = lazy(() => import('../pages/coupens/allCoupens'))
const createCoupen = lazy(() => import('../pages/coupens/createCoupen'))
const categorySale = lazy(() => import('../pages/sale/categorySale'))
const allCategorySale = lazy(() => import('../pages/sale/allCategorySale'))
const layout = lazy(() => import('../pages/layout/index')) 
const editCoupen = lazy(() => import('../pages/coupens/editCoupen'))
const orderDetail = lazy(() => import('../pages/orderDetails'))
const createCategory = lazy(()=> import('../pages/addCategory'))
const productDetails = lazy(()=> import('../pages/products/productDetails'))
const attributes = lazy(()=> import('../pages/attributes'))




/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/attributes', // the url
    component: attributes, // view rendered
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/categorySale',
    component: categorySale,
  },
  {
    path: '/allCategorySale',
    component: allCategorySale,
  },
  {
    path: '/allSales',
    component: allSales,
  },
  {
    path: '/createSale',
    component: createSale,
  },
  {
    path: '/costumers',
    component: Costumers,
  },
  {
    path: '/createCoupen',
    component: createCoupen,
  },
  {
    path: '/allCoupens',
    component: allCoupens,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/new-product',
    component: newProduct,
  },
  {
    path: '/edit-product/:id',
    component: editProduct,
  },
  {
    path: '/product-details/:id',
    component: productDetails,
  },
  {
    path: '/category',
    component: category,
  },
  {
    path: '/create/category',
    component: createCategory,
  },
  {
    path: '/all-products',
    component: allProducts,
  },
  {
    path: '/orders',
    component: orders,
  },
  {
    path: '/reviews',
    component: reviews,
  },
  {
    path: '/appearance',
    component: appearance,
  },
  {
    path: '/layout',
    component: layout,
  },
  {
    path: '/coupen/edit/:id',
    component: editCoupen,
  },
  {
    path: '/orderDetail/:id',
    component: orderDetail,
  },
]

export default routes
