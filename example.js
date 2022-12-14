const { Node, Tree } = require('.')

function fromNodesExample () {
  // layer 1
  const root = Node.from('A')

  // layer 2
  root.left = Node.from('B')
  root.right = Node.from('C')

  // layer 3
  root.left.left = Node.from('D')
  root.left.right = Node.from('E')
  root.right.left = Node.from('F')
  root.right.right = Node.from('G')

  // layer 4
  root.left.left.left = Node.from('H')
  root.left.left.right = Node.from('I')
  root.left.right.left = Node.from('J')
  root.left.right.right = Node.from('K')
  root.right.left.left = Node.from('L')
  root.right.left.right = Node.from('M')
  root.right.right.left = Node.from('N')
  root.right.right.right = Node.from('O')

  // layer 5
  root.left.left.left.left = Node.from('P')
  root.left.left.left.right = Node.from('Q')
  root.left.left.right.left = Node.from('R')
  root.left.left.right.right = Node.from('S')
  root.left.right.left.left = Node.from('T')
  root.left.right.left.right = Node.from('U')
  root.left.right.right.left = Node.from('V')
  root.left.right.right.right = Node.from('W')
  root.right.left.left.left = Node.from('X')
  root.right.left.left.right = Node.from('Y')
  root.right.left.right.left = Node.from('Z')

  root.print()
}

function fromObjectExample () {
  const tree = {
    A: {
      B: {
        D: {
          H: {
            P: true,
            Q: true
          },
          I: {
            R: true,
            S: true
          }
        },
        E: {
          J: {
            T: true,
            U: true
          },
          K: {
            V: true,
            W: true
          }
        }
      },
      C: {
        F: {
          L: {
            X: true,
            Y: true
          },
          M: {
            Z: true
          }
        },
        G: {
          N: true,
          O: true
        }
      }
    }
  }

  const root = Tree.from(tree)
  root.print()
}

fromNodesExample()
console.log('\n\n')
fromObjectExample()
