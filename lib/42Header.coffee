{CompositeDisposable} = require 'atom'

logo =
  leftStandardMargin: 5,
  rightStandardMargin: 5,
  logoStandardWidth: 25,
  infoStandardWidth: 41,
  lineStandardWidth: 80,
  token: ['', ''],
  tokenLength: [0, 0],
  data: [
    '        :::      ::::::::',
    '      :+:      :+:    :+:',
    '    +:+ +:+         +:+  ',
    '  +#+  +:+       +#+     ',
    '+#+#+#+#+#+   +#+        ',
    '     #+#    #+#          ',
    '    ###   ########.fr    '
  ]

commentTokens =
  'c': ['/* ', ' */'],
  'asm': [';', ';'],
  'm': ['%', '%'],
  'py': ['#', '#'],
  'ada': ['--', '--'],
  'hs': ['--', '--'],
  'php': ['/*', '*/'],
  'bas': ['REM', 'REM'],
  'java': ['/*', '*/'],
  'rb': ['#', '#'],
  'cfm': ['<!---','--->'],
  'f': ['!', '!'],
  'ocaml': ['(*', '*)'],
  'pas': ['(*', '*)'],
  'pl': ['#', '#']
editor = null
author = 'marvin'
email = 'marvin@42.fr'

padNumber = (number, min, c) ->
  number = number.toString()
  if (number.length < min)
	  min -= number.length
	  while (min--)
		  number += '0'
  return number

chopString = (string, max) ->
  if (string.length > max)
    return string.substr(0, max)
  return string

loadCommentToken = ->
  return unless path = editor.getPath()
  pos = path.lastIndexOf('.')
  if (pos == -1)
    return
  token = commentTokens[path.substr(pos + 1)]
  if (token?)
    logo.token = token
    logo.tokenLength = [token[0].length, token[1].length]

insertBar = ->
  editor.moveToBeginningOfLine()
  output = [
    logo.token[0],
    Array(logo.lineStandardWidth - logo.tokenLength[0] - logo.tokenLength[1] + 1).join('*'),
    logo.token[1]
  ].join('')
  editor.insertText(output)
  editor.insertNewline()

insertEmptyLine = ->
  editor.moveToBeginningOfLine()
  output = [
    logo.token[0],
    Array(logo.lineStandardWidth - logo.tokenLength[0] - logo.tokenLength[1] + 1).join(' '),
    logo.token[1]
  ].join('')
  editor.insertText(output)
  editor.insertNewline()

insertConcat = (slices...) ->
  editor.moveToBeginningOfLine()
  editor.insertText(makeLeftMargin() + slices.join('') + makeRightMargin())
  editor.insertNewline()

makeLeftMargin = ->
  return logo.token[0] + Array(logo.leftStandardMargin - logo.tokenLength[0] + 1).join(' ');

makeRightMargin = ->
  return Array(logo.rightStandardMargin - logo.tokenLength[1] + 1).join(' ') + logo.token[1];

makeCentralGap = (left, right) ->
  return Array(logo.lineStandardWidth - makeLeftMargin().length - makeRightMargin().length - left.length - right.length + 1).join(' ')

makeFilename = ->
  filename = editor.getPath()
  if (!filename?)
    filename = ''
  pos = filename.lastIndexOf('/')
  if (pos == -1)
    return filename
  output = filename.substr(pos + 1)
  return output + Array(logo.infoStandardWidth - output.length + 1).join(' ')

makeBy = ->
  return 'By: ' + chopString(author, 9) + ' <' + chopString(email, 25) + '>'

makeDate = ->
  `date = new Date();`
  leftPart = padNumber(date.getFullYear(), 4, '0') + '/' + padNumber(date.getMonth(), 2, '0') + '/' + padNumber(date.getDate(), 2, '0')
  rightPart = padNumber(date.getHours(), 2, '0') + ':' + padNumber(date.getMinutes(), 2, '0') + ':' + padNumber(date.getSeconds(), 2, '0')
  return leftPart + ' ' + rightPart

makeCreation = ->
  return 'Created: ' + makeDate() + ' by ' + chopString(author, 9)

makeUpdate = ->
  return 'Updated: ' + makeDate() + ' by ' + chopString(author, 9)

module.exports = Atom42Header =
  subscriptions: null

  activate: ->
    if (atom.config.get('42Header.author')?)
        author = atom.config.get('42Header.author')
    if (atom.config.get('42Header.email')?)
        email = atom.config.get('42Header.email')
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', '42Header:generate': => @generate()

  deactivate: ->
    @subscriptions.dispose()

  generate: ->
    return unless editor = atom.workspace.getActiveTextEditor()
    excursion = editor.getCursorScreenPosition()
    loadCommentToken()
    editor.setCursorBufferPosition(1, 1)
    insertBar()
    insertEmptyLine()
    insertConcat(makeCentralGap("", logo.data[0]), logo.data[0])
    insertConcat(makeFilename(), makeCentralGap(makeFilename(), logo.data[1]), logo.data[1])
    insertConcat(makeCentralGap("", logo.data[2]), logo.data[2])
    insertConcat(makeBy(), makeCentralGap(makeBy(), logo.data[3]), logo.data[3])
    insertConcat(makeCentralGap("", logo.data[4]), logo.data[4])
    insertConcat(makeCreation(), makeCentralGap(makeCreation(), logo.data[5]), logo.data[5])
    insertConcat(makeUpdate(), makeCentralGap(makeUpdate(), logo.data[6]), logo.data[6])
    insertEmptyLine()
    insertBar()
    editor.setCursorScreenPosition(excursion)
