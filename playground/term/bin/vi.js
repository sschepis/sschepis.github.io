// simple vi-like editor

const MODES = [
  'normal', // 0
  'insert', // 1
  'command' // 2
]

const KEYS = {
  backspace: 8,
  enter: 13
}

class Vi extends Program {
  constructor(...args) {
    super(...args)
    this.mode = 0
    this.path = this.args[0]
    this.data = new Rope('')
    this.lineLengths = [0]
    this.topLineInWindow = 0
    this.lineNum = 0
    this.colNum = 0
    this.firstCharInWindow = 0
    this.normalCommand = ''
  }

  get width() {
    return this.term.geometry[0]
  }

  get height() {
    return this.term.geometry[1]
  }

  get currentLineLength() {
    return this.lineLengths[this.lineNum]
  }

  get currentLineHeight() {
    return this.getLineHeight(this.lineNum)
  }

  get currentLine() {
    let index = this.firstCharInWindow
    for (let i = this.topLineInWindow; i < this.lineNum; i++) {
      index = index + this.lineLengths[i] + 1
    }
    return this.data.substr(index, this.currentLineLength)
  }

  get lineCount() {
    return this.lineLengths.length
  }

  get x() {
    return (this.colNum % this.width) + 1
  }

  get y() {
    const base = this.getVerticalDistance(this.topLineInWindow, this.lineNum) + 1
    const lineWrap = Math.floor(this.colNum / this.width)
    return base + lineWrap
  }

  get bottomOfCurrentLine() {
    return this.getVerticalDistance(this.topLineInWindow, this.lineNum + 1)
  }

  get dataIndex() {
    let index = this.firstCharInWindow
    for (let i = this.topLineInWindow; i < this.lineNum; i++) {
      index = index + this.lineLengths[i] + 1
    }
    return index + this.colNum
  }

  get colNum() {
    return this._colNum
  }

  set colNum(n) {
    const lineLength = (this.mode === 1) ? this.currentLineLength : this.currentLineLength - 1
    n = Math.min(n, lineLength)
    n = Math.max(n, 0)
    this._colNum = n
  }

  loadFile() {
    if (this.path) {
      const fullPath = this.absolutePath(this.path)
      this.session.fs.stat(fullPath, (err, stat) => {
        if (err) {
          this.message(`Could not open path: ${fullPath}`)
        } else if (stat.isFile()) {
          this.session.fs.readFile(fullPath, (err, data) => {
            this.data = new Rope(data.toString())
            this.calculateLineLengths()
            this.redraw()
          })
        } else {
          this.message(`Could not open path: ${fullPath}`)
        }
      })
    }
  }

  fixColNum() {
    this.colNum = this.colNum // force fix
  }

  calculateLineLengths() {
    this.lineLengths = this.data.toString().split(/\n/).map((line) => line.length)
  }

  getVerticalDistance(line1, line2) {
    let negate = false
    if (line1 > line2) {
      [line1, line2] = [line2, line1]
      negate = true
    }
    let distance = 0
    for (let line = line1; line < line2; line++) {
      distance = distance + this.getLineHeight(line)
    }
    return distance * (negate ? -1 : 1)
  }

  getLineHeight(lineNum) {
    return Math.max(1, Math.ceil(this.lineLengths[lineNum] / this.width))
  }

  redraw() {
    this.term.clear()
    let lineNum = this.topLineInWindow
    let charNum = this.firstCharInWindow
    let lineSegment
    y: for (let y = 1; y <= this.height;) {
      this.jump(1, y)
      const lineLength = this.lineLengths[lineNum]
      const line = this.data.substr(charNum, lineLength)
      const segments = stringToSegments(line, this.width)
      for (let s = 0; s < segments.length; s++) {
        const segment = segments[s]
        this.write(segment)
        charNum = charNum + segment.length
        y++
        if (y > this.height) break y
      }
      charNum++ // one extra for the newline
      lineNum++
    }
    this.move() // reset cursor
  }

  write(string) {
    this.stdout.write(string.replace(/\r?\n/g, '\r\n'))
  }

  main(status) {
    this.redraw()
    this.loadFile()
    this.normalMode()
    this.stdin.bind(this.handleKey.bind(this))
    this.statusCallback = status
  }

  exit(status) {
    this.term.clear()
    this.statusCallback(status)
  }

  normalMode() {
    this.mode = 0
    this.colNum = Math.min(this.colNum, this.currentLineLength - 1)
    this.move()
  }

  insertMode() {
    this.mode = 1
    this.message('-- INSERT --')
  }

  commandMode() {
    this.mode = 2
    this.clearStatus()
    this.jump(1, this.height)
    this.stdout.write(':')
    this.command = ':'
  }

  move() {
    this.jump(this.x, this.y)
  }

  jump(x, y) {
    this.stdout.write(`\x1B[${y};${x}f`)
  }

  clearStatus() {
    this.stdout.write(`\x1B[${this.height};0f`)
    for (let i = 0; i < this.width - 1; i ++) { this.stdout.write(' ') }
  }

  message(msg) {
    console.log(msg)
    this.jump(1, this.height)
    this.stdout.write(msg)
    for (let i = 0; i < this.width - msg.length; i++) {
      this.stdout.write(' ')
    }
    this.move()
  }

  saveFile(path, cb) {
    if (path) this.path = path
    if (!this.path) return this.message('No file name')
    const fullPath = this.absolutePath(this.path)
    this.session.fs.writeFile(fullPath, this.data.toString(), (err) => {
      if (err) {
        this.message(err)
      } else {
        this.message(`"${fullPath}" ${this.data.length}C written`)
      }
      if (cb) cb(err)
    })
  }

  executeCommand() {
    const commandLine = this.command.trim().replace(/^:/, '')
    const command = commandLine.match(/^[a-z]+/)[0]
    const argsMatch = commandLine.match(/^[a-z]+\s+(.+)/)
    const args = argsMatch ? argsMatch[1].split(/\s+/) : []
    switch (command) {
      case 'q':
        this.stdout.writeln('')
        this.exit(0)
        return
      case 'w':
        this.saveFile(args[0])
        break
      case 'wq':
        this.saveFile(args[0], (err) => {
          if (!err) {
            this.stdout.writeln('')
            this.exit(0)
          }
        })
        return
      default:
        this.message(`unknown command: ${command}`)
    }
    this.normalMode()
  }

  handleKey(key, ev) {
    switch (this.mode) {
      case 0: // normal mode
        let lineHeight, lineLength, line, jumpCount, match
        switch (ev.key) {
          case '^':
            match = this.currentLine.match(/[^\s]/)
            if (match) {
              this.colNum = match.index
            } else {
              this.colNum = this.currentLineLength
            }
            break
          case '0':
            this.colNum = 0
            this.move()
            break
          case '$':
            this.colNum = this.currentLineLength - 1
            this.move()
            break
          case 'h':
          case 'ArrowLeft':
          case 'Backspace':
            this.colNum--
            this.move()
            break
          case 'j':
          case 'ArrowDown':
          case 'Enter':
            if (this.lineNum == this.lineCount - 1) break;
            this.lineNum = Math.min(this.lineNum + 1, this.lineCount - 1)
            while (this.bottomOfCurrentLine >= this.height) {
              this.firstCharInWindow = this.firstCharInWindow + this.lineLengths[this.topLineInWindow] + 1
              this.topLineInWindow++
            } 
            this.fixColNum()
            this.redraw()
            break
          case 'k':
          case 'ArrowUp':
            if (this.lineNum == 0) break;
            this.lineNum--
            if (this.y < 1) {
              this.topLineInWindow--
              this.firstCharInWindow = this.firstCharInWindow - this.lineLengths[this.topLineInWindow] - 1
            }
            this.fixColNum()
            this.redraw()
            break
          case 'l':
          case 'ArrowRight':
            this.colNum++
            this.move()
            break
          case 'i':
            this.insertMode()
            break
          case 'I':
            this.insertMode()
            match = this.currentLine.match(/[^\s]/)
            if (match) {
              this.colNum = match.index
            } else {
              this.colNum = this.currentLineLength
            }
            break
          case 'a':
            this.insertMode()
            this.colNum++
            this.move()
            break
          case 'A':
            this.insertMode()
            this.colNum = this.currentLineLength + 1
            this.move()
            break
          case 'o':
            this.insertMode()
            this.data.insert(this.dataIndex + (this.currentLineLength - this.colNum), "\n")
            this.calculateLineLengths()
            this.colNum = 0
            this.lineNum++
            this.redraw()
            this.move()
            break
          case 'O':
            this.insertMode()
            this.data.insert(this.dataIndex - this.colNum, "\n")
            this.calculateLineLengths()
            this.colNum = 0
            this.redraw()
            this.move()
            break
          case 'C':
            this.data.remove(this.dataIndex, this.dataIndex + this.currentLineLength - this.colNum)
            this.calculateLineLengths()
            this.insertMode()
            this.redraw()
            break
          case 'c':
            if (this.normalCommand === '') {
              this.normalCommand = 'c'
            } else if (this.normalCommand === 'c') {
              this.normalCommand = ''
              match = this.currentLine.match(/^\s*/)
              this.data.remove(this.dataIndex - this.colNum + match[0].length, this.dataIndex - this.colNum + this.currentLineLength)
              this.calculateLineLengths()
              this.insertMode()
              this.colNum = match[0].length
              this.move()
              this.redraw()
            } else {
              this.normalCommand = ''
            }
            break
          case 'D':
            this.data.remove(this.dataIndex, this.dataIndex + this.currentLineLength - this.colNum)
            this.calculateLineLengths()
            this.fixColNum()
            this.redraw()
            break
          case 'd':
            if (this.normalCommand === '') {
              this.normalCommand = 'd'
            } else if (this.normalCommand === 'd') {
              this.normalCommand = ''
              this.data.remove(this.dataIndex - this.colNum, this.dataIndex - this.colNum + this.currentLineLength + 1)
              this.calculateLineLengths()
              this.fixColNum()
              this.move()
              this.redraw()
            } else {
              this.normalCommand = ''
            }
            break
          case 'w':
          case 'W':
            line = this.currentLine.substring(this.colNum)
            if (line.length <= 1) {
              if (this.lineNum < this.lineCount - 1) {
                this.lineNum++
                this.colNum = line.match(/^\s*/)[0].length
              }
            } else {
              match = line.match(ev.key == 'w' ? /^([a-z0-9_]+|[^a-z0-9_]+)\s*/i : /^[^\s]+\s*/)
              if (match) {
                this.colNum = this.colNum + match[0].length
              }
            }
            break
          case 'b':
          case 'B':
            line = this.currentLine.substring(0, this.colNum)
            if (line.length <= 1) {
              if (this.lineNum > 0) {
                this.lineNum--
                this.colNum = this.currentLineLength - 1
              }
            } else {
              match = line.match(ev.key == 'b' ? /([a-z0-9_]+|[^a-z0-9_]+)\s*$/i : /[^\s]+\s*$/)
              if (match) {
                this.colNum = this.colNum - match[0].length
              }
            }
            break
          case 'x':
            this.data.remove(this.dataIndex, this.dataIndex + 1)
            this.lineLengths[this.lineNum]--
            this.fixColNum()
            this.redraw()
            break
          case ':':
            this.commandMode()
            break
          case 'Escape':
            this.normalCommand = ''
            break
        }
        //this.message(this.dataIndex.toString() + '    ')
        break
      case 1: // insert mode
        switch (ev.key) {
          case 'Backspace':
            if (this.colNum === 0) break
            this.data.remove(this.dataIndex - 1, this.dataIndex)
            this.colNum--
            this.lineLengths[this.lineNum]--
            this.redraw()
            break
          case 'Escape':
            this.message('')
            this.normalMode()
            this.fixColNum()
            break
          case 'Enter':
            this.data.insert(this.dataIndex, "\n")
            this.calculateLineLengths()
            this.colNum = 0
            this.lineNum++
            this.redraw()
            break
          default:
            this.data.insert(this.dataIndex, key)
            this.lineLengths[this.lineNum]++
            this.colNum++
            this.redraw()
        }
        break
      case 2: // command mode
        switch (ev.keyCode) {
          case KEYS.enter:
            this.executeCommand()
            break
          case KEYS.backspace:
            this.command = this.command.substring(0, this.command.length - 1)
            this.stdout.write('\b \b')
            break
          default:
            this.command = this.command + key
            this.stdout.write(key)
        }
        break
    }
  }
}

const stringToSegments = (string, width) => {
  if (string.length <= width) {
    return [string]
  } else {
    let consumed = 0
    let segments = []
    while (consumed < string.length) {
      segments.push(string.substr(consumed, width))
      consumed = consumed + width
    }
    return segments
  }
}

export default Vi
