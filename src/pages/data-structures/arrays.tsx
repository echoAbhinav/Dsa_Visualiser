"use client"

import { useState } from "react"
import DataStructureVisualizer from "./data-structure-visualizer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function ArraysPage() {
  const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50])
  const [newValue, setNewValue] = useState<string>("")
  const [index, setIndex] = useState<string>("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Animation timeout to reset active index
  const resetActiveIndex = () => {
    setTimeout(() => {
      setActiveIndex(null)
    }, 1500)
  }

  // Array operations
  const handleAdd = () => {
    if (newValue.trim() === "") return

    const value = Number.parseInt(newValue)
    if (isNaN(value)) return

    setArray([...array, value])
    setNewValue("")
    setActiveIndex(array.length)
    setIsAddDialogOpen(false)
    resetActiveIndex()
  }

  const handleInsert = () => {
    if (newValue.trim() === "" || index.trim() === "") return

    const value = Number.parseInt(newValue)
    const idx = Number.parseInt(index)

    if (isNaN(value) || isNaN(idx) || idx < 0 || idx > array.length) return

    const newArray = [...array]
    newArray.splice(idx, 0, value)
    setArray(newArray)
    setNewValue("")
    setIndex("")
    setActiveIndex(idx)
    setIsInsertDialogOpen(false)
    resetActiveIndex()
  }

  const handleRemove = () => {
    if (index.trim() === "") return

    const idx = Number.parseInt(index)
    if (isNaN(idx) || idx < 0 || idx >= array.length) return

    setActiveIndex(idx)
    setTimeout(() => {
      const newArray = [...array]
      newArray.splice(idx, 1)
      setArray(newArray)
      setIndex("")
      setIsRemoveDialogOpen(false)
      setActiveIndex(null)
    }, 500)
  }

  const handleUpdate = () => {
    if (newValue.trim() === "" || index.trim() === "") return

    const value = Number.parseInt(newValue)
    const idx = Number.parseInt(index)

    if (isNaN(value) || isNaN(idx) || idx < 0 || idx >= array.length) return

    const newArray = [...array]
    newArray[idx] = value
    setArray(newArray)
    setNewValue("")
    setIndex("")
    setActiveIndex(idx)
    setIsUpdateDialogOpen(false)
    resetActiveIndex()
  }

  const renderArrayVisualization = () => {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Array Visualization</h3>

        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {array.map((value, idx) => (
              <div
                key={idx}
                className={`
                  w-16 h-16 flex items-center justify-center rounded-lg border-2 
                  ${
                    activeIndex === idx
                      ? "border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 animate-pulse"
                      : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  }
                  transition-all duration-300
                `}
              >
                <span className="text-lg font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center text-slate-600 dark:text-slate-400">
          <p>Array Length: {array.length}</p>
          <p className="text-xs mt-1">Indices: 0 to {array.length - 1}</p>
        </div>
      </div>
    )
  }

  // Add Dialog
  const AddDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">Add Element</DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Add a new element to the end of the array.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="add-value" className="text-slate-700 dark:text-slate-300">
              Value
            </Label>
            <Input
              id="add-value"
              type="number"
              placeholder="Enter a number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsAddDialogOpen(false)}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white"
          >
            Cancel
          </Button>
          <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Insert Dialog
  const InsertDialog = () => (
    <Dialog open={isInsertDialogOpen} onOpenChange={setIsInsertDialogOpen}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">Insert Element</DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Insert a new element at a specific index.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="insert-value" className="text-slate-700 dark:text-slate-300">
              Value
            </Label>
            <Input
              id="insert-value"
              type="number"
              placeholder="Enter a number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insert-index" className="text-slate-700 dark:text-slate-300">
              Index (0 to {array.length})
            </Label>
            <Input
              id="insert-index"
              type="number"
              placeholder="Enter index"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              min={0}
              max={array.length}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsInsertDialogOpen(false)}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white"
          >
            Cancel
          </Button>
          <Button onClick={handleInsert} className="bg-purple-600 hover:bg-purple-700">
            Insert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Remove Dialog
  const RemoveDialog = () => (
    <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">Remove Element</DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Remove an element at a specific index.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="remove-index" className="text-slate-700 dark:text-slate-300">
              Index (0 to {array.length - 1})
            </Label>
            <Input
              id="remove-index"
              type="number"
              placeholder="Enter index"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              min={0}
              max={array.length - 1}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsRemoveDialogOpen(false)}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white"
          >
            Cancel
          </Button>
          <Button onClick={handleRemove} className="bg-purple-600 hover:bg-purple-700">
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Update Dialog
  const UpdateDialog = () => (
    <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">Update Element</DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Update an element at a specific index.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="update-index" className="text-slate-700 dark:text-slate-300">
              Index (0 to {array.length - 1})
            </Label>
            <Input
              id="update-index"
              type="number"
              placeholder="Enter index"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              min={0}
              max={array.length - 1}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="update-value" className="text-slate-700 dark:text-slate-300">
              New Value
            </Label>
            <Input
              id="update-value"
              type="number"
              placeholder="Enter a number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsUpdateDialogOpen(false)}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate} className="bg-purple-600 hover:bg-purple-700">
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Arrays</h1>

      <DataStructureVisualizer
        title="Array"
        description="A collection of elements stored at contiguous memory locations"
        operations={[
          {
            name: "Add Element",
            description: "Add a new element to the end of the array",
            action: () => setIsAddDialogOpen(true),
          },
          {
            name: "Insert Element",
            description: "Insert a new element at a specific index",
            action: () => setIsInsertDialogOpen(true),
          },
          {
            name: "Remove Element",
            description: "Remove an element at a specific index",
            action: () => setIsRemoveDialogOpen(true),
            disabled: array.length === 0,
          },
          {
            name: "Update Element",
            description: "Update an element at a specific index",
            action: () => setIsUpdateDialogOpen(true),
            disabled: array.length === 0,
          },
        ]}
        renderVisualization={renderArrayVisualization}
        codeImplementation={{
          JavaScript: `// Array declaration
const arr = [10, 20, 30, 40, 50];

// Access element (O(1))
const element = arr[2]; // Returns 30

// Add element to the end (O(1))
arr.push(60);

// Insert element at index 2 (O(n))
arr.splice(2, 0, 25);

// Remove element at index 3 (O(n))
arr.splice(3, 1);

// Update element at index 1 (O(1))
arr[1] = 22;

// Array traversal (O(n))
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}`,
          Python: `# Array declaration (list in Python)
arr = [10, 20, 30, 40, 50]

# Access element (O(1))
element = arr[2]  # Returns 30

# Add element to the end (O(1))
arr.append(60)

# Insert element at index 2 (O(n))
arr.insert(2, 25)

# Remove element at index 3 (O(n))
del arr[3]  # or arr.pop(3)

# Update element at index 1 (O(1))
arr[1] = 22

# Array traversal (O(n))
for i in range(len(arr)):
    print(arr[i])`,
          Java: `// Array declaration
int[] arr = {10, 20, 30, 40, 50};

// Access element (O(1))
int element = arr[2]; // Returns 30

// Add element to the end (requires new array)
// Java arrays have fixed size, so we need to create a new array
int[] newArr = new int[arr.length + 1];
System.arraycopy(arr, 0, newArr, 0, arr.length);
newArr[arr.length] = 60;
arr = newArr;

// Insert element at index 2 (O(n))
// Requires shifting elements
int[] insertArr = new int[arr.length + 1];
System.arraycopy(arr, 0, insertArr, 0, 2);
insertArr[2] = 25;
System.arraycopy(arr, 2, insertArr, 3, arr.length - 2);
arr = insertArr;

// Update element at index 1 (O(1))
arr[1] = 22;

// Array traversal (O(n))
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}`,
        }}
        information={{
          characteristics: [
            "Elements are stored in contiguous memory locations",
            "Each element can be accessed directly using its index",
            "Fixed size in most low-level languages (dynamic in JavaScript, Python)",
            "Homogeneous elements (same data type) in most languages",
            "Memory is allocated at compile time in static arrays",
          ],
          useCases: [
            "Storing and accessing sequential data",
            "Temporary storage of objects in memory",
            "Implementing other data structures like stacks, queues",
            "Buffer for storing data being transferred",
            "Lookup tables and dynamic programming solutions",
          ],
          timeComplexity: {
            Access: "O(1)",
            Search: "O(n)",
            "Insert (at end)": "O(1)",
            "Insert (at position)": "O(n)",
            "Delete (at end)": "O(1)",
            "Delete (at position)": "O(n)",
          },
          spaceComplexity: "O(n)",
          types: [
            {
              name: "Static Arrays",
              description:
                "Fixed-size arrays where size is defined at compile time. Memory is allocated once and cannot be changed during execution.",
            },
            {
              name: "Dynamic Arrays",
              description:
                "Resizable arrays that can grow or shrink during execution. When capacity is reached, a new larger array is created and elements are copied.",
            },
            {
              name: "Multi-dimensional Arrays",
              description:
                "Arrays with multiple dimensions (2D, 3D, etc.). Elements are accessed using multiple indices, useful for representing matrices and tables.",
            },
          ],
        }}
      />

      <AddDialog />
      <InsertDialog />
      <RemoveDialog />
      <UpdateDialog />
    </>
  )
}

