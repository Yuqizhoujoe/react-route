import {useCallback, useEffect, useState} from 'react';

import classes from './Comments.module.css';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import {useParams} from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import {getAllComments} from "../../../lib/api";
import LoadingSpinner from "../../UI/LoadingSpinner";
import CommentsList from "../CommentsList/CommentsList";

const Comments = () => {
    const params = useParams();
    const {quoteId} = params;
    console.log(quoteId);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const {sendRequest: fetchAllComments, status, error, data: loadedComments} = useHttp(getAllComments);

    useEffect(() => {
        fetchAllComments(quoteId);
    }, [quoteId, fetchAllComments]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const addedCommentHandler = useCallback(() => {
        fetchAllComments(quoteId);
    }, [fetchAllComments, quoteId]);

    let comments;

    if (status === 'pending') {
        comments = (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        );
    }

    if (status === 'completed' && loadedComments) {
        comments = <CommentsList comments={loadedComments}/>;
    }

    if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
        comments = <p className='centered'>No comments were added yet!</p>;
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler}/>}
            {comments}
        </section>
    );
};

export default Comments;
