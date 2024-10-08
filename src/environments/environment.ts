// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const host = 'http://localhost';
const ports = {
    user: 8080,
    stock: 8090,
    transaction: 9000,
    cart: 9010,
    report: 9020,
};

const basePaths = {
    user: '/emazon/user/v1',
    stock: '/emazon/stock/v1',
    transaction: '/emazon/transaction/v1',
    cart: '/emazon/cart/v1',
    report: '/emazon/report/v1',
};

export const environment = {
  production: false,
  userApiUrl: `${host}:${ports.user}${basePaths.user}`,
  stockApiUrl: `${host}:${ports.stock}${basePaths.stock}`,
  transactionApiUrl: `${host}:${ports.transaction}${basePaths.transaction}`,
  cartApiUrl: `${host}:${ports.cart}${basePaths.cart}`,
  reportApiUrl: `${host}:${ports.report}${basePaths.report}`,
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
