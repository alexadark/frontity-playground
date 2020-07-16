export const associatedProjectsHandler = {
  name: "associated-projects",
  priority: 10,
  pattern: "/:slug",
  func: async ({ route, state, libraries }) => {
    //fetch the pages data
    const pageResponse = await libraries.source.api.get({
      endpoint: "pages",
      params: { _embed: true },
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

    //Fetch the projects with thos ids
    const projectsResponse = await libraries.source.api.get({
      endpoint: "projects",
      //from where can I know teh params I can use ??
      params: { include: projectIds.join(",") },
    });

    // Populate the state with those projects.
    await libraries.source.populate({
      response: projectsResponse,
      state,
    });

    //Populate data
    Object.assign(state.source.data[route], {
      id: pageData.id,
      type: pageData.type,
      isPostType: true,
      isPage: true,
      projectIds,
    });
  },
};
