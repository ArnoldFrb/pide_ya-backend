const { use } = require('./app');
const app =  require('./app');

async function main(){
    await app.listen(4000);
    console.log('SERVER ON PORT', 4000);
}
main();