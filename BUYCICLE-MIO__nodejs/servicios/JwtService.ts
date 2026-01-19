import jsonwebtoken, { Secret } from 'jsonwebtoken';

export default {
    generarJWT: ( payload: { [key: string]:any }, 
                            vigencia: string | number, 
                            withRefresh: boolean,
                            options?: jsonwebtoken.SignOptions ): Array<string> => {
        try {            
            const _tokens:string[]=[ 
                            { tipo:'accessToken', expiresIn: vigencia }, 
                            { tipo: 'refreshToken', expiresIn: '5h'}
                         ]
                         .map(
                            (tok:{ tipo: string, expiresIn: string | number } )=> { 
                                    let _payload=tok.tipo==='accessToken'? { ...payload } : { email: payload.email };
                                    return jsonwebtoken.sign(
                                                              _payload,
                                                               process.env.JWT_SECRET! as Secret,
                                                              { ...options, expiresIn: tok.expiresIn } as jsonwebtoken.SignOptions
                                                            );  
                                    }
                             );
            
            return withRefresh ? _tokens : _tokens.slice(0,1);                      
        
        } catch (error:any) {
            console.log('Error al generar JWT:', error);
            return [];    
        }
    },
    verificarJWT: ( token:string ): { valid: boolean, payload?: any, message?:string } => {
        try {
            const payload= jsonwebtoken.verify( token, process.env.JWT_SECRET! );
            return { valid: true, payload };

        } catch (error:any) {
            console.log('Error al verificar JWT:', error);
            return { valid: false, message: error.message };
        }
    },
    listaClaimsJWT: ( token:string ): { [key:string]: any } | null => {
        try {
            const payload= jsonwebtoken.decode( token );
            if( typeof payload === 'object' && payload !== null ){
                return payload as { [key:string]: any };
            } else {
                return null;
            }
        } catch (error:any) {
            console.log('Error al decodificar JWT:', error);
            return null;
        }   
    }
}