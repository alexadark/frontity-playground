const settings = {
  name: "frontity-playground",
  state: {
    frontity: {
      // url: "https://test.frontity.org",
      url: "https://frontity-playground.gatsby-wp.com/",
      title: "Test Frontity Blog",
      description: "WordPress installation for Frontity development",
    },
  },
  packages: [
    {
      name: "frontity-starter-theme",
      state: {
        theme: {
          menu: [
            ["About", "/about"],
            ["Typography", "/typography"],
            ["Projects", "/projects/"],
            ["Flex", "/flex"],
          ],
          autoPreFetch: "hover",
          featured: {
            showOnList: false,
            showOnPost: false,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "https://frontity-playground.gatsby-wp.com/wp-json",
          params: {
            per_page: 2,
          },
          postTypes: [
            {
              type: "projects",
              endpoint: "projects",
              archive: "projects",
            },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
