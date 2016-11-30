const development = {
  // Our Node API is being served from localhost:3001
  baseUrl: 'http://localhost:3001',
  // The API specifies that new users register at the POST /users enpoint.
  signupUrl: 'users',
  // Logins happen at the POST /sessions/create endpoint.
  loginUrl: 'sessions/create',
  // The API serves its tokens with a key of id_token which differs from
  // aureliauth's standard.
  accessTokenName: 'id_token',
  // Once logged in, we want to redirect the user to the welcome view.
  loginRedirect: '',

  providers: {
  }
};

const production = {
    providers: {
    }
};

let config

window.location.hostname==='localhost' ? config = development : config = production

let endpoint = process.env.AUTH_URL

export default { config, endpoint }
