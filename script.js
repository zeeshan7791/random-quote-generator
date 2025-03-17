const displayQuote = document.getElementById("display-quote");
const authorName = document.getElementById("author-name");
const copyQuote = document.getElementById("copy-quote");
const copyText = document.getElementById("copy-text");
const twitterBtn = document.getElementById("x-share-button");
const addNewQuote = document.getElementById("add-new-quote");

const backgroundImages = [
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324",
    "https://images.unsplash.com/photo-1532339142463-fd0a8979792e",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324",
    "https://images.unsplash.com/photo-1532339142463-fd0a8979792e",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324",
    "https://images.unsplash.com/photo-1532339142463-fd0a8979792e",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324",
    "https://images.unsplash.com/photo-1532339142463-fd0a8979792e",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324",
    "https://images.unsplash.com/photo-1532339142463-fd0a8979792e",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324",
    "https://images.unsplash.com/photo-1532339142463-fd0a8979792e"
];





// generate random quote function
const getRandomQuote = async () => {
  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    let quote = data.data.content;
    let author = data.data.author;
    displayQuote.textContent = `"${quote}"`;
    authorName.innerHTML = `<b>Author :</b> ${author}`;
   
   const imageIndex=await changeBackground(backgroundImages)
    document.body.style.backgroundImage = `url(${backgroundImages[imageIndex]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  } catch (error) {
    loading = false;
    console.error("Error fetching quote:", error);
  }
};

// random background images
async function changeBackground(backgroundImages){
    let randomNumber=Math.floor(Math.random() * backgroundImages.length)
    return randomNumber
}
// Call the function
getRandomQuote();

// Generate new quote event listener
addNewQuote.addEventListener("click", generateNewQuote);

// Generate new quote function and on click calling getRandomQuote function

function generateNewQuote() {
  getRandomQuote();
}


// creating copy clip board to copy the quote
displayQuote.addEventListener("click", () => {

  navigator.clipboard
    .writeText(displayQuote.textContent)
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


// add twitter button to share the quote on twitter (X)
twitterBtn.addEventListener("click", shareOnTwitter);
function shareOnTwitter() {
  const quote = displayQuote.textContent;
  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    quote
  )}`;
  window.open(twitterUrl, "_blank");
}
