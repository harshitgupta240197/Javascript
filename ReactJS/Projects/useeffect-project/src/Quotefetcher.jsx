import { useEffect, useState } from "react";

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";

function Quotefetcher() {

    const [quote, setQuote] = useState({})

    useEffect(() => {
        async function getInitialQuote() {
            const response = await fetch(RANDOM_QUOTE_URL);
            const jsonResponse = await response.json();
            const randomQuote = jsonResponse.quote;
            setQuote(randomQuote);
        }
        getInitialQuote();
    }, []);

    async function fetchQuote() {
        const response = await fetch(RANDOM_QUOTE_URL);
        const jsonResponse = await response.json();
        const randomQuote = jsonResponse.quote;
        setQuote(randomQuote);
    }

    return (
        <div>
            <button onClick={fetchQuote}>Get quote using handler</button>
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
        </div>
    )
}

export default Quotefetcher;