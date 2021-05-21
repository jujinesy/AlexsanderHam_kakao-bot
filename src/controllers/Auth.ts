import 'dotenv/config';
import { AuthApiClient, TalkClient } from 'node-kakao';

class Auth {

    constructor() { }

    private async getToken() {
        const api = await AuthApiClient.create(process.env['DEVICE_NAME']!, process.env['DEVICE_UUID']!);
        const loginRes = await api.login({
            email: process.env['KAKAO_ACCOUNT_EMAIL']!,
            password: process.env['KAKAO_ACCOUNT_PASSWORD']!,
            forced: true,
        });

        if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);
    
        return loginRes;
    }

    async login(client: TalkClient) {
        const loginRes = await this.getToken();
        const res = await client.login(loginRes.result);
        
        if (!res.success) throw new Error(`Login failed with status: ${res.status}`);
    
        console.log(`[ KakaoTalk ] Connected at ${new Date().toLocaleString()}`);
    }

}

export default new Auth();