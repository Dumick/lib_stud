const sql = require('mssql');
const oracle = require('oracledb');

const msConfig = {
    user: 'Stud_AVB',
    password: '_AVB_19',
    database: 'BiblioEdu',
    server: '192.168.20.170',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

const oracleConfig = {
    user: 'QGEHJTDQ1DCJ',
    password: 'AVb_19_21',
    connectionString: "192.168.20.34"
}

const msConnection = async () => {

    try {
        await sql.connect(msConfig)
        const books = await sql.query(`select * from books`)
        const loanOfBooks = await sql.query(`select * from loanOfBooks`)
        return [books, loanOfBooks]
    } catch (e) {
        console.log(e)
    }
}

const oracleconn = () => { 
    const student = [];
    oracle.getConnection(oracleConfig)
    .then(connection => {
        connection.execute('select * from student', [], (error, result) => {

            if (result) {
                // console.log(result)
                student.push(result)
            }
            else
                console.log(error)

        })
    })
    .catch(error => console.log(error))
    return student
}



msConnection();
oracleconn()