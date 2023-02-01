import "@/styles/globals.css";
import type { AppProps } from "next/app";
// External libraries
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
// Store
import { store } from "@/modules/shared/store";
// Themes
import { appTheme } from "@/modules/shared/theme";
import { AuthObservableProvider } from "@/modules/auth/states";
import { PreviewImagesProvider } from "@/modules/journal/states";

const MyProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <Provider store={store}>
      <AuthObservableProvider>
        <PreviewImagesProvider>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </PreviewImagesProvider>
      </AuthObservableProvider>
    </Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyProviders>
      <Component {...pageProps} />
    </MyProviders>
  );
}
