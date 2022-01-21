import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';
import { writeFile } from 'fs';

const getParameters = async () => {

    const client = new SSMClient({ region: 'us-east-2' });

    const params = {
        Names: ['DB_PASSWORD', 'DB_HOST', 'DB_NAME', 'DB_USERNAME'],
        WithDecryption: true
    }
    const command = new GetParametersCommand(params);
    const response = await client.send(command)

    const objectData = response.Parameters.map(param => {
        return { [param.Name]: param.Value }
    });
    const formattedData = formatData(objectData);

    await writeFile('api/dist/api/.env', formattedData, (err) => {
        if (err) console.log(err);
    });
}

const formatData = (data) => {
    let formatted = '';

    data.forEach(param => {
        const key = Object.keys(param)[0];
        formatted += `${key}="${param[key]}"\n`
    })

    return formatted;
}

console.log('==== GETTING ENV PROPERTIES ====');
getParameters()
