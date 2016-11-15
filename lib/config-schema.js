'use babel';

export default {

  username: {
    name: 'Username',
    description: 'Name to use in the header.',
    type: 'string',
    default: 'marvin'
  },

  email: {
    name: 'E-mail Address',
    description: 'The e-mail address associated with the username.',
    type: 'string',
    default: 'marvin@42.fr'
  },

  width: {
    name: 'Header Width',
    description: 'The desired width of the header.',
    type: 'integer',
    minimum: 80,
    default: 80
  },

  margin: {
    name: 'Header Margin',
    description: 'The desired margin of the header.',
    type: 'integer',
    default: 3
  },

  style: {
    name: 'Logo Style',
    description: 'The desired logo style. Will break the norm.',
    type: 'string',
    enum: [
      'original',
      'simple',
      'pong'
    ],
    default: 'original'
  }

}
