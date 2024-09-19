
export const setLocalStorage =(key,value)=>{
localStorage.setItem(key,JSON.stringify(value))
}



export const getLocalStorage =(key)=>{
return JSON.parse(localStorage.getItem(key))
}

export const removeLocalStorage =(key)=>{
return localStorage.removeItem(key);

}






export const setLocalStorageUser =(key,value)=>{
localStorage.setItem(key,JSON.stringify(value))
}



export const getLocalStorageUser =(key)=>{
return JSON.parse(localStorage.getItem(key))
}