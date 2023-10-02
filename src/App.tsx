import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme";
import Login from "./pages/login";
import Panel from "./pages/panel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import User from "./pages/user";
import Invoices from "./pages/invoices";
import PendingQueris from "./pages/pendingQueris";

const queryClient = new QueryClient();

const App = () => {
  let selectedTheme = lightTheme;
  return (
    <Provider store={store}>
      <ThemeProvider theme={selectedTheme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/panel" element={<Panel />} />
              <Route path="/user" element={<User />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/pending" element={<PendingQueris />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
