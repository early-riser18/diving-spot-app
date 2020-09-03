import React, { Component } from 'react';
import styles from './CommentList.module.scss';
import { Button } from '../Button/Button';
import Comment from '../Comment/Comment';

export default class CommentList extends Component {
    render() {
        // NEED TO GET THE ICONS NEXT TO AJOUTER UN AVIS
        return (
            <div>
                <div className={styles.header}>
                    <h2>Ce que les autres plongeurs disent</h2>
                    <Button variant='secondary' text='Ajouter un avis' /> 
                </div>
                <div className={styles.commentList}>
                    {this.props.spot.comments ? 
                    this.props.spot.comments.map(x => <Comment info={x} />) 
                    : ''} 
                    
                </div>
            </div>
        )
    }
}
