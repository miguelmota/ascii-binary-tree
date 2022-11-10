# ascii-binary-tree

> Print simple ascii binary trees in JavasScript

![Example](https://user-images.githubusercontent.com/168240/201101143-819daf56-40b4-4ce9-ae92-4e2fa5eab369.png)

## Install

```sh
npm install ascii-binary-tree
```

## Examples

### Constructing from nodes

```js
const { Node } = require('ascii-binary-tree')

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
```

Output

```text
                  ______________A______________
                 /                             \
          ______B______                   ______C______
         /             \                 /             \
      __D__           __E__           __F__           __G__
     /     \         /     \         /     \         /     \
    H       I       J       K       L       M       N       O
   / \     / \     / \     / \     / \     /
  P   Q   R   S   T   U   V   W   X   Y   Z
```


### Constructing from tree object

```js
const { Tree } = require('ascii-binary-tree')
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
```

Output

```text
                  ______________A______________
                 /                             \
          ______B______                   ______C______
         /             \                 /             \
      __D__           __E__           __F__           __G__
     /     \         /     \         /     \         /     \
    H       I       J       K       L       M       N       O
   / \     / \     / \     / \     / \     /
  P   Q   R   S   T   U   V   W   X   Y   Z
```

### Get ascii string

```js
const root = Tree.from({ ... })
const output = root.render()
console.log(output)
```

## License

[MIT](LICENSE)
