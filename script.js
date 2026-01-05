import quote from "./quotes.js";



//For quote related variables//
let todayQuote;
let filteredtodayQuote;

//For Date related variables at functions//
const date = new Date();
const getDayOfYear = (date) =>{
    const start = new Date(date.getFullYear(), 0, 1);
    const difference = date - start;
    const oneDay = 1000 * 60 * 60 * 24
    return 1 + Math.floor(difference / oneDay);
}
const totalDay = getDayOfYear(new Date(date.getFullYear(), date.getMonth(), date.getDate()));

//Local Storage related//
const quoteStorage = localStorage.getItem('quoteStorage');

function checkLocalStorage(){

if (quoteStorage){
    todayQuote = JSON.parse(quoteStorage)[totalDay]
    

}
  else{
        localStorage.setItem('quoteStorage', JSON.stringify(quote));
    }

}

window.addEventListener('load', ()=>{
    checkLocalStorage()
    
})
