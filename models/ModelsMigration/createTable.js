const { exec } = require('child_process');

// exec(`npx sequelize-cli migration:generate --name create-user_has_kyc_rule`, 
//     (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error generating Users model: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });


// You can add more models as needed by repeating the exec command with different model names and attributes.