const sql = require('mssql');
const oracle = require('oracledb');

const msConfig = {
    user: 'Stud_AVB',
    password: '_AVB_19',
    database: 'BiblioEdu',
    server: '192.168.20.170',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

const oracleConfig = {
    user: 'QGEHJTDQ1DCJ',
    password: 'AVb_19_21',
    connectionString: "192.168.20.34/orcl"
}

const msConnection = async () => {
    try {
        await sql.connect(msConfig)
        const result = await sql.query(`select * from books`)
    } catch (e) {
        console.log(e)
    }
}

oracle.getConnection(oracleConfig)
    .then(connection => {
        connection.execute('select * from student', [], (error, result) => {

            if (result)
                console.log(result)
            else
                console.log(error)

        })
    })
    .catch(error => console.log(error))

// msConnection();