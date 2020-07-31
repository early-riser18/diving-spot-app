import React, { Component } from 'react';
import styles from './Comment.module.scss';
import renderStar from '../../util/renderStar';
import plusIcon from '../../assets/comment-plus-icon.svg';
import minusIcon from '../../assets/comment-minus-icon.svg';


export default class Comment extends Component {
    render() {
        let comment = this.props.info;

        return (
            <div className={styles.wrapper}>
                <div className={styles.authorTitle}>
                    <div><img className={styles.authorPic} src={require('../../assets/profile1.jpg')} alt='' /></div>
                    <div className={styles.titleStar}>
                        <p>{comment.title}</p>
                        <div>{renderStar(comment.rating)}<p> &nbsp;&nbsp;Excellent</p></div> {/*Dynamically change excellent based on rating*/}
                        <h5>{comment.author}</h5>
                        <h4>Membre depuis le: {comment.memberSince}</h4>
                    </div>
                </div>
                <div className={styles.details}>
                    <div>
                        <ul className={styles.pros}>
                            {comment.pros.map(x => <li><img className={styles.commentIcon} src={plusIcon} alt=''/>{x}</li>)}
                        </ul>
                        <ul className={styles.cons}>
                            {comment.cons.map(x => <li><img className={styles.commentIcon} src={minusIcon} alt=''/>{x}</li>)}

                        </ul>
                    </div>
                    <p>&ldquo; {comment.comment} &rdquo; </p>
                </div>
            </div>
        )
    }
}
