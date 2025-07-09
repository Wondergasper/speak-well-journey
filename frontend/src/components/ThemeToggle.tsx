
// import React, { useEffect, useState } from 'react';
// import { Moon, Sun } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const ThemeToggle: React.FC = () => {
//   const [theme, setTheme] = useState<'light' | 'dark'>(
//     typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
//       ? 'dark'
//       : 'light'
//   );

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove('light', 'dark');
//     root.classList.add(theme);
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   };

//   return (
//     <Button 
//       onClick={toggleTheme} 
//       variant="ghost" 
//       size="icon"
//       className="rounded-full"
//       aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
//     >
//       {theme === 'light' ? (
//         <Moon className="h-5 w-5" />
//       ) : (
//         <Sun className="h-5 w-5" />
//       )}
//     </Button>
//   );
// };

// export default ThemeToggle;


// src/components/ThemeToggle.tsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-700" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
