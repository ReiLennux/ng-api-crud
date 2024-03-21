import mssql from 'mssql';

const dbConfig = {
    user: 'lenn343_',
    password: 'XBOXrey00',
    server: 'sql.bsite.net',
    port: 1433,
    database: 'lenn343_',
    options: {
        encrypt: true,
        trustServerCertificate: true, 
        instanceName: 'MSSQL2016'
    }
};

export const getConnection = async () => {
    try {
        await mssql.connect(dbConfig);
        const pool = await mssql.connect();
        console.log("Conectado a la base de datos");
        return pool;
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}
