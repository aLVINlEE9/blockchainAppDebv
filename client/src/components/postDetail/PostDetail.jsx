import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PostDetail.module.scss';
import dateFormat, { masks } from "dateformat";
import { AuthContext } from '../../context/AuthContext';
import { ModalContextProvider } from '../../context/ModalContext';
import NftButton from '../nftButton/NftButton';


export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  // const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts/" + id);
      if (res && res.data)
        setPost(res.data);
      fetchUser(res.data);
    }
    const fetchUser = async (post) => {
      const res = await axios.get("/users/" + post.userId)
        .catch(function (error) {
        })
      if (res && res.data)
        setUser(res.data);
    };
    fetchPost();
  }, []);

  return (
    <ModalContextProvider>
      <section className={styles.container}>
        <div className={styles.imageContainer}>
          {
            post?.image ?
              <img
                src={post.image}
                alt="content"
                className={styles.imageContent}
              />
              : null
          }
        </div>
        <div className={styles.textContainer}>
          <div className={styles.basicContainer}>
            <span className={styles.contentTitle}>{post.title}</span>
            <div className={styles.contentAddress}>0x01234567</div>
            <div className={styles.contentDate}>{dateFormat(post.createdAt, "yyyy-mm-dd HH:MM:ss")}</div>
          </div>
          <div className={styles.uniqueContainer}>
            <div className={styles.contentContainer}>{post.content}</div>
            <div className={styles.descriptContainer}>
              <div className={styles.ownerName}>by {user ? user.username : "undefined"}</div>
              <div className={styles.ownerAddress}>{user ? user.walletAddress : "undefined"}</div>
              <div>isNFT? {post.isNFT ? "true" : "false"}</div>
            </div>
            <div className=''>
              <NftButton post={post} user={user} />
            </div>
          </div>
        </div>
      </section>
    </ModalContextProvider>
  )
}