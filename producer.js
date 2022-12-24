import { Kafka } from "kafkajs"
import {randomUUID} from 'node:crypto'

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'test-producer',
      brokers: ['pretty-werewolf-10861-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'cHJldHR5LXdlcmV3b2xmLTEwODYxJCv5YJ9cuxamr2hxqfpxr_zo4DNewItNR1c',
    password: process.env.KAFKA_PASSWORD,
  },
  ssl: true,
  })
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        })
      }
    ]
  })
  await producer.disconnect()
}

bootstrap()