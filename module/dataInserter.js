const sluger = require('./sluger');

module.exports = (template, data) => {
    template = template.replaceAll('{%PRODUCT_NAME%}', data.productName);
    template = template.replaceAll('{%IMAGE%}', data.image);
    template = template.replaceAll('{%PRICE%}', data.price);
    template = template.replace('{%QUANTITY%}', data.quantity);
    template = template.replace('{%LINK%}', sluger(data.productName));
    template = template.replace('{%NOT_ORGANIC%}', data.organic ? '' : 'not-organic');
    template = template.replace('{%FROM%}', data.from);
    template = template.replace('{%NUTRIENTS%}', data.nutrients);
    template = template.replace('{%DESCRIPTION%}', data.description);
    return template;
}
