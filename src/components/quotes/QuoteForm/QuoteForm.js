import {Fragment, useReducer} from 'react';

import Card from '../../UI/Card';
import LoadingSpinner from '../../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const initialFormState = {
    author: '',
    text: '',
    blur: false
};

const formInputReducer = (state = initialFormState, action) => {
    if (action.type === 'AUTHOR') {
        return {
            ...state,
            author: action.payload
        };
    }
    if (action.type === 'TEXT') {
        return {
            ...state,
            text: action.payload
        };
    }
    return state;
};

function validateInputIsEmpty(value) {
    return value === '';
};

const QuoteForm = (props) => {
    const [formState, dispatch] = useReducer(formInputReducer, initialFormState);
    const {author, text} = formState;

    const authorInputChangeHandler = (event) => {
        const author = event.target.value;
        dispatch({type: 'AUTHOR', payload: author});
    };

    const textInputChangeHandler = (event) => {
        const text = event.target.value;
        dispatch({type: 'TEXT', payload: text});
    };

    function submitFormHandler(event) {
        event.preventDefault();

        const enteredAuthor = author;
        const enteredText = text;

        // optional: Could validate here

        props.onAddQuote({author: enteredAuthor, text: enteredText});
    }

    return (
        <Fragment>
            {/*<Prompt
                when={!validateInputIsEmpty(author) || !validateInputIsEmpty(text)}
                message={(location) => 'Are you sure you want to leave?'}
            />*/}
            <Card>
                <form
                    className={classes.form}
                    onSubmit={submitFormHandler}
                >
                    {props.isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner/>
                        </div>
                    )}
                    <div className={classes.control}>
                        <label htmlFor='author'>Author</label>
                        <input
                            type='text'
                            id='author'
                            onChange={authorInputChangeHandler}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='text'>Text</label>
                        <textarea
                            id='text'
                            rows='5'
                            onChange={textInputChangeHandler}>
                        </textarea>
                    </div>
                    <div className={classes.actions}>
                        <button className='btn'>Add Quote</button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default QuoteForm;
