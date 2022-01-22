import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import Select from "react-select";

import "./CreatePage.css";

const categories = [
  { value: `development`, label: `Development` },
  { value: `design`, label: `Design` },
  { value: `sales`, label: `Sales` },
  { value: `marketing`, label: `Marketing` },
];

const CreatePage = () => {
  const history = useHistory();
  const { addDocument, response } = useFirestore("projects");
  const { documents } = useCollection(`users`);
  const { user } = useAuthContext();

  const [users, setUsers] = useState([]);

  //form field values
  const [name, setName] = useState(``);
  const [detail, setDetail] = useState(``);
  const [dueDate, setDueDate] = useState(``);
  const [category, setCategory] = useState(``);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);

    if (!category) {
      setFormError(`Please select a project category`);
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError(`Please assign the project to atleast 1 user`);
      return;
    }
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        id: u.value.id,
        photoURL: u.value.photoURL,
      };
    });
    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
      photoURL: user.photoURL,
    };

    const project = {
      name,
      detail,
      assignedUsersList,
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
    };
    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
   console.log(assignedUsers)
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            type="text"
            value={detail}
            required
            onChange={(e) => setDetail(e.target.value)}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            type="date"
            value={dueDate}
            required
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        {formError && <p className="error">{formError}</p>}
        <button className="btn">submit</button>
      </form>
    </div>
  );
};

export default CreatePage;
