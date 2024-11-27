import mqtt from "mqtt";

const client = mqtt.connect("mqtt://test.mosquitto.org:1883");


const client2 = mqtt.connect("wss://test.mosquitto.org:8081")



client.subscribe('a-team')

client2.subscribe('test-amk-fs2', ()=>{  
    client.on("message", (topic, message) => {
        // message is Buffer
        if (topic === 'a-team') {
            
            
            
            const stringData = message.toString()

            client2?.publish('test-amk-fs2', Buffer.from(stringData))
            

            const data = JSON.parse(stringData)
            
            console.log("message in listener", data);
            console.log(data.value, data.id)
            // client.end();
        }
    });
})


client2.on('message', (topic, data)=>{

    console.log("CLIENT 2", data.toString())


})