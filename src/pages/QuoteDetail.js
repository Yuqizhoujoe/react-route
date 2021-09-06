import {Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import {Fragment, useEffect} from "react";
import Comments from "../components/comments/Comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuoted/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound/NoQuotesFound";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
    const params = useParams();
    console.log(params);
    const {quoteId} = params;
    const match = useRouteMatch();
    const {sendRequest: getQuoteById, data: quote, status, error} = useHttp(getSingleQuote);

    useEffect(() => {
        getQuoteById(quoteId)
    }, [getQuoteById]);

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

    if (!quote) {
        return <NoQuotesFound/>;
    }

    return (
        <Fragment>
            <HighlightedQuote text={quote.text} author={quote.author}/>
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className='btn--flat' to={`${match.url}/comments`}> Load Comments </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;
