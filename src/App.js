import './App.css';
import Mainarea from './Components/Mainarea';
import Navbar from './Components/Navbar';
import {useState} from 'react';

function App() {
  const [theme, setTheme] = useState("light");

  if (theme === "light") {
    document.body.style.backgroundColor = "#fff";
  } else {
    document.body.style.backgroundColor = "#1c1c1c";
  }

  const handleSwitchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <>
      <Navbar theme={theme} handleSwitchTheme={handleSwitchTheme} />
      <Mainarea theme={theme} />
    </>
  );
}

export default App;
