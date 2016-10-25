'use babel';

/******************************************************************************/
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   config-schema.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: vchesnea <vchesnea@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/25 18:50:25 by vchesnea          #+#    #+#             */
/*   Updated: 2016/10/25 18:50:26 by vchesnea         ###   ########.fr       */
/*                                                                            */
/******************************************************************************/

export default {

  username: {
    name: 'Username',
    description: 'Name to use in the header.',
    type: 'string',
    default: 'marvin'
  },

  email: {
    name: 'E-mail Address',
    description: 'The e-mail address associated with the username',
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
    description: 'The desired logo style.',
    type: 'string',
    enum: [
      'default',
      'simple',
      'pong'
    ],
    default: 'default'
  }

}
