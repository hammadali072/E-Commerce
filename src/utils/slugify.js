/**
 * Converts a product name into a URL-safe slug.
 * e.g. "Nike Air Max 270 – Black" → "nike-air-max-270-black"
 */
export const slugify = (str = '') =>
    str
        .toLowerCase()
        .trim()
        .replace(/[\u2013\u2014]/g, '-')   // en-dash / em-dash → hyphen
        .replace(/[^\w\s-]/g, '')           // remove non-word chars
        .replace(/[\s_]+/g, '-')            // spaces/underscores → hyphen
        .replace(/-+/g, '-')               // collapse multiple hyphens
        .replace(/^-+|-+$/g, '');          // trim leading/trailing hyphens
