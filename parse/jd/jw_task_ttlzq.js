const Template = require('../../template');

class Main extends Template {
    constructor() {
        super()
        this.title = "微信天天来赚钱"
        this.cron = "32 0,21 * * *"
        this.task = 'local'
        this.import = ['jdAlgo']
        this.header = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
            referer: 'https://servicewechat.com/wx91d27dbf599dff74/665/page-frame.html'
        }
    }

    async prepare() {
        this.algo = new this.modules.jdAlgo()

    }

    async main(p) {
        let cookie = p.cookie;
        let t = new Date().getTime()
        let home = await this.algo.curl({
            'url': `https://api.m.jd.com/MiniTask_ChannelPage?g_ty=ls&g_tk=1016381002&functionId=MiniTask_ChannelPage&t=${t}&body=%7B%22source%22%3A%22task%22%7D&appid=hot_channel&loginType=11&clientType=wxapp&client=android&clientVersion=7.22.270&build=&osVersion=Android%2010&screen=360*780&networkType=wifi&d_brand=HUAWEI&d_model=VOG-AL00&d_name=&lang=zh_CN&_ste=2`,
            form: ``,
            //    cookie,
            cookie: `${cookie};buildtime=20221031;wxapp_type=1;wxapp_version=7.22.310;wxapp_scene=1112;cid=5`,

            algo: {
                'appId': '60d61',
                'type': 'wechat',
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                referer: 'https://servicewechat.com/wx91d27dbf599dff74/666/page-frame.html',
            }
        }
        )
        // console.log(home)
        let point = home.data.point
        console.log(`当前金币:${point}`)
        console.log(`可兑换红包:${point/1000}`)
        console.log(`可兑换现金:${point/1250}`)
        // 发现页进入签到
        let signInfo = home.data.signInfo
        // console.log(signInfo)
        let signstatus = signInfo.signTaskList[signInfo.signDays-1].signStatus
        // console.log(signstatus)
        console.log("已签到", signInfo.signDays, "天")

        if (!signstatus) {
            let sign = await this.algo.curl({
                'url': `https://api.m.jd.com/mini_doSign?g_ty=ls&g_tk=1016381002&functionId=mini_doSign&t=${t}&body={"itemId":"1"}&appid=hot_channel&loginType=11&clientType=wxapp&client=android&clientVersion=7.22.270&build=&osVersion=Android%2010&screen=360*780&networkType=wifi&d_brand=HUAWEI&d_model=VOG-AL00&d_name=&lang=zh_CN&_ste=2`,
                form: ``,
                cookie: `${cookie};buildtime=20221031;wxapp_type=1;wxapp_version=7.22.310;wxapp_scene=1112;cid=5`,
                algo: {
                    'appId': '60d61',
                    'type': 'wechat',
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                    referer: 'https://servicewechat.com/wx91d27dbf599dff74/666/page-frame.html',
                }
            }
            )
            if (sign.data) {
                console.log('签到成功', sign.data.toastMsg)
                if (sign.data.toastMsg.includes("红包")){
                	this.notices(`${sign.data.toastMsg}`, p.user)

                }
            }
            else {
                console.log("签到失败", sign)
            }

        }
        else {
            console.log('已签到')
        }
        home = await this.algo.curl({
            'url': `https://api.m.jd.com/MiniTask_ChannelPage?g_ty=ls&g_tk=1016381002&functionId=MiniTask_ChannelPage&t=${t}&body=%7B%22source%22%3A%22task%22%7D&appid=hot_channel&loginType=11&clientType=wxapp&client=android&clientVersion=7.22.270&build=&osVersion=Android%2010&screen=360*780&networkType=wifi&d_brand=HUAWEI&d_model=VOG-AL00&d_name=&lang=zh_CN&_ste=2`,
            form: ``,
            //    cookie,
            cookie: `${cookie};buildtime=20221031;wxapp_type=1;wxapp_version=7.22.310;wxapp_scene=1019;cid=5`,

            algo: {
                'appId': '60d61',
                'type': 'wechat',
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                referer: 'https://servicewechat.com/wx91d27dbf599dff74/666/page-frame.html',
            }
        }
        )
        //console.log(home)


        // 服务页进入任务
        let drainageTask = home.data.drainageTask
        console.log(drainageTask.subTitle)
        if (drainageTask.status != 2) {
            let reward = await this.algo.curl({
                'url': `https://api.m.jd.com/miniTask_getDrainageTaskReward?g_ty=ls&g_tk=1016381002&functionId=miniTask_getDrainageTaskReward&t=${t}&body={"rewardAssignmentId":"79dRvBQWmT2Dwyu4vvyZUt1Pa6W"}&appid=hot_channel&loginType=11&clientType=wxapp&client=android&clientVersion=7.22.270&build=&osVersion=Android%2010&screen=360*780&networkType=wifi&d_brand=HUAWEI&d_model=VOG-AL00&d_name=&lang=zh_CN&_ste=2`,
                form: ``,
                cookie: `${cookie};buildtime=20221031;wxapp_type=1;wxapp_version=7.22.310;wxapp_scene=1019;cid=5`,
                algo: {
                    'appId': '60d61',
                    'type': 'wechat',
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                    referer: 'https://servicewechat.com/wx91d27dbf599dff74/666/page-frame.html',
                }
            }
            )
            if (reward.data) {
                console.log('获得金币', reward.data.rewardAmount)
            }
            else {
                console.log(reward)
            }

        } else {
            console.log("已完成")
        }


        let scanTaskList = home.data.scanTaskList
        for (let i in scanTaskList) {
            // console.log(i)
            let k = scanTaskList[i]
            console.log(k.title, k.subTitle)
            let scanAssignmentId = k.scanAssignmentId
            let itemId = k.itemId
            if (k.status != 2) {
                if (k.status != 1) {
                    let s = await this.algo.curl({
                        'url': `https://api.m.jd.com/MiniTask_ScanTask?g_ty=ls&g_tk=1016381002&functionId=MiniTask_ScanTask&t=${t}&body={"actionType":1,"scanAssignmentId":"${scanAssignmentId}","itemId":"${itemId}"}&appid=hot_channel&loginType=11&clientType=wxapp&client=android&clientVersion=7.22.270&build=&osVersion=Android%2010&screen=360*780&networkType=wifi&d_brand=HUAWEI&d_model=VOG-AL00&d_name=&lang=zh_CN&_ste=2`,
                        form: ``,
                        cookie,
                        algo: {
                            'appId': '60d61',
                            'type': 'wechat',
                        },
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                            referer: 'https://servicewechat.com/wx91d27dbf599dff74/665/page-frame.html',
                        }
                    }
                    )
                    // console.log(s)
                    console.log(`等待任务中...`)
                    await this.wait(k.times * 1100)

                    let r = await this.algo.curl({
                        'url': `https://api.m.jd.com/MiniTask_ScanTask?g_ty=ls&g_tk=1016381002&functionId=MiniTask_ScanTask&t=${t}&body={"actionType":0,"scanAssignmentId":"${scanAssignmentId}","itemId":"${itemId}"}&appid=hot_channel&loginType=11&clientType=wxapp&client=android&clientVersion=7.22.270&build=&osVersion=Android%2010&screen=360*780&networkType=wifi&d_brand=HUAWEI&d_model=VOG-AL00&d_name=&lang=zh_CN&_ste=2`,
                        form: ``,
                        cookie,
                        algo: {
                            'appId': '60d61',
                            'type': 'wechat',
                        },
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                            referer: 'https://servicewechat.com/wx91d27dbf599dff74/665/page-frame.html',
                        }
                    }
                    )
                    // console.log(r)
                    await this.wait(1000)
                }
                let reward = await this.algo.curl({
                    'url': `https://api.m.jd.com/MiniTask_ScanReward?g_ty=ls&g_tk=1016381002&functionId=MiniTask_ScanReward&t=${t}&body={"scanAssignmentId":"${scanAssignmentId}"}&appid=hot_channel&loginType=11&clientType=wxapp&client=android&clientVersion=7.22.270&build=&osVersion=Android%2010&screen=360*780&networkType=wifi&d_brand=HUAWEI&d_model=VOG-AL00&d_name=&lang=zh_CN&_ste=2`,
                    form: ``,
                    cookie,
                    algo: {
                        'appId': '60d61',
                        'type': 'wechat',
                    },
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                        referer: 'https://servicewechat.com/wx91d27dbf599dff74/665/page-frame.html',
                    }
                }
                )
                // console.log(reward)
                console.log('获得金币', reward.data[0].discount)
            } else {
                console.log('已完成')
            }

        }
        
        home = await this.algo.curl({
            'url': `https://api.m.jd.com/MiniTask_ChannelPage?g_ty=ls&g_tk=1016381002&functionId=MiniTask_ChannelPage&t=${t}&body=%7B%22source%22%3A%22task%22%7D&appid=hot_channel&loginType=11&clientType=wxapp&client=android&clientVersion=7.22.270&build=&osVersion=Android%2010&screen=360*780&networkType=wifi&d_brand=HUAWEI&d_model=VOG-AL00&d_name=&lang=zh_CN&_ste=2`,
            form: ``,
            //    cookie,
            cookie: `${cookie};buildtime=20221031;wxapp_type=1;wxapp_version=7.22.310;wxapp_scene=1112;cid=5`,

            algo: {
                'appId': '60d61',
                'type': 'wechat',
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/7974 MicroMessenger/8.0.21.2120(0x2800153B) Process/appbrand0 WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                referer: 'https://servicewechat.com/wx91d27dbf599dff74/666/page-frame.html',
            }
        }
        )
        // console.log(home)
        point = home.data.point
        this.print(`当前金币:${point}`,p.user)
        this.print(`可兑换红包:${point/1000}`,p.user)
        this.print(`可兑换现金:${point/1250}`,p.user)
    }
}

module.exports = Main;
