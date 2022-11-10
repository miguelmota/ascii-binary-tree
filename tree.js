// @credit: https://github.com/jdmcpeek/pretty-print-binary-tree

function makeCopy (tree) {
  const node = Node.from()
  node.data = tree.data
  if (tree.left) {
    node.left = makeCopy(tree.left)
  }
  if (tree.right) {
    node.right = makeCopy(tree.right)
  }
  return node
}

class Queue {
  constructor (items = []) {
    this.items = items
  }

  enqueue (b) {
    this.items.unshift(b)
  }

  dequeue () {
    return this.items.pop()
  }

  isEmpty () {
    return this.items.length === 0
  }

  size () {
    return this.length
  }
}

class Stack {
  constructor (items = []) {
    this.items = items
  }

  isEmpty () {
    return this.items.length === 0
  }

  push (item) {
    this.items.ushift(item)
  }

  pop () {
    return this.items.shift()
  }

  peek () {
    return this.items[0]
  }

  size () {
    return this.items.length
  }
}

class Node {
  constructor (data = null) {
    this.data = data
    this.left = null
    this.right = null
  }

  static from (data) {
    return new Node(data)
  }

  visit () {
    console.log(this.data)
  }

  getNumNodes () {
    let total = 0
    if (this.left) {
      total += this.left.getNumNodes()
    }
    if (this.right) {
      total += this.right.getNumNodes()
    }

    return total + 1
  }

  static createTree (depth) {
    const tree = Node.from('X')
    Node.createTreeHelper(tree, depth, 1)
    return tree
  }

  static createTreeHelper (node, depth, cur) {
    if (cur === depth) {
      return
    }

    node.left = Node.from('X')
    node.right = Node.from('XX')
    Node.createTreeHelper(node.left, depth, cur + 1)
    Node.createTreeHelper(node.right, depth, cur + 1)
  }

  getHeight () {
    return Node.getHeightHelper(this)
  }

  static getHeightHelper (node) {
    if (!node) {
      return 0
    }

    return Math.max(Node.getHeightHelper(node.left), Node.getHeightHelper(node.right)) + 1
  }

  fillTree (height) {
    Node.fillTreeHelper(this, height)
  }

  static fillTreeHelper (node, height) {
    if (height <= 1) {
      return
    }

    if (node) {
      if (!node.left) {
        node.left = Node.from(' ')
      }
      if (!node.right) {
        node.right = Node.from(' ')
      }
      Node.fillTreeHelper(node.left, height - 1)
      Node.fillTreeHelper(node.right, height - 1)
    }
  }

  render () {
    let output = ''
    const totalLayers = this.getHeight()
    const tree = makeCopy(this)

    tree.fillTree(totalLayers)

    const queue = new Queue()
    queue.enqueue(tree)
    let gen = 1
    while (!queue.isEmpty()) {
      const copy = new Queue()
      while (!queue.isEmpty()) {
        copy.enqueue(queue.dequeue())
      }

      let firstItemInLayer = true
      let edgesString = ''
      let extraSpacesNextNode = false

      while (!copy.isEmpty()) {
        const node = copy.dequeue()
        let spacesFront = Math.pow(2, totalLayers - gen + 1) - 2
        let spacesMid = Math.pow(2, totalLayers - gen + 2) - 2
        let dashCount = Math.pow(2, totalLayers - gen) - 2
        if (dashCount < 0) {
          dashCount = 0
        }
        spacesMid = spacesMid - (dashCount * 2)
        spacesFront = spacesFront - dashCount
        const initPadding = 2
        spacesFront += initPadding
        if (firstItemInLayer) {
          edgesString += ' '.repeat(initPadding)
        }

        let edgeSym = ' '
        if (node.left && node.left.data !== ' ') {
          edgeSym = '/'
        }

        if (firstItemInLayer) {
          edgesString += ' '.repeat(Math.pow(2, totalLayers - gen) - 1) + edgeSym
        } else {
          edgesString += ' '.repeat(Math.pow(2, totalLayers - gen + 1) + 1) + edgeSym
        }
        edgeSym = ' '
        if (node.right && node.right.data !== ' ') {
          edgeSym = '\\'
        }
        edgesString += ' '.repeat(Math.max(0, Math.pow(2, totalLayers - gen + 1) - 3)) + edgeSym
        let dashLeft = ' '
        if (node.left && node.left.data !== ' ') {
          dashLeft = '_'
        }
        let dashRight = ' '
        if (node.right && node.right.data !== ' ') {
          dashRight = '_'
        }

        let extraSpaces = 0
        if (extraSpacesNextNode) {
          extraSpaces = 1
          extraSpacesNextNode = false
        }

        const dataLength = (node.data || '').length
        if (dataLength > 1) {
          if (dataLength % 2 === 1) {
            if (dashCount > 0) {
              dashCount -= ((dataLength - 1) / 2)
            } else {
              spacesMid -= (dataLength - 1) / 2
              spacesFront -= (dataLength - 1) / 2
              if (dataLength !== 1) {
                extraSpacesNextNode = true
              }
            }
          } else {
            if (dashCount > 0) {
              dashCount -= ((dataLength) / 2) - 1
              extraSpacesNextNode = true
            } else {
              spacesMid -= (dataLength - 1)
              spacesFront -= (dataLength - 1)
            }
          }
        }

        if (dashCount < 0) {
          dashCount = 0
        }

        if (firstItemInLayer) {
          const str = (' '.repeat(spacesFront)) + (dashLeft.repeat(dashCount)) + (node.data) + (dashRight.repeat(dashCount)) + ' '
          output += str
          firstItemInLayer = false
        } else {
          const str = (' '.repeat(spacesMid - extraSpaces)) + (dashLeft.repeat(dashCount)) + (node.data) + (dashRight.repeat(dashCount)) + ' '
          output += str
        }

        if (node.left) {
          queue.enqueue(node.left)
        }
        if (node.right) {
          queue.enqueue(node.right)
        }
      }

      if (!queue.isEmpty()) {
        const str = '\n' + edgesString + '\n'
        output += str
      }

      gen += 1
    }

    return output
  }

  print () {
    const output = this.render()
    console.log(output)
  }
}

function construct (entry) {
  if (!entry) {
    return null
  }
  const key = entry[0]
  const tree = entry[1]
  const node = Node.from(key)
  if (tree instanceof Object) {
    let i = 0
    for (const k in tree) {
      if (typeof tree[k] === 'object') {
        const entries = tree[k] ? Object.entries(tree[k]) : [k, true]
        const n = Node.from(k)
        n.left = construct(entries[0])
        n.right = construct(entries[1])
        if (i === 0) {
          node.left = n
        } else {
          node.right = n
        }
      } else {
        const n = Node.from(k)
        if (node.left) {
          node.right = n
        } else {
          node.left = n
        }
      }
      i++
    }
  }

  return node
}

class Tree {
  static from (obj) {
    let node = Node.from('')
    let root = null
    for (const k in obj) {
      node = Node.from(k)
      if (obj[k]) {
        const entries = obj[k] ? Object.entries(obj[k]) : [k, true]
        node.left = construct(entries[0])
        node.right = construct(entries[1])
      }
      if (!root) {
        root = node
      }
    }

    return root
  }
}

module.exports = { Tree, Node, Queue, Stack }
