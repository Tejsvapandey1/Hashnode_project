import request, { gql } from "graphql-request";
import {
  GetPostsArgs,
  GetPostsResponse,
  SubscribeToNewsletterResponse,
  PublicationName,
  GetPostBySlugResponse,
} from "./types";

// const publicationId="clzr9fxrq00050ajsbsst8fvw"
const host = "tejsva.hashnode.dev"; // This can also be fetched from the env
const endpoint = "https://gql.hashnode.com/";

export async function getBlogName() {
  const query = gql`
    query getBlogName($host: String!) {
      publication(host: $host) {
        title
        displayTitle
        favicon
      }
    }
  `;

  try {
    const response = await request<PublicationName>(endpoint, query, { host });
    return {
      title: response.publication.title,
      displayTitle: response.publication.displayTitle,
      favicon: response.publication.favicon,
    };
  } catch (error) {
    console.error("Error fetching blog name:", error);
    return {
      title: "Default Title",
      displayTitle: "Default Display Title",
      favicon: "",
    };
  }
}

export async function getPosts({ first = 9, pageParam = "" }: GetPostsArgs) {
  const query = gql`
    query getPosts($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              subtitle
              slug
              content {
                text
              }
              coverImage {
                url
              }
              author {
                name
                profilePicture
              }
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  try {
    let posts: GetPostsResponse["publication"]["posts"]["edges"] = [];
    let hasNextPage = true;
    let after = pageParam;

    while (hasNextPage) {
      const response = await request<GetPostsResponse>(endpoint, query, {
        host,
        first,
        after,
      });

      posts = posts.concat(response.publication.posts.edges);

      hasNextPage = response.publication.posts.pageInfo.hasNextPage;
      after = response.publication.posts.pageInfo.endCursor;
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
export async function subscribeToNewsletter(email: string) {
  const mutation = gql`
    mutation subscribeToNewsletter($host: String!, $email: String!) {
      subscribeToNewsletter(
        input: { email: $email, host: $host }
      ) {
        status
      }
    }
  `;

  const response = await request<SubscribeToNewsletterResponse>(
    endpoint,
    mutation,
    {
      host,
      email,
    }
  );

  return response;
}

export async function getPostBySlug(slug: string) {
  const query = gql`
    query getPostBySlug($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          subtitle
          coverImage {
            url
          }
          content {
            html
          }
          author {
            name
            profilePicture
          }
        }
      }
    }
  `;

  const response = await request<GetPostBySlugResponse>(endpoint, query, {
    host,
    slug,
  });

  return response.publication.post;
}
