import React from "react";

const themeContext = React.createContext({
    isLight: true,
    changeTheme: () => {}
})

export default themeContext