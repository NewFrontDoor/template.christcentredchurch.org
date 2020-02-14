import imageUrlBuilder from '@sanity/image-url';
import myConfiguredSanityClient from './sanity';

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(myConfiguredSanityClient);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}

export default urlFor;
