export const requestHandler = (itemRes) => { 
    if (itemRes.status === 401) { 
        localStorage.removeItem("user"); 
        window.location = "/login"; 
    } 
};