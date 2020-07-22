import React, { useEffect } from "react";
import { connect } from "frontity";

const ProjectsBlock = ({ projects, title, subtitle, state, actions }) => {
  console.log("projects", projects, "state", state);
  //Problem: the projects that we get here, doesn't give the acf fields
  //we need to get them from the state using the id
  // const project = state.source.projects[item.ID];
  //but in the state we get only the first page until we visit the projects page

  const response = state.source.get("/projects/");
  // console.log("response", response);

  return (
    <>
      <h3>{title}</h3>
      <p>{subtitle}</p>

      {response.isReady &&
        projects.map((item) => {
          const project = state.source.projects[item.ID];
          if (project === undefined) return;
          return (
            <h3>
              <a
                href={project.acf.project_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.title.rendered}
              </a>
            </h3>
          );
        })}
    </>
  );
};

export default connect(ProjectsBlock);
