const userInfo = JSON.parse(localStorage.getItem("userInfo"))
const xhr = new XMLHttpRequest();
xhr.open("POST","FavoriteList")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	
})
xhr.send(`userID=${userInfo.codigo}`);