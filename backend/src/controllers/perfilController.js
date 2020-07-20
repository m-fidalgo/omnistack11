const connection = require('../database/connection');

module.exports = {
    async list(request, response){
        const ongs_id = request.headers.auth;

        const casos = await connection('casos')
            .join('ongs','ongs.id','=','casos.ongs_id')
            .where('ongs_id',ongs_id)
            .select([
                'casos.*',
                'ongs.nome',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.cidade',
                'ongs.estado',
                'ongs.tipo'
            ]);

        const total = await connection('casos')
            .count('casos.id')
            .join('ongs','ongs.id','=','casos.ongs_id')
            .groupBy('casos.id')
            .having('ongs_id','=',ongs_id);

        response.header('X-Total-Count',total.length);
        return response.json(casos);

    }
};