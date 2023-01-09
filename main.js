var oracledb = require('oracledb');

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

oracledb.getConnection(msConfig, function(err, connection) {
if (err) {
    console.error(err.message);
    return;
}
     connection.execute("SELECT * FROM table",[], function(err, result) {
    if (err) { console.error(err.message);
          doRelease(connection);
          return;
     }
     console.log(result.metaData);
     console.log(result.rows);
     doRelease(connection);
   });
});
function doRelease(connection) {
       connection.release(function(err) {
         if (err) {
          console.error(err.message);
        }
      }
   );
}