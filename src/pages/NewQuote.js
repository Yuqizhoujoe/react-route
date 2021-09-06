import QuoteForm from "../components/quotes/QuoteForm/QuoteForm";
import {useHistory} from 'react-router-dom';
import useHttp from "../hooks/use-http";
import {addQuote} from "../lib/api";
import {useEffect} from "react";

const NewQuote = () => {
    const history = useHistory();
    const {sendRequest, status} = useHttp(addQuote);

    useEffect(() => {
        if (status === 'completed') {
            // push() we can go back the previous page
            history.push('/quotes');
            // replace() we can't go back
            // history.replace();
        }
    }, []);

    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
    };

    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
    );
};

export default NewQuote;
