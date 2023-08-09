import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: "v57kmf2n",
  dataset: "production",
  useCdn: true,
});

export default client;