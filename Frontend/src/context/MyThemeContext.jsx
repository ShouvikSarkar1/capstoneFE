import React, {useState} from "react";

export const themes = {
    light: {
        foreground: '#333333',
        background: 'white',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    }
};

export const MyThemeContext = React.createContext({theme: themes.light});

const MyThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.light);
    const darkMode = theme.background === themes.dark.background;
    return (
        <MyThemeContext.Provider value ={{theme, setTheme, darkMode}}>
            {props.children}
        </MyThemeContext.Provider>
    )
};

export default MyThemeProvider;