import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme";
import Login from "./pages/login";
import Panel from "./pages/panel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/user";
import PendingQueris from "./pages/pendingQueris";
import AddNewItem from "./pages/addNewItem";
import InvoiceAdd from "./pages/invoicesAdd";
import InvoicesSearch from "./pages/invoicesSearch";
import useAppSelector from "./hooks/useSelector";
import Otp from "./pages/otp";
import { useEffect, useLayoutEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { token } = useAppSelector((state) => state.user);
  const [auth, setAuth] = useState(true);

  let selectedTheme = lightTheme;
  useEffect(() => {
    if (token != "") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [auth, token]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Panel />} />
            <Route path="/user" element={<User />} />
            <Route path="/invoiceAdd" element={<InvoiceAdd />} />
            <Route path="/invoicesSearch" element={<InvoicesSearch />} />
            <Route path="/pending" element={<PendingQueris />} />
            <Route path="/newItem" element={<AddNewItem />} />
            <Route path="/otp" element={<Otp />} />
            {!auth && <Route path="/login" element={<Login />} />}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
export default App;
