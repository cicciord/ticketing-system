import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import CreateTicket from "./Pages/CreateTicket";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import _404NotFound from "./Pages/_404NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="create-ticket" element={<CreateTicket />} />
        </Route>
        <Route path="*" element={<_404NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
