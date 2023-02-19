const db = require("../connection");
const User = require('../models/user');

async function select()
{
    let result = await User.findAll();

    return result;
}

async function selectOnly(id)
{
    let result = await User.findByPk(id);

    return result;
}

async function insert(data)
{
    let checkEmail = await User.findAll({where: {email: data.email}});
    if(checkEmail.length > 0){
        return { error: "Este email já está em uso" };
    }

    let result = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        level: data.level,
        status: data.status
    });
    return result;
}

async function update(data, id)
{
    let user = await User.findByPk(id);
    user.name = data.name ? data.name : user.name;
    user.email = data.email ? data.email : user.email;
    user.password = data.password ? data.password : user.password;
    user.phone = data.phone ? data.phone : user.phone;
    user.level = data.level ? data.level : user.level;
    user.status = data.status ? data.status : user.status;
    
    try {
        let result = await user.save();
        return result;
        
    } catch (err) {
        return  { error: err.errors[0].message }; 
    }

}

async function destroy(id)
{
    User.destroy({where: {id: id}});
}

module.exports = {
    select,
    selectOnly,
    insert,
    update,
    destroy
}