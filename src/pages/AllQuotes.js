import QuoteList from "../components/quotes/QuoteList/QuoteList";
import {useEffect} from "react";
import useHttp from "../hooks/use-http";
import {getAllQuotes} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound/NoQuotesFound";

const AllQuotes = () => {
    const {sendRequest: fetchAllQuotes, status, data: loadedQuotes, error} = useHttp(getAllQuotes, true);

    useEffect(() => {
        fetchAllQuotes();
    }, [fetchAllQuotes]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        );
    }

    if (error) {
        return <p className='centered focused'>{error}</p>
    }

    if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
        return <NoQuotesFound/>;
    }

    return (
        <QuoteList quotes={loadedQuotes}/>
    );
};

export default AllQuotes;
