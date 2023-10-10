const { isInitDataValid } = require('../helpers');
const { getUser, storeUser, transformUserObj } = require('../../models/user');

const init = async (req, res, next) => {
    const initData = new URLSearchParams(req.body.initData);

    if (!isInitDataValid(initData)) {
        return res.status(401).json({});
    }

    const userData = JSON.parse(initData.get('user'));

    await storeUser(userData.id, transformUserObj(userData), initData.get('query_id'), initData.get('auth_date'));

    return res.json({ ok: true, data: await getUser(userData.id) });
};

module.exports = {
    init
};
