import React, { createContext } from "react";

const blogContext = createContext({
    blogData: null,
    setBlogData: () => { },
})
export default blogContext;