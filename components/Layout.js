import { createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  ThemeProvider,

} from "@mui/material";
import Head from "next/head";
import Header from "./Header";
import jsCookie from "js-cookie";
import { useContext } from "react";
import { Store } from "../utils/store";
import Footer from "./Footer";
import Script from "next/script";
import { useTranslation } from "next-i18next";

export default function Layout({ title, tags, description, children }) {
    const { t } = useTranslation("common");
    const { state, dispatch } = useContext(Store);
    const { darkMode } = state;

    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
        const newDarkMode = !darkMode;
        jsCookie.set("darkMode", newDarkMode ? "ON" : "OFF");
    };
  
    const theme = createTheme({
        components: {
        MuiLink: {
            defaultProps: {
                underline: "hover",
            },
        },
        MuiInput: {
            defaultProps: {
                margin: 0,
            },
        },
        },
        typography: {
        fontFamily: ["CairoRegular", "sans-serif"].join(","),

        h1: {
            fontSize: "1.6rem",
            fontWeight: 400,
            margin: "1rem 0",
        },
        h2: {
            fontSize: "1.4rem",
            fontWeight: 400,
            margin: "1rem 0",
        },
        },
        palette: {
        mode: darkMode ? "dark" : "light",
        primary: {
            main: "#FFF",
        },
        secondary: {
            main: "#f700c4",
        },
        white: {
            main: "#FFF",
        }
        },
    });

    return (
        <>
        <Head>
            <title>{title ? `${title} - Abdelaziz Khedhiri` : "Abdelaziz Khedhiri"}</title>
            {description && <meta name="description" content={description}></meta>}
            {tags && <meta name="keywords" content={tags.join(", ")}></meta>}

            <meta name="description" content={t("about")} />
            <meta name="keywords" content="web developer, software developer, fullstack developer, developer, fullstack, Html, css, Javascript, React, ReactJs, NextJs, Vue, VueJs, Node, NodeJs, php, Twig, sass, Tailwindcss, Web Development, Développement web, Web Application, Mobile Application, Website, Sousse, Tunisia," />
            <meta property="og:title" content="Abdelaziz Khedhiri - Computer Engineer & FullStack Web Developer" />
            <meta property="og:description" content="Computer Engineer & FullStack Web Developer" />
            <link rel="icon" href="/aziz-link.png" />
            <title>Abdelaziz Khedhiri</title>
            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
           
        </Head>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header setDarkMode={darkModeChangeHandler} darkMode={darkMode} />
            <main>
                {children}
            </main>
            <Footer />
        </ThemeProvider>
        </>
    );
}
