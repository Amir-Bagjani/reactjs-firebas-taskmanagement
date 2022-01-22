import Avatar from "../../components/Avatar";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

const ProjectSummary = ({ project }) => {
  const history = useHistory();
  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore(`projects`)

  const handleDelete = () => {
    deleteDocument(project.id)
    history.push("/")
  }
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by: {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.detail}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && <button className="btn" onClick={handleDelete}>Mark as Complete</button>}
    </div>
  );
};

export default ProjectSummary;
