const dgram = require('dgram');
const { stdin, stdout } = require('process');
const readline=require('readline');

const client = dgram.createSocket('udp4');
const ip=process.argv[2];
const port=Number.parseInt(process.argv[3]);


const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.setPrompt('Enter the data to be sent the to server (enter e to exit).: ')
rl.prompt();

client.on('message', (data) => {
    console.log(`Data received from  the server: ${data.toString()}\n`);
  });
  

rl.on('line', (input)=>{

    if (input.length===1 && input.toLowerCase()==='e')
        process.exit();
    else
    {
        client.send(input, port, ip, (err) => {
           
            if (err)
            {
                console.log('There was an error in sending the data to the server!\n');
            }
          });
         
    }

})
