import { useState, useEffect } from 'react';
import './App.css';

const quotesURL =
  'https://gist.githubusercontent.com/lethang7794/2405ea0145669af23aa2b3317e0f5fb1/raw/913f7958e8c94c8107d27215c8913e53803ff3a4/quotes.json';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(quotesURL);

        if (response.ok) {
          const data = await response.json();

          setTimeout(() => {
            setQuotes(data.quotes);
            getRandomQuote(data.quotes);
            setError(false);
            setLoading(false);
          }, 1000);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (err) {
        setTimeout(() => {
          setError(true);
          setLoading(false);
        }, 1000);
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
      {error && <h1>Sorry, we can't get the quotes for you! 🙇‍♂️</h1>}
      {!error && (
        <div
          id='quote-box'
          className='w-96 max-w-sm mx-auto bg-white rounded shadow-xl transition-height duration-500 ease-in-out'
        >
          <figure className='p-5 px-10'>
            <blockquote
              id='text'
              className={`font-serif text-xl italic relative ${
                loading ? 'animate-pulse' : ''
              }`}
            >
              {quote?.quote || (
                <>
                  <div className='h-4 bg-gray-300 rounded mb-1'></div>
                  <div className='h-4 bg-gray-300 rounded'></div>
                  <div className='h-4 bg-gray-300 rounded w-5/6 inline-block'></div>{' '}
                </>
              )}
            </blockquote>
            <figcaption
              id='author'
              className={`mt-2 font-sans text-right text-green-600 font-bold  ${
                !!loading && 'animate-pulse'
              }`}
            >
              —{' '}
              {quote?.author || (
                <div className='h-4 bg-gray-300 rounded w-20 inline-block align-text-bottom'></div>
              )}
            </figcaption>
          </figure>
          <div
            id='button-bar'
            className='p-3 flex w-full justify-between rounded rounded-t-none pt-3 bg-gray-500'
          >
            <div className={'xl flex items-center'}>
              <div id='widget'>
                <div className='btn-o' style={{ width: 76 }}>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${quote?.quote}%0A- ${quote?.author}`}
                    className={`btn ${!!loading && 'pointer-events-none	'}`}
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
              className={`p-2 bg-green-500 disabled:opacity-50 text-white border-transparent hover:border-white border-2 ${
                !!loading && 'pointer-events-none	'
              }`}
              disabled={loading ? true : false}
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
