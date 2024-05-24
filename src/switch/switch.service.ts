import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

interface SensorData {
    status: number;
}

@Injectable()
export class SwitchService {
    private mqttClient: mqtt.MqttClient;
    private currentSwitchStatus: string = 'Unknown';

    constructor() {
        this.mqttClient = mqtt.connect('mqtt://35.197.129.16:1883', {
            username: 'mqtt',
            password: '123456'
        });

        this.mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');

            // Subscribe to the specific water pump topic
            this.mqttClient.subscribe('farm/sensor/waterpump', (err) => {
                if (err) {
                    console.error('Failed to subscribe:', err);
                } else {
                    console.log('Subscribed to topic: farm/sensor/waterpump');
                }
            });
        });

        this.mqttClient.on('message', (topic, message) => {
            const sensorData: SensorData = JSON.parse(message.toString());
            // console.log('Received water pump sensor data:', sensorData);

            if (sensorData.status === 0 || sensorData.status === 1) {
                this.currentSwitchStatus = sensorData.status === 1 ? 'On' : 'Off';
                console.log('Current switch status:', this.currentSwitchStatus);
            } else {
                console.error('Invalid status value:', sensorData.status);
            }
        });
    }

    getSwitchStatus(): string {
        return this.currentSwitchStatus;
    }

    publishSwitchStatus(status: number) {
        const payload: SensorData = { status };
        this.mqttClient.publish('farm/sensor/waterpump', JSON.stringify(payload), { qos: 1 });
        console.log(`Published to topic 'farm/sensor/waterpump': ${JSON.stringify(payload)}`);
    }
}
