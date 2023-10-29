import ToDoList from "./components/ToDoList/todolist";
import { useState, useEffect } from 'react';

export default function App() {
  const [pageTitle, setPageTitle] = useState<string>("My To Do's");

  useEffect(() => {
      // Check if the chrome.tabs API is available (i.e., running in a Chrome extension context)
      if (chrome.tabs) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              const currentTab = tabs[0];
              if (currentTab && currentTab.title) {
                  setPageTitle(currentTab.title);
              }
          });
      }
  }, []);

  return (
    <div className="App">
      <h1>{`Tasks of  ${pageTitle}`}</h1>
      <ToDoList />
      <p className="footer">Tip: "ctrl + ."  can trigger this extension!</p>
    </div>
  )
}



