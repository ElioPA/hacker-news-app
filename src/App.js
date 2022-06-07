import { Header, Main } from './components';
import { PostProvider } from './context/PostContext';

function App() {

  return (
    <PostProvider>
        <Header />
        <Main />
    </PostProvider>
  );
}

export default App;
