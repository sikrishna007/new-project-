// Remove if react-quill is not used
// Remove if react-draft-wysiwyg is not used
// Remove if simplebar is not used
// Remove if mapbox is not used
import Head from 'next/head';
import {Provider as ReduxProvider} from 'react-redux';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {RTL} from 'src/components/rtl';
import {SplashScreen} from 'src/components/splash-screen';
import {Toaster} from 'src/components/toaster';
import {gtmConfig} from 'src/config';
import {AuthConsumer, AuthProvider} from 'src/contexts/auth/jwt';
import {SettingsConsumer, SettingsProvider} from 'src/contexts/settings';
import {useAnalytics} from 'src/hooks/use-analytics';
import {useNprogress} from 'src/hooks/use-nprogress';
import {store} from 'src/store';
import {createTheme} from 'src/theme';
import {createEmotionCache} from 'src/utils/create-emotion-cache';

// Remove if locales are not used
import 'src/locales/i18n';
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/components/dev";

const clientSideEmotionCache = createEmotionCache();

const CustomApp = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    useAnalytics(gtmConfig);
    useNprogress();

    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>
                    Event Mart
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <ReduxProvider store={store}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <AuthProvider>
                        <AuthConsumer>
                            {(auth) => (
                                <SettingsProvider>
                                    <SettingsConsumer>
                                        {(settings) => {
                                            // Prevent theme flicker when restoring custom settings from browser storage
                                            if (!settings.isInitialized) {
                                                // return null;
                                            }

                                            const theme = createTheme({
                                                colorPreset: settings.colorPreset,
                                                contrast: settings.contrast,
                                                direction: settings.direction,
                                                paletteMode: settings.paletteMode,
                                                responsiveFontSizes: settings.responsiveFontSizes
                                            });

                                            // Prevent guards from redirecting
                                            const showSlashScreen = !auth.isInitialized;

                                            return (
                                                <ThemeProvider theme={theme}>
                                                    <Head>
                                                        <meta
                                                            name="color-scheme"
                                                            content={settings.paletteMode}
                                                        />
                                                        <meta
                                                            name="theme-color"
                                                            content={theme.palette.neutral[900]}
                                                        />
                                                    </Head>
                                                    <RTL direction={settings.direction}>
                                                        <CssBaseline/>
                                                        {showSlashScreen
                                                            ? <SplashScreen/>
                                                            : (
                                                                <>
                                                                    {getLayout(
                                                                        <DevSupport
                                                                            ComponentPreviews={ComponentPreviews}
                                                                            useInitialHook={useInitial}
                                                                        >
                                                                            <Component {...pageProps} />
                                                                        </DevSupport>
                                                                    )}
                                                                </>
                                                            )}
                                                        <Toaster/>
                                                    </RTL>
                                                </ThemeProvider>
                                            );
                                        }}
                                    </SettingsConsumer>
                                </SettingsProvider>
                            )}
                        </AuthConsumer>
                    </AuthProvider>
                </LocalizationProvider>
            </ReduxProvider>
        </CacheProvider>
    );
};

export default CustomApp;
