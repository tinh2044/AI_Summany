import { Header, Home } from "./components";
function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <div className="app">
        <Header />
        <Home />
      </div>
    </main>
  );
}

export default App;
