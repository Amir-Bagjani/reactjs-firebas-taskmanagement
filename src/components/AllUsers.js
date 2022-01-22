import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";


import "./AllUsers.css";

const AllUsers = () => {
  const { error, documents } = useCollection(`users`);

  return (
    <div className="user-list">
        <h2>All Users</h2>
      {error && <p className="error">{error}</p>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
              <span className={user.isOnline ? `green` : `gray`}></span>
          </div>
        ))}
    </div>
  );
};

export default AllUsers;
