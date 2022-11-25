// get quotes from API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//show loading
function loading() {

    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {

    quoteContainer.hidden = false;
    loader.hidden = true;
}

let apiQuotes = [];

// Show New Quote

function newQuote() {
    loading();

    //pick a random quote from API quote Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author fieldis blank and replace it with ''Unknown'

    if (!quote.author) {

        authorText.textContent = '-Unknown';
    }
    else {
        authorText.textContent = quote.author;

    }

    //check the quote lenght to determing the styling

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');

    }
    else {
        quoteText.classList.remove('long-quote');

    }

    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();


}

async function getQuotes() {

    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    }
    catch (error) {
        //catch error to handle here
    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);





//On Load
getQuotes();
