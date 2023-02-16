const slugify = require('slugify');

module.exports = (slugData) => {
    const slug = slugify(slugData, { lower: true });
    return slug;
}