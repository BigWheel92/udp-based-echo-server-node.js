const dgram=require('dgram');
const ip = require('ip');
const { stdin, stdout } = require('process');
const rl=require('readline');

const ip_addr=ip.address();
const port= Number.parseInt(process.argv[2]);


const server=dgram.createSocket('udp4')
server.bind(port, ip_addr);

server.on('error', (err)=>{
    console.log(err)
})

server.on('message', (data, rinfo) => {
    console.log(`Data received from client (${rinfo.address}): ${data}\n`);
    server.send(data, rinfo.port, rinfo.address);
    console.log(`Data sent to client (${rinfo.address}): ${data}\n`);
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });


  const prompt=rl.createInterface({
    input: stdin,
    output: stdout
  });

  prompt.on('line', (input)=>{
    if (input.length===1 && input.toLowerCase()==='e'  )
        {
            server.close(); //this line is optional.
            process.exit();
        }
  })
