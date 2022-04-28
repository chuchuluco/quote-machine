import Ract, {useState, useEffect} from 'react';
import './App.scss';
import COLOR_ARRAY from "./colorArray"

let urlQ = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const [quote, setQuote] = useState("I failed my way to success.");
  const [author, setAuthor] = useState("Thomas Edison")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState("#282c34")
  
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parseJSON = await response.json()
    setQuotesArray(parseJSON.quotes)
  } 

  useEffect(() => {
    fetchQuotes(urlQ)
  }, [urlQ])

  
  
  const getRandomQuote = () => {
    let randomInt = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInt)
    setQuote(quotesArray[randomInt].quote)
    setAuthor(quotesArray[randomInt].author)
    setAccentColor(COLOR_ARRAY[randomInt])
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <h2 id="text">"{quote}"
        </h2>
          <p id="author">- {author}</p>
          <div className="buttons" >
            <a id="tweet-quote" style={{ backgroundColor: accentColor }} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>tweet it!</a>
            <button id="new-quote" style={{ backgroundColor: accentColor }} onClick={() => getRandomQuote()}>Get a new quote</button>
          </div>

          

        </div>
      </header>
    </div>
  );
}
export default App;
