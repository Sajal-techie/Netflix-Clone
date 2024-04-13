
import './App.css';
import { action,comedy,horror,originals } from './urls';
import NavBar from './Component/NavBar/NavBar';
import Banner from './Component/Banner/Banner';
import RowPost from './Component/RowPost/RowPost';
import { useState } from 'react';
function App() {
  const [data, setData] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const closeOtherTrailers = () => {
    setCurrentlyPlaying(null);
  };
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost setData={setData} data={data} url={originals} title='Netflix Originals' closeOtherTrailers={closeOtherTrailers}  />
      <RowPost setData={setData} data={data} url={action} title='Action' isSmall closeOtherTrailers={closeOtherTrailers}   />
      <RowPost setData={setData} data={data} url={comedy} title='Comedy' isSmall  closeOtherTrailers={closeOtherTrailers}  />
      <RowPost setData={setData} data={data} url={horror} title='Horror' isSmall  closeOtherTrailers={closeOtherTrailers}  />
    </div>
  );
}

export default App;
