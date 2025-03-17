const displayQuote=document.getElementById("display-quote")
const authorName=document.getElementById("author-name")
const copyQuote=document.getElementById("copy-quote")
const copyText=document.getElementById('copy-text')
const twitterBtn=document.getElementById('x-share-button')



const addNewQuote=document.getElementById("add-new-quote")
let loading=false
const getRandomQuote=async()=> {
    try {
      
        const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

       
        const data = await response.json();
        let quote=data.data.content
        let author=data.data.author
      displayQuote.textContent=`"${quote}"`
      authorName.innerHTML=`<b>Author :</b> ${author}`

    } catch (error) {
        loading=false
        console.error("Error fetching quote:", error);
    }
}

// Call the function
getRandomQuote();


addNewQuote.addEventListener('click',generateNewQuote)



function generateNewQuote(){
getRandomQuote();
}

displayQuote.addEventListener("click", () => {
    console.log("clicked")
    
    navigator.clipboard.writeText(displayQuote.textContent)
        .then(() => {
            copyText.innerText = "Copied!"; 
            setTimeout(() => {
                copyText.innerText = ""; // reset after the two seconds
            }, 2000);
        })
        .catch((err) => {
            console.log("Clipboard copy failed:", err);
        });
}); 


twitterBtn.addEventListener('click',shareOnTwitter)
function shareOnTwitter() {
    const quote = displayQuote.textContent;
    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    window.open(twitterUrl, "_blank");
}