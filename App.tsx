import React, {useEffect, useState} from 'react';
import Navigator from './src/navigations';
import Loading from './src/screens/Loading';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return loading ? <Loading /> : <Navigator />;
}

export default App;
