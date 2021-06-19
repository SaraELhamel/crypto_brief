const { User } = require("../models");
/// Acheter devis




const addUser = async (req, res) => {

    try {

            let email = req.body.email;
            let name = req.body.name;
            let photoUrl = req.body.photoUrl

        // const existingUser = await User.findOne({ email: email });

        const existingUser = await User.findOne({
            where: {
                email: email,
            },
          });


     

        if (existingUser  == null) {

            let user =  await User.create({
                email : email,
                name :name,
                photoUrl: photoUrl,
            })

            res.send(user)

            console.log(user);
            
        }else {

            console.log(existingUser);
            res.send(existingUser);

        }

         
            
        }
        catch (err) {
            res.json(err)
        }
 
}


module.exports = { addUser }