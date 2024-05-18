const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter');
const newQuoteButton = document.querySelector('#new-quote');
const loader = document.querySelector('.loader');

let apiQuotes = [];

function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function complete() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

function newQuote() {
	loading();
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	quoteText.textContent = quote.text;

	const editedAuthor = quote.author.split(',');
	console.log(editedAuthor[0]);

	if (editedAuthor.includes('type.fit')) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = editedAuthor[0];
	}
	complete();
}

async function getQuotes() {
	const apiUrl = 'https://type.fit/api/quotes/';

	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		// console.log(apiQuotes);
		newQuote();
	} catch (error) {}
}

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuotes();
// loading();
