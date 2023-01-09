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

const getData = async (id_stud, id_book) => {
    const connectMS = await sql.connect(msConfig);
    const connectOracle = await oracle.getConnection(oracleConfig);

    let countBook, countOverdue, student;
    await connectMS.query(`select * from loanOfBooks where id_stud=` + id_stud)
        .then(result => {
            countBook = result.rowsAffected[0]
            result.recordset.filter(book => book.Tenure < book.Current_Tenure ? countOverdue =+ 1 : null)
        })

    let connection;
    await oracle.getConnection(oracleConfig).then((conn) => (connection = conn))

    await connection.execute('select * from student where STUDENT_ID=' + id_stud)
    .then(res => student = res.rows[0])

    const data = {countBook, countOverdue, studentName: student[2], studentSurname: student[1]}
        
        // [16593, 'Петрова', 'Анна', 'ж', '1ФИ' ]]
    console.log(data);

}   

getData(16593, 38349);