const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const walletRoutes = require("./routes/WalletRoutes");
const UserRoutes = require("./routes/UserRoute");

app.use("/user", UserRoutes);
app.use("/wallet", walletRoutes);


db.sequelize.sync().then((res) => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});