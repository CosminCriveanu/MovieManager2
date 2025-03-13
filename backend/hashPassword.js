const bcrypt = require('bcrypt');

//  Contaseña para cifrar
const plainPassword = 'CosminSecretKey';

bcrypt.hash(plainPassword, 10, (err, hash) => {
    if (err) {
        console.error('Error al generar el hash:', err);
        return;
    }
    console.log('Hash generado:', hash);
});
