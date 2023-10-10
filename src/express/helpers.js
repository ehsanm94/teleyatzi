const { createHmac } = require('crypto');

const config = require('../../config');

const isInitDataValid = (initData) => {
    return getComputedHash(initData) === initData.get('hash');
};

function getComputedHash (data) {
    return createHmac(
        'sha256',
        createHmac('sha256', 'WebAppData').update(config.bot.token).digest()
    )
        .update(getCheckString(data))
        .digest()
        .toString('hex')
    ;
}

function getCheckString (data) {
    const items = [];

    // remove hash
    for (const [k, v] of data.entries()) if (k !== 'hash') items.push([k, v]);

    return items.sort(([a], [b]) => a.localeCompare(b)) // sort keys
        .map(([k, v]) => `${k}=${v}`) // combine key-value pairs
        .join('\n');
}

module.exports = {
    isInitDataValid
};
