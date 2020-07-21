const connection = require('../database/connection');
const knexfile = require('../../knexfile');

module.exports = {
    async create(request, response){
        const {titulo, descricao, valor} = request.body;
        const ongs_id = request.headers.auth;

        const [id] = await connection('casos').insert({
            titulo,
            descricao,
            valor,
            ongs_id
        });
        
        return response.json({ id });
    },

    async list(request, response){
        const { page = 1} = request.query;
        const [count] = await connection('casos').count();
        const type = request.headers.type;
        let typeFull = '';
        
        if(type === 't')
        {
            const casos = await connection('casos')
                .join('ongs','ongs.id','=','casos.ongs_id')
                .limit(5)
                .offset((page - 1)*5)
                .select([
                    'casos.*',
                    'ongs.nome',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.cidade',
                    'ongs.estado',
                    'ongs.tipo'
                ]);

            response.header('X-Total-Count',count['count(*)']);
            return response.json(casos);
        }
        else{
            if(type === 'a')
                typeFull = 'Animais';
            if(type === 'd')
                typeFull = 'Direitos Humanos';
            if(type === 'm')
                typeFull = 'Meio Ambiente';
            
                const casos = await connection('casos')
                .join('ongs','ongs.id','=','casos.ongs_id')
                .limit(5)
                .offset((page - 1)*5)
                .select([
                    'casos.*',
                    'ongs.nome',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.cidade',
                    'ongs.estado',
                    'ongs.tipo'
                ])
                .where('ongs.tipo',typeFull);
            
            const total = await connection('casos')
                .count('casos.id')
                .join('ongs','ongs.id','=','casos.ongs_id')
                .groupBy('casos.id')
                .having('ongs.tipo','=',typeFull);

            response.header('X-Total-Count',total.length);
            return response.json(casos);
        }
    },

    async delete(request, response){
        const{ id } = request.params;
        const ongs_id = request.headers.auth;

        const caso = await connection('casos')
            .where('id',id)
            .select('ongs_id')
            .first();

        if(caso.ongs_id !== ongs_id)
            return response.status(401).json({ error: 'Operation not permited'});
        
        await connection('casos').where('id',id).delete();

        return response.status(204).send();
	}
};