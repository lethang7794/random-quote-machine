import { useState, useEffect } from 'react';
import './App.css';

const quotesURL =
  'https://gist.githubusercontent.com/lethang7794/2405ea0145669af23aa2b3317e0f5fb1/raw/913f7958e8c94c8107d27215c8913e53803ff3a4/quotes.json';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      const response = await fetch(quotesURL);

      if (response.ok) {
        const data = await response.json();
        setQuotes(data.quotes);
        getRandomQuote(data.quotes);
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }

  return (
    <div className='App min-h-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-green-200 px-6'>
      {quote && (
        <div
          id='quote-box'
          className='w-96 max-w-sm mx-auto bg-white rounded shadow-xl'
        >
          <figure className='p-5 px-10'>
            <blockquote
              id='text'
              className='font-serif text-xl italic relative'
            >
              {quote?.quote}
            </blockquote>
            <figcaption
              id='author'
              className='mt-2 font-sans text-right text-gray-700 '
            >
              — {quote?.author}
            </figcaption>
          </figure>
          <div
            id='button-bar'
            className='p-3 flex w-full justify-between rounded rounded-t-none pt-3 bg-gray-500'
          >
            <div className='xl flex items-center'>
              <div id='widget'>
                <div className='btn-o' style={{ width: 76 }}>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${quote?.quote}%0A- ${quote?.author}`}
                    className='btn'
                    id='tweet-quote'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i></i>
                    <span className='label' id='l'>
                      Tweet
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <button
              id='new-quote'
              onClick={() => getRandomQuote(quotes)}
              className='p-2 bg-green-500 text-white border-white border-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
