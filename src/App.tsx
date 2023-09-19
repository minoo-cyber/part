import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme";
import Login from "./pages/login";
import UserPanel from "./pages/userPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import User from "./pages/user";
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
              <Route path="/userPanel" element={<UserPanel />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
