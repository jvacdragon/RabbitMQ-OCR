import pika
import json
from brandIdentifier import ocr
from sendToDatabase import sendToDatabase

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost')
)
channel = connection.channel()
queue_name = 'imageToProcess'
channel.queue_declare(queue=queue_name, durable=False)

def callback(ch, method, properties, body):
    print(" [x] Raw recebido:", body)

    try:
        data = json.loads(body)
        brandName = ocr(data.get("imagem"))
        sendToDatabase(data.get("id"), brandName)
        
        print(" [x] JSON convertido:", brandName)
    except Exception as e:
        print("Erro ao converter JSON:", e)

channel.basic_consume(
    queue=queue_name,
    on_message_callback=callback,
    auto_ack=True
)

print(' [*] Aguardando mensagens...')
channel.start_consuming()