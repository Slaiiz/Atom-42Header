'use babel';

/******************************************************************************/
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header-manager.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: vchesnea <vchesnea@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/25 18:50:27 by vchesnea          #+#    #+#             */
/*   Updated: 2016/10/25 18:54:56 by vchesnea         ###   ########.fr       */
/*                                                                            */
/******************************************************************************/

export default {

  HeaderManager(editor) {

    this.create = function() {

      if (headerIsPresent(this)) {
        return ;
      }
      updateInfos(this);
      var cursor = this.editor.markBufferPosition(
        this.editor.getCursorBufferPosition());
      this.editor.setCursorBufferPosition([0, 0]);
      makeBar(this);
      makeEmpty(this);
      makeLine(this, '', this.logo[0]);
      makeFilename(this);
      makeLine(this, '', this.logo[2]);
      makeAuthor(this);
      makeLine(this, '', this.logo[4]);
      makeCreated(this);
      makeUpdated(this);
      makeEmpty(this);
      makeBar(this);
      this.editor.insertNewline();
      this.editor.setCursorBufferPosition(
        cursor.getStartBufferPosition());
    };

    this.update = function() {

      if (!headerIsPresent(this)) {
        return ;
      }
      updateInfos(this);
      var cursor = this.editor.markBufferPosition(
        this.editor.getCursorBufferPosition());
      this.editor.setCursorBufferPosition([3, 0]);
      this.editor.deleteLine();
      makeFilename(this);
      this.editor.setCursorBufferPosition([8, 0]);
      this.editor.deleteLine();
      makeUpdated(this);
      this.editor.setCursorBufferPosition(
        cursor.getStartBufferPosition());
      this.onsave.dispose();
      this.editor.save();
      this.onsave = this.editor.onDidSave(
        () => this.update());
    };

    function headerIsPresent(self) {
      found = false;
      var range = [[7, 0], [8, 0]];
      self.editor.scanInBufferRange(/Created:/, range, function(obj) {
        var range = [[8, 0], [9, 0]];
        self.editor.scanInBufferRange(/Updated:/, range, function(obj) {
          found = true;
          obj.stop();
        });
        obj.stop();
      });
      return found;
    };

    function fill(char, size) {
      return new Array(size + 1).join(char);
    };

    function makeBar(self) {
      var length = self.width - self.ext[0].length
        - self.ext[1].length;
      self.editor.insertText(self.ext[0]
        + fill('*', length) + self.ext[1]);
      self.editor.insertNewline();
    };

    function makeLine(self, left, right) {
      var length = self.width - 2 * self.margin
        - self.ext[0].length - self.ext[1].length;
      self.editor.insertText(self.ext[0]
        + fill(' ', self.margin) + left
        + fill(' ', Math.ceil(length * 0.63) - left.length)
        + fill(' ', Math.floor(length * 0.37) - right.length) + right
        + fill(' ', self.margin)
        + self.ext[1]);
      self.editor.insertNewline();
    };

    function makeFilename(self) {
      makeLine(self, self.editor.getTitle(),
        self.logo[1]);
    };

    function makeAuthor(self) {
      makeLine(self, 'By: ' + self.username
        + ' <' + self.email + '>', self.logo[3]);
    };

    function makeCreated(self) {
      var date = new Date().toLocaleString().replace(/-/g, '/');
      makeLine(self, 'Created: ' + date
        + ' by ' + self.username, self.logo[5]);
    };

    function makeUpdated(self) {
      var date = new Date().toLocaleString().replace(/-/g, '/');
      makeLine(self, 'Updated: ' + date
        + ' by ' + self.username, self.logo[6]);
    };

    function makeEmpty(self) {
      makeLine(self, '', '');
    };

    function cleanup(self) {
      self.onsave.dispose();
    };

    function updateInfos(self) {
      self.logo = self.logos[atom.config.get('header-42.style')];
      self.username = atom.config.get('header-42.username');
      self.email = atom.config.get('header-42.email');
      self.margin = atom.config.get('header-42.margin');
      self.width = atom.config.get('header-42.width');
      self.ext = self.extensions [
        self.editor.getTitle().match(/\.[^.]+$/)
      ];
      if (self.ext === undefined) {
        self.ext = ['#', '#'];
      }
    }

    this.extensions = {

      '.c': ['/*', '*/'],
      '.coffee': ['#', '#'],
      '.asm': [';', ';'],
      '.m': ['%', '%'],
      '.py': ['#', '#'],
      '.ada': ['--', '--'],
      '.hs': ['--', '--'],
      '.php': ['/*', '*/'],
      '.bas': ['REM', 'REM'],
      '.java': ['/*', '*/'],
      '.js': ['/*', '*/'],
      '.rb': ['#', '#'],
      '.cfm': ['<!---','--->'],
      '.html': ['<!--', '-->'],
      '.f': ['!', '!'],
      '.ocaml': ['(*', '*)'],
      '.pas': ['(*', '*)'],
      '.pl': ['#', '#']

    };

    this.logos = {

      'default': [
        '        :::      ::::::::',
        '      :+:      :+:    :+:',
        '    +:+ +:+         +:+  ',
        '  +#+  +:+       +#+     ',
        '+#+#+#+#+#+   +#+        ',
        '     #+#    #+#          ',
        '    ###   ########.fr    '
      ],

      'marvin': [
        
      ],

      'haxxor': [
        
      ]

    };

    this.editor = editor;

    this.onsave = this.editor.onDidSave(
      () => this.update());

    this.editor.onDidDestroy(
      () => cleanup(this));

  }

}
