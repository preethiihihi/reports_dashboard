import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'
import Page0 from './page0'
import './cont.css';





function App() {
  const [count, setCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

var display=<Page0/>;
if(selectedOption=="all"){display=<Page0/>}
if(selectedOption=="date"){display=<Page1/>}
if(selectedOption=="weekly"){display=<Page2/>}
if(selectedOption=="yearly"){display=<Page3/>}

  return (
    <div calssName="time-range-conatiner">

     
     <label>
        <input
          type="radio"
          value="all"
          checked={selectedOption === 'all'}
          onChange={handleOptionChange}
        />
        ALL
      </label>

      <label>
        <input
          type="radio"
          value="date"
          checked={selectedOption === 'date'}
          onChange={handleOptionChange}
        />
        Date
      </label>

      <label>
        <input
          type="radio"
          value="weekly"
          checked={selectedOption === 'weekly'}
          onChange={handleOptionChange}
        />
        Weekly
      </label>
     
      <label>
        <input
          type="radio"
          value="yearly"
          checked={selectedOption === 'yearly'}
          onChange={handleOptionChange}
        />
        Yearly
      </label>
     {display}
      
      
    </div>
  )
}
export default App
