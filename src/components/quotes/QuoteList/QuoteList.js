import {Fragment} from 'react';

import QuoteItem from '../QuoteItem/QuoteItem';
import classes from './QuoteList.module.css';
import {useHistory, useLocation} from "react-router-dom";

const sortQuotes = (quotes, ascending) => {
    return quotes.sort((a, b) => {
        if (ascending) {
            return a.id.localeCompare(b.id);
        } else {
            return b.id.localeCompare(a.id);
        }
    });
};

const QuoteList = (props) => {
    const history = useHistory();
    const location = useLocation();

    /*
    hash: ""
    key: "wvwwdb"
    pathname: "/quotes"
    search: "?sort=asc"
    state: undefined

    console.log(location);
    */

    /*Map(
        [
            ['sort', 'asc ']
        ]
    );*/
    const queryParams = new URLSearchParams(location.search); // Map
    const isSortingAscending = queryParams.get('sort') === 'asc';
    const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

    const changeSortingHandler = () => {
        history.push({
            pathname: location.pathname,
            search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
        });
    };

    return (
        <Fragment>
            <div className={classes.sorting}>
                <button onClick={changeSortingHandler}> Sort {isSortingAscending ? 'Descending' : 'Ascending'} </button>
            </div>
            <ul className={classes.list}>
                {sortedQuotes.map((quote) => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default QuoteList;
