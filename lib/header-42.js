'use babel';

import {CompositeDisposable} from 'atom';

import {HeaderManager} from './header-manager';
import * as configSchema from './config-schema';

export default {

  subscriptions: null,
  config: configSchema,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'header-42:create': () => this.create(),
      'header-42:update': () => this.update()
    }));
    this.subscriptions.add(atom.workspace.observeTextEditors(
      (editor) => makeNewManager(editor)
    ));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  create() {
    var current = atom.workspace.getActiveTextEditor();
    editors.forEach(
      (item) => item.editor == current && item.create());
  },

  update() {
    var current = atom.workspace.getActiveTextEditor();
    editors.forEach(
      (item) => item.editor == current && item.update());
  }

}

function makeNewManager(editor) {
  var manager = new HeaderManager(editor);
  manager.onDestroy = function(editor) {
    editors.forEach(
      (item, i) => item.editor == editor && editors.splice(i, 1));
  }
  editors.push(manager);
}

editors = [];
