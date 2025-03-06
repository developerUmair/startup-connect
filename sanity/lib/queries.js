import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search ] | order(views desc) {
    _id,
    title,
    slug,
    _createdAt,
    author-> {
      _id,
      name,
      image,
      bio,
      email
    },
    views,
    description,
    category,
    image,
    video
  }
`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
 *[_type=="startup" && _id == $id][0]{
  _id, title, slug, _createdAt, author -> {
    _id,
    name,
    username,
    image,
    bio
  }, views,
    description, category, image, video, pitch
}`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type=="startup" && _id==$id][0]{
  _id, views
  }
  `);

// export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
//     *[_type == "auth" && _id == $id][0]{
//     _id,
//     id,
//     name,
//     username,
//     email,
//     image, 
//     bio
//     }
//     `);

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
  *[_type == "author" && googleId == $googleId][0]{
  _id,
  id,
  googleId,
  name,
  username,
  email,
  image, 
  bio
  }
`);