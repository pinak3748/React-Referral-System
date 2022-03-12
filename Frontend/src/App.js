import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Login, Register, Home } from './components'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register/:Id" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
