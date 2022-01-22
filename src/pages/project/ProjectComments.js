import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "../../components/Avatar";

const ProjectComments = ({ project }) => {
    const { updateDocument, response } = useFirestore(`projects`)
    const [newComment, setNweComment] = useState(``)
    const { user } = useAuthContext()

    const handleSubmit = async(e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        if(!response.error){
            setNweComment(``)
        }
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <ul>
                {project.comments.length > 0 && project.comments.map( comment => (
                    <li key={comment.id}>
                       <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                       </div> 
                       <div className="comment-date">
                           <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                       </div>
                       <div className="comment-content">
                           <p>{comment.content}</p>
                       </div>
                    </li>
                ))}
            </ul>
            
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Add new Comment:</span>
                    <textarea required value={newComment} onChange={e => setNweComment(e.target.value)}/>
                </label>
                <button className="btn btn-comment">Add comment</button>
            </form>

        </div>
    );
}
 
export default ProjectComments;