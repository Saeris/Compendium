import ApolloClient, { createNetworkInterface } from 'apollo-client'

export default class Apollo {
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
    // http://dev.apollodata.com/core/network.html

    // Configure the client to use the api provider from our api config
    let networkInterface = createNetworkInterface({ uri: `http://localhost:1337/api` })

    // Add authorization tokens to our request headers before making calls to the api
    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}
        }
        //req.options.headers.authorization = `bearer ${<token>}`
        next()
      }
    }])

    this.client = new ApolloClient({ networkInterface })
  }
}
