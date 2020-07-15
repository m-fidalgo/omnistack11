const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {email, senha} = request.body;

        const user = await connection('user')
            .where('email',email)
            .where('senha',senha)
            .select('id')
            .first();
        
        if(!user)
            return response.status(400).json({ error: 'No user found with this ID'});
        
        return response.json(user);
    }
}