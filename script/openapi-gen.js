//根目录新建 script/openapi.js
 import { generateService } from '@umijs/openapi'
 import config from './openapi-config.js'


async function run() {
    for (let index = 0; index < config.openApi.length; index++) {
        await generateService(config.openApi[index])
    }
}

run()