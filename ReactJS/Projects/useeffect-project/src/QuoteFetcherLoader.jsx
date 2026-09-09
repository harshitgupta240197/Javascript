import { useEffect, useState } from "react";

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";

function QuotefetcherLoader() {

    const [quote, setQuote] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchQuote() {
            const response = await fetch(RANDOM_QUOTE_URL);
            const jsonResponse = await response.json();
            const randomQuote = jsonResponse.quote;
            setQuote(randomQuote);
            setIsLoading(false);
        }
        fetchQuote();
    }, []);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
        </div>
    )
}

export default QuotefetcherLoader;