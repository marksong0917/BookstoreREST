const router = require("express").Router();

require("./routes/users")(router);
require("./routes/sessions")(router);
require("./routes/datas")(router);

module.exports = router;
