import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme";
import Login from "./pages/login";
import Panel from "./pages/panel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import User from "./pages/user";
import Invoices from "./pages/invoicesAdd";
import PendingQueris from "./pages/pendingQueris";
import AddNewItem from "./pages/addNewItem";
import InvoiceAdd from "./pages/invoicesAdd";
import InvoicesSearch from "./pages/invoicesSearch";
import useAppSelector from "./hooks/useSelector";
import Otp from "./pages/login/components/otp";

const queryClient = new QueryClient();

const App = () => {
  const { token } = useAppSelector((state) => state.user);
  let selectedTheme = lightTheme;
  return (
    <ThemeProvider theme={selectedTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {token ? (
              <>
                <Route path="/" element={<Panel />} />
                <Route path="/user" element={<User />} />
                <Route path="/invoiceAdd" element={<InvoiceAdd />} />
                <Route path="/invoicesSearch" element={<InvoicesSearch />} />
                <Route path="/pending" element={<PendingQueris />} />
                <Route path="/newItem" element={<AddNewItem />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/login" element={<Otp />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
export default App;
