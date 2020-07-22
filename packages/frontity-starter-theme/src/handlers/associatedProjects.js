export const associatedProjectsHandler = {
  name: "associated-projects",
  priority: 10,
  // pattern: "/:slug",
  pattern: "/about",
  func: async ({ route, state, libraries }) => {
    //fetch the pages data
    const pageResponse = await libraries.source.api.get({
      endpoint: "pages",
      params: { slug: "about", _embed: true },
      // params: { _embed: true },
    });

    //populate the state with the response
    const [pageData] = await libraries.source.populate({
      response: pageResponse,
      state,
    });

    // Extract the project IDs.
    const page = state.source.page[pageData.id];
    const projectIds = page.acf.flexible_layouts
      .find((layout) => layout.acf_fc_layout === "projects_block")
      .projects.map((project) => project.ID);

    //Fetch the projects with these ids
    const projectsResponse = await libraries.source.api.get({
      endpoint: "projects",
      params: { include: projectIds.join(",") },
    });

    // Populate the state with those projects.
    await libraries.source.populate({
      response: projectsResponse,
      state,
    });

    //add link to data
    Object.assign(state.source.data[route], {
      id: pageData.id,
      type: pageData.type,
      isPostType: true,
      isPage: true,
      projectIds,
    });
  },
};
