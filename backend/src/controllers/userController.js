const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {email, telefone, senha} = request.body;
        
        const [id] = await connection('user').insert({
            email,
            telefone,
            senha
        });

        return response.json({id});
    }
};