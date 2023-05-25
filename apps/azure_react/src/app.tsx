/** Root Component */

import React, {useState} from 'react';
import './styles/index.css';

const App = () => {
  const [count, setCount] = useState(0);
  
  const handleCount = () => setCount(count + 1);

  return (<div data-testid="AppComponent" className="csr">
    <h1>Hi there, I am React CSR from webpack 5.</h1>
    <div className='counter'>
          <button onClick={handleCount} className='btn btn-increment'>Increment</button>
          <p className='count-label'>Count: {count}</p>
        </div>
  </div>)
}

export default App;
