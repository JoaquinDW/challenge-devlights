const URL = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"

const api = {
  getDeals: async () => {
    const response = await fetch(URL)
    const data = await response.json()
    return data
  },
}

export default api
