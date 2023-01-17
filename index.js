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

const getData = async () => {
    const connectMS = await sql.connect(msConfig);

    let countBook, countOverdue, students;
    // Получаем количество всех книг у студента
    await connectMS.query(`select id_stud, count(*) count_book from loanOfBooks group by id_stud`)
        .then(result => {
            countBook = result.recordset;
        })

    // Получаем количество просроченных книг
    await connectMS.query(`select id_stud, count(*) count_overdue_book from loanOfBooks where tenure < current_tenure group by id_stud`)
        .then(result => {
            countOverdue = result.recordset;
        })

    // Склеиваем значения полученые из двух предыдуших запросов
    students = countBook.map((stud, index) => {
        return Object.assign({}, stud, countOverdue[index]);
    })

    // Подключаемся к Oracle
    let connection;
    await oracle.getConnection(oracleConfig).then((conn) => (connection = conn))

    // Полуаем список с информацие о струденте и склеиваем его с предыдушим списком
    students = students.map(async stud => {
        let student;
        await connection.execute('select * from student where STUDENT_ID=' + stud.id_stud)
            .then(res => student = res.rows[0])
        return Object.assign({}, stud, {studName: student[1], studLastName: student[2]});
    })

    console.log(students);
    // [16593, 'Петрова', 'Анна', 'ж', '1ФИ' ]]
}

getData();

const updateTenure = async () => {
    const connectMS = await sql.connect(msConfig);
    await connectMS.query('exec AddTenure')
        .then(result => {
            console.log(result)
        })
}

// updateTenure();