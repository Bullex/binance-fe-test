const GET_PREFIX = `/exchange-api/v1/public/asset-service`
const WS_URL = `wss://stream.binance.com/stream?streams=!miniTicker@arr`

const ENDPOINTS = {
  GET_PRODUCTS: `${GET_PREFIX}/product/get-products`, // Get products
}

export {
  ENDPOINTS,
  WS_URL
}
