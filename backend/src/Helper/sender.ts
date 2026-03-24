const amqp = require('amqplib/callback_api');

const sendToQeue = (data) => {
  amqp.connect(
    'amqp://guest:guest@localhost:5672',
    function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        var queue = 'imageToProcess';
        /*
            for (let i = 0; i < 100000; i++) {
                var msg = { msg: "mensagem", id: i };

                channel.assertQueue(queue, {
                durable: false,
                });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
            }
            console.log(" [x] Sent %s", msg);
            });
            setTimeout(function () {
            connection.close();
            process.exit(0);
            }, 500);
            */

        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
       setTimeout(() => {
        connection.close();
      }, 500);

        console.log("Dado enviado para fila: ", data)
      });
    },
  );
};

export default sendToQeue;
