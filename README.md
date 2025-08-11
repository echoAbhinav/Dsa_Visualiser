# 🚀 DSA Visualizer  

A powerful **Data Structure and Algorithm Visualizer** built using **React**, **ShadCN UI**, and **Sonner** for a beautiful, interactive, and educational experience. Perfect for students, educators, and developers looking to **visualize and understand DSA concepts** step-by-step.

---

## ✨ Features  

- 🔍 **Searching Algorithm Visualizations** (Binary Search, Linear Search)  
- 📊 **Sorting Algorithm Visualizations** (Bubble Sort, Quick Sort, Merge Sort, etc.)  
- 📚 **Data Structure Visualizations** (Arrays, Stacks, Queues, Linked Lists)  
- 🏁 **Algorithm Race Mode** - Compare multiple algorithms head-to-head  
- 🤖 **AlgoBot** - AI-powered algorithm assistant using Google Gemini API  
- 🎨 **Modern UI** powered by [ShadCN](https://ui.shadcn.com/) and Tailwind CSS  
- ⚡ **Elegant Toaster Notifications** using [Sonner](https://sonner.emilkowal.ski/)  
- 📊 **Step-by-Step Execution** of algorithms with real-time state updates  
- 🌙 **Dark Mode Support** for a comfortable viewing experience  
- 📱 **Responsive Design** for mobile and desktop devices  

---

## 🚧 Upcoming Enhancements  

- 🌳 **Tree Data Structures** (Binary Trees, BST, AVL, Red-Black Trees)  
- 📈 **Graph Algorithms** (DFS, BFS, Dijkstra's, Kruskal's, Prim's)  
- 🧮 **Dynamic Programming** visualizations  
- 🔄 **More Sorting Algorithms** (Heap Sort, Radix Sort, Counting Sort)  
- 🎯 **Advanced Data Structures** (Heaps, Hash Tables, Tries)  
- 🌎 **Multi-Language (i18n) Support**  
- 📈 **Performance Analytics** and complexity analysis  
- 🎥 **Enhanced Animations** with more visual effects  
- 💾 **Save and Share** algorithm configurations  

---

## 🛠️ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/echoabhinav/DsaVisualiser.git
cd DsaVisualiser
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Environment Setup (Optional - for AlgoBot feature)  
Create a `.env` file in the root directory and add your Gemini API key:  
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4️⃣ Start the Development Server  
```bash
npm run dev
```

> The app should now be running on `http://localhost:5173`  

---

## 📂 Project Structure  

```
DsaVisualiser/
├── .env                         # Environment variables (Gemini API key)
├── .gitignore                   # Git ignore rules
├── components.json              # ShadCN UI components configuration
├── eslint.config.js             # ESLint configuration
├── index.html                   # Main HTML file
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Locked dependency versions
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # TypeScript app-specific config
├── tsconfig.node.json           # TypeScript Node.js config
├── vercel.json                  # Vercel deployment configuration
├── vite.config.ts               # Vite configuration
├── public/                      # Static files
│   └── _redirects               # Netlify/Vercel redirects
└── src/                         # Source code
    ├── main.tsx                 # Application entry point
    ├── index.css                # Global styles
    ├── App.css                  # App-specific styles
    ├── vite-env.d.ts            # Vite environment types
    ├── Layout.tsx               # Main layout component
    ├── Hero.tsx                 # Hero section component
    ├── Navbar.tsx               # Navigation component
    ├── Footer.tsx               # Footer component
    ├── AlgorithmCategories.tsx  # Algorithm categories display
    ├── algorithm-detail.tsx     # Algorithm detail view
    ├── data-structure-categories.tsx # Data structure categories
    ├── components/              # Reusable UI components
    │   └── ui/                  # ShadCN UI components
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── input.tsx
    │       ├── dialog.tsx
    │       ├── badge.tsx
    │       ├── tabs.tsx
    │       ├── progress.tsx
    │       ├── slider.tsx
    │       ├── separator.tsx
    │       ├── label.tsx
    │       ├── textarea.tsx
    │       ├── alert.tsx
    │       ├── dropdown-menu.tsx
    │       ├── sonner.tsx
    │       ├── scroll-area.tsx
    │       └── avatar.tsx
    ├── context/                 # React context providers
    │   └── theme.ts             # Theme context
    ├── lib/                     # Utility libraries and algorithms
    │   ├── utils.ts             # General utility functions
    │   ├── array-utils.ts       # Array manipulation utilities
    │   ├── sorting-algorithms.ts # Sorting algorithm implementations
    │   └── searching-algorithms.ts # Searching algorithm implementations
    └── pages/                   # Application pages/routes
        ├── Home.tsx             # Home page
        ├── About.tsx            # About page
        ├── Algobot.tsx          # AI-powered algorithm assistant
        ├── Searching.tsx        # Searching algorithms page
        ├── Sorting.tsx          # Sorting algorithms page
        ├── data-structures/     # Data structure visualizations
        │   ├── index.ts         # Data structure exports
        │   ├── arrays.tsx       # Array data structure
        │   ├── stacks.tsx       # Stack data structure
        │   ├── queues.tsx       # Queue data structure
        │   ├── linked-lists.tsx # Linked list data structure
        │   └── data-structure-visualizer.tsx # Base visualizer
        └── race/                # Algorithm race mode
            ├── Race.tsx         # Main race page
            ├── algorithm-race.tsx # Race logic
            ├── algorithm-visualizer.tsx # Race visualizer
            ├── custom-input.tsx # Custom input component
            └── race-leaderboard.tsx # Race leaderboard
```

---

## 🤝 Contributing  

Contributions are welcome! Feel free to fork the repository and open a pull request.

1. Fork it 🍴  
2. Create your feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -am 'Add cool feature'`)  
4. Push to the branch (`git push origin feature/my-feature`)  
5. Open a Pull Request 🚀  

<img width="1887" height="856" alt="image" src="https://github.com/user-attachments/assets/b1cae5af-c4d1-4e69-bf99-1eb3b7adbec0" />
<img width="1886" height="674" alt="image" src="https://github.com/user-attachments/assets/338f73e2-cf19-46cc-9a54-1d8a323c53a3" />
<img width="1797" height="743" alt="image" src="https://github.com/user-attachments/assets/1c7e54c9-04b5-469f-bf20-e054c673f5d5" />

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) © 2025 Abhinav Tiwari.  
Feel free to use, modify, and distribute this project for personal or commercial purposes.
