//get quotes from api
const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitter = document.getElementById("twitter");
const newQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];
let retryCount = 0;
const maxRetries = 10;

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const randomQuote = () => {
  showLoader();
  const singleQuote = quotes[Math.floor(Math.random() * quotes.length)];

  //if no author
  !singleQuote.author
    ? (author.textContent = "Unknown")
    : (author.textContent = singleQuote.author);

  //if the quote text is long
  singleQuote.text.length > 120
    ? quote.classList.add("long-quote")
    : quote.classList.remove("long-quote");

  //addign the quote to the dom
  quote.textContent = singleQuote.text;
  hideLoader();̀
};

async function getQuotes() {
  showLoader();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    quotes = await response.json();
    randomQuote();
  } catch (error) {
    if (retryCount < maxRetries) {
      console.log(` there is an error. we are retrying ${retryCount}`);
      getQuotes();
      retryCount++;
    } else {
      alert(error);
    }
  }
}

function twitterTweet() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}
// button events
newQuote.addEventListener("click", randomQuote);
twitter.addEventListener("click", twitterTweet);

//on load
getQuotes();
