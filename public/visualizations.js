console.log('Visualization.js loaded successfully');

function handleBinarySearch() {
    const arrayInput = document.getElementById('binarySearchArray').value;
    const targetInput = parseInt(document.getElementById('binarySearchTarget').value, 10);
    
    const array = arrayInput.split(',').map(Number);  // Convert input string to an array of numbers
    visualizeBinarySearch(array, targetInput);
}

// Visualization function for Binary Search
function visualizeBinarySearch(arr, target) {
    const container = document.getElementById('visualization-container');
    container.innerHTML = 'Starting Binary Search...';

    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);
        container.innerHTML += `<p>Checking middle element: arr[${mid}] = ${arr[mid]}</p>`;

        if (arr[mid] === target) {
            container.innerHTML += `<p>Element found at index ${mid}!</p>`;
            return;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    container.innerHTML += '<p>Element not found.</p>';
}

class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // Insert a new value at the end of the list
    insert(value) {
        const newNode = new ListNode(value);

        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Display the linked list
    display(callback) {
        let current = this.head;
        const elements = [];
        while (current !== null) {
            elements.push(current.value);
            current = current.next;
        }
        callback(elements);
    }
}

// Visualization function for Linked List Insert
function visualizeLinkedListInsert(value) {
    const container = document.getElementById('visualization-container');
    container.innerHTML = 'Inserting into a Linked List...';

    // Initialize Linked List if not already done
    if (!window.linkedList) {
        window.linkedList = new LinkedList();
    }

    // Insert the value into the linked list
    window.linkedList.insert(value);

    // Display the linked list
    container.innerHTML += '<p>Linked List: </p>';
    window.linkedList.display((elements) => {
        container.innerHTML += `<span>${elements.join(' -> ')}</span>`;
    });
}

// Handle user input for Linked List Insertion
function handleLinkedListInsert() {
    const valueInput = document.getElementById('linkedListValue').value;
    const value = parseInt(valueInput, 10);

    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }

    visualizeLinkedListInsert(value);
}

class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Get height of a node
    getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    // Calculate balance factor
    getBalanceFactor(node) {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Right rotation (single rotation)
    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        // Return new root
        return x;
    }

    // Left rotation (single rotation)
    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        // Return new root
        return y;
    }

    // Insert a value in the AVL tree
    insert(node, value) {
        // 1. Perform standard BST insertion
        if (!node) return new AVLNode(value);

        if (value < node.value) {
            node.left = this.insert(node.left, value);
        } else if (value > node.value) {
            node.right = this.insert(node.right, value);
        } else {
            return node; // Duplicate values not allowed
        }

        // 2. Update the height of the ancestor node
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        // 3. Get the balance factor to check if the node is unbalanced
        const balanceFactor = this.getBalanceFactor(node);

        // 4. If the node is unbalanced, perform rotations

        // Left Left Case (Right Rotation)
        if (balanceFactor > 1 && value < node.left.value) {
            return this.rightRotate(node);
        }

        // Right Right Case (Left Rotation)
        if (balanceFactor < -1 && value > node.right.value) {
            return this.leftRotate(node);
        }

        // Left Right Case (Left Rotation, then Right Rotation)
        if (balanceFactor > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // Right Left Case (Right Rotation, then Left Rotation)
        if (balanceFactor < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node; // Return the unchanged node pointer
    }

    // Insert method to be called externally
    insertValue(value) {
        this.root = this.insert(this.root, value);
    }

    // In-order traversal to display the tree
    inOrder(node, callback) {
        if (node !== null) {
            this.inOrder(node.left, callback);
            callback(node.value);
            this.inOrder(node.right, callback);
        }
    }

    // Call in-order traversal starting from root
    display(callback) {
        this.inOrder(this.root, callback);
    }
}

// Visualization function for AVL Tree Insert
function visualizeAVLTreeInsert(value) {
    const container = document.getElementById('visualization-container');
    container.innerHTML = `Inserting ${value} into an AVL Tree...`;

    // Initialize AVL Tree if not already done
    if (!window.avlTree) {
        window.avlTree = new AVLTree();
    }

    // Insert the value into the AVL Tree
    window.avlTree.insertValue(value);

    // Display the AVL Tree in order
    container.innerHTML += '<p>AVL Tree (In-order): </p>';
    window.avlTree.display((val) => {
        container.innerHTML += `<span>${val} </span>`;
    });
}

// Handle user input for AVL Tree Insertion
function handleAVLInsert() {
    const value = parseInt(document.getElementById('avlInsertValue').value, 10);
    visualizeAVLTreeInsert(value);
}

// Handle user input for BFS
function handleBFS() {
    const graphInput = document.getElementById('graphData').value;
    const startNode = parseInt(document.getElementById('graphStartNode').value, 10);
    
    const graph = JSON.parse(graphInput);  // Parse the JSON graph input
    visualizeBFS(graph, startNode);
}

// Visualization function for BFS
function visualizeBFS(graph, start) {
    const container = document.getElementById('visualization-container');
    container.innerHTML = 'Starting BFS...';

    let queue = [start];
    let visited = new Set();

    while (queue.length > 0) {
        let node = queue.shift();
        if (!visited.has(node)) {
            visited.add(node);
            container.innerHTML += `<p>Visited node ${node}</p>`;

            graph[node].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            });
        }
    }
}

// Handle user input for DFS
function handleDFS() {
    const graphInput = document.getElementById('graphData').value;
    const startNode = parseInt(document.getElementById('graphStartNode').value, 10);
    
    const graph = JSON.parse(graphInput);  // Parse the JSON graph input
    visualizeDFS(graph, startNode);
}

// Visualization function for DFS
function visualizeDFS(graph, start) {
    const container = document.getElementById('visualization-container');
    container.innerHTML = 'Starting DFS...';

    let stack = [start];
    let visited = new Set();

    while (stack.length > 0) {
        let node = stack.pop();
        if (!visited.has(node)) {
            visited.add(node);
            container.innerHTML += `<p>Visited node ${node}</p>`;

            graph[node].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            });
        }
    }
}