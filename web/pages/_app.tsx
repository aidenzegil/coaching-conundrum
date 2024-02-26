import { AppProps } from "next/app";
import { UserContextProvider } from "../components/providers/userProvider/provider";
import { BlocksContextProvider } from "../components/providers/blocksProvider/provider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserContextProvider>
      <BlocksContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </BlocksContextProvider>
    </UserContextProvider>
  );
};

export default App;
