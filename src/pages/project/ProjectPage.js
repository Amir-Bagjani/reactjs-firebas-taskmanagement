import { useDocument } from '../../hooks/useDocument';
import { useParams } from 'react-router-dom';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';

import './ProjectPage.css'

const ProjectPage = () => {
    const { id } = useParams()
    const { document, error } = useDocument(`projects`,id)

    if(error){
        return <div className="error">{error}</div>
    }
    if(!document){
        return <div>Loading...</div>
    }
    return (
        <div className="project-details">
            <ProjectSummary project={document} />
            <ProjectComments project={document} />
        </div>
    );
}
 
export default ProjectPage;