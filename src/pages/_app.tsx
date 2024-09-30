import type { AppProps } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import {
  MantineProvider,
  ColorSchemeProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { initialState, HomeInitialState } from "@/state/index.state";
import { useCreateReducer } from "@/hooks/useCreateReducer";
import HomeContext from "@/state/index.context";
import "@/styles/globals.css";
import { Notifications } from "@mantine/notifications";
import type { Database } from "@/types/types_db";
import { supabaseClient } from "@/utils/app/supabase-client";
import { SessionProvider } from "next-auth/react";
export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  });

  const {
    state: { colorScheme },
  } = contextValue;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const myTheme: MantineThemeOverride = {
    colorScheme: colorScheme,
    spacing: {
      chatInputPadding: "40px",
    },
  };

  return (
    isClient && (
      <SessionContextProvider supabaseClient={supabaseClient}>
      <SessionProvider session={pageProps.session}>
        <HomeContext.Provider
          value={{
            ...contextValue,
          }}
        >
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={() => {}}
          >
            <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
                <Component {...pageProps} />
              <Notifications />
            </MantineProvider>
          </ColorSchemeProvider>
        </HomeContext.Provider>
      </SessionProvider>
      </SessionContextProvider>
    )
  );
}
