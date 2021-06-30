import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";
import ThemeToggler from "./components/Theme/ThemeToggler";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ColorModeProvider>
            <ThemeToggler />
            <Router>
              <Routes />
            </Router>
            <CSSReset />
          </ColorModeProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
