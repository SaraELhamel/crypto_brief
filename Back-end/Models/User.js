module.exports = (sequelize,DataTypes) => {

    const User = sequelize.define('User',{

        email: { 
            type : DataTypes.STRING ,
            allowNull: false,
            unique: true  
        },
        name : { 
            type: DataTypes.STRING  ,
            allowNull: false,
            unique:true
        }, 
        solde: {
            type : DataTypes.FLOAT,
            defaultValue : 1000,
            
        },
    });


    User.associate = models=>{
        User.hasMany(models.Wallet)
      }
   


    return User;

}