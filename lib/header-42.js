'use babel';

/******************************************************************************/
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header-42.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: vchesnea <vchesnea@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/25 18:50:18 by vchesnea          #+#    #+#             */
/*   Updated: 2016/10/25 18:50:22 by vchesnea         ###   ########.fr       */
/*                                                                            */
/******************************************************************************/

import {CompositeDisposable} from 'atom';

import {HeaderManager} from './header-manager';
import * as configSchema from './config-schema';

export default {

  subscriptions: null,
  config: configSchema,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'header-42:create': () => this.create()
    }));
    this.subscriptions.add(atom.workspace.observeTextEditors(
      (editor) => editors.push(new HeaderManager(editor))
    ));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  create() {
    var current = atom.workspace.getActiveTextEditor();
    editors.forEach(
      (item) => item.editor == current ? item.create() : 0);
  }

}

editors = [];
