import { useContext } from 'react';
import { Header, Main } from './components';
import { FavoritesProvider, PostProvider, ThemeContext } from './context'
import './App.css';

function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className='app' theme={theme}>
      <Header />
      <PostProvider>
        <FavoritesProvider>
          <Main />
        </FavoritesProvider>
      </PostProvider>
    </div>
  );
}

export default App;
