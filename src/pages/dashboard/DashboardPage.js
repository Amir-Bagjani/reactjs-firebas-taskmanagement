import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import { useAuthContext }  from '../../hooks/useAuthContext'
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";

import "./DashboardPage.css";

const DashboardPage = () => {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(`projects`);
  const [currentFilter, setCurrentFilter] = useState(`all`);

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents ? (documents.filter((document) => {
    switch (currentFilter) {
      case 'all':
        return true

      case 'mine':
          return 
          let assignedToMe = false;
          document.assignedUsersList.forEach( u=> {
              if(u.id === user.uid) assignedToMe = true;
          })
          return assignedToMe
          
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
          return document.category === currentFilter

      default:
        return true
    }
  })) : null

  return (
    <div className="">
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} /> }
      {documents && <ProjectList projects={projects} />}
    </div>
  );
};

export default DashboardPage;
