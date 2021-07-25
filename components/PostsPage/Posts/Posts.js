import moment from "moment";
import styles from "./posts.module.css";
import UpdatePostUI from "../UpdatePostUI/UpdatePostUI";

const Posts = (props) => {
  const { posts, curUser, showUpdateOptions, toggleDeleteWarning } = props;
  return (
    posts &&
    posts.length > 0 &&
    posts.map((post) => {
      return (
        <div key={post._id}>
          <div className={styles.updatePostContainer}>
            <div className={styles.creator}>
              <img
                className={styles.creatorImg}
                src="https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym95fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              />
              <div className={styles.creatorInfo}>
                <h2>{post.creator.username}</h2>
                <p className={styles.creatorFollow}>Follow</p>
              </div>
            </div>
            <UpdatePostUI
              toggleDeleteWarning={(e) => toggleDeleteWarning(e, post._id)}
              postCreatorId={post.creator.userId}
              curUser={curUser}
              isEditing={post.isEditing}
              showUpdateOptions={(e) => showUpdateOptions(e, post._id)}
              showEditForm={props.showEditForm}
            />
          </div>
          <div className={styles.post}>
            <div className={styles.imageContainer}>
              <img
                src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.header}>{post.title}</h3>
              <p className={styles.descr}>{post.description}</p>
              <span className={styles.postedTime}>
                {moment(post.createdAt).fromNow()}
              </span>
              <div className={styles.postInfo}>
                <div>
                  <span className={styles.postLikes}>
                    {post.likes.length} Likes
                  </span>
                  <span className={styles.postComments}>
                    {post.comments.length} Comments
                  </span>
                </div>
                <span className={styles.date}>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default Posts;
