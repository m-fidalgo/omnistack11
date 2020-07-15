const connection = require('../database/connection');

module.exports = {
    async list(request, response){
        const ongs_id = request.headers.auth;

        const casos = await connection('casos')
            .where('ongs_id',ongs_id)
            .select('*');
        
        return response.json(casos);
    }
};