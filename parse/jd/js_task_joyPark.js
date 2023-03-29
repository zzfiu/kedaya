const Template = require('../../template');

class Main extends Template {
    constructor() {
        super()
        this.title = "京东极速版汪汪乐园"
        this.cron = '33 2,14 * * *'
        this.help = 'main'
        this.task = 'local'
        this.import = ['jdAlgo', 'jdUrl', 'fs']
        this.model = 'shuffle'
        this.readme = `默认只做任务,第一次访问会在invite/jd_task_joyPark.json生成主号助力code,之后执行会循环助力这些code`
        this.delay = 1000
        this.interval = 10000
        this.hint = {
            merge: '1 # 执行购买与合成任务',
            interval: '6000 # 运行一个账户后,等待6s后执行下一个账号',
            delay: "500 # 每次访问url时,等待0.5s",
            count: "4 # 连续几次没有获取info数据就停止运行"
        }
    }

    async prepare() {
        this.algo = new this.modules.jdAlgo()
        let fcode = []
        try {
            let txt = this.modules.fs.readFileSync(`${this.dirname}/invite/jd_task_joyPark.json`).toString()
            this.code = this.loads(txt)
        } catch (e) {
        }
    }

    async main(p) {
        let cookie = p.cookie
        let self = this
        let count = parseInt(this.profile.count || 4)
        if (this.n>count - 1) {
            console.log(`连续${count}次没有获取到info,ip已黑,停止运行`)
            this.jump = 1
            return
        }
        // 跑前认证
        await this.curl({
                'url': `https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&channel=icon&sid=c07acedeb4316f9273bfcd3e7fbfdaew`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=LsQNxL7iWDlXUs6cFl-AAg&channel=icon&sid=c07acedeb4316f9273bfcd3e7fbfdaew`,
                'form': ` `,
                cookie
            }
        )
        await this.curl({
                'url': `https://wq.jd.com/bases/ylmonitor/preArousal?app=jdliteapp&refer=https%3A%2F%2Fjoypark.jd.com%2F%3FactivityId%3DLsQNxL7iWDlXUs6cFl-AAg%26channel%3Dicon%26id%3Dc07acedeb4316f9273bfcd3e7fbfdaew&type=1&msg=configCenterAjaxPrame%20Exception&t=0.865337744831448`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=LsQNxL7iWDlXUs6cFl-AAg&channel=icon&lng=0.000000&lat=0.000000`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://api.m.jd.com/?functionId=getStaticResource&body={"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://api.m.jd.com/?functionId=checkUserIndulge&body={}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://h5speed.m.jd.com/v2/speed/activity?flag=168&sid=76275185-a14a-42ac-9ba9-e0913a345e19&libVer=3.7.3&url=https%3A%2F%2Fjoypark.jd.com%2F&rts=${new Date().getTime()}&title=%E6%B1%AA%E6%B1%AA%E4%B9%90%E5%9B%AD&network=unknown&p1=1&p2=1&p3=1&p4=0&p5=0&p6=274&p7=161&p8=83&p9=246&p10=329&p11=1646&p12=1647&p13=-${new Date().getTime()}&p14=1877&p15=784&p16=1093&p17=3&resources={%22unify.min.js%22:0,%22api-checkUserIndulge%22:75,%22api-joyList%22:87,%22joy10.png?11%22:0,%22circle_blue.png%22:0,%22circle_yellow.png%22:0,%22joy2.png?11%22:0,%22joy_dowork.png%22:0,%22joy3.png?11%22:0,%22joy1.png?11%22:0,%22joy5.png?11%22:0,%22joy12.png?11%22:0,%22joy6.png?11%22:0,%22joy11.png?11%22:0,%22joy7.png?11%22:0,%22joy8.png?11%22:0,%22joy4.png?11%22:0,%22joy9.png?11%22:0,%22joy20.png?11%22:0,%22joy24.png?11%22:0,%22joy21.png?11%22:0,%22joy19.png?11%22:0,%22joy18.png?11%22:0,%22joy16.png?11%22:0,%22joy15.png?11%22:0,%22joy22.png?11%22:0,%22joy17.png?11%22:0,%22joy25.png?11%22:0,%22joy23.png?11%22:0,%22joy13.png?11%22:0,%22joy14.png?11%22:0,%22joy26.png?11%22:0,%22joy28.png?11%22:0,%22joy30.png?11%22:0,%22joy29.png?11%22:0,%22joy27.png?11%22:0,%22cfcb64a9ea5d4660.png%22:0,%22userhead.png%22:0,%22user_box.gif%22:0,%22user_money.png%22:0,%22sound_on.png%22:0,%22rule.png%22:0,%22joy_store.png%22:0,%22joy_coin.png%22:0,%22joy_new20.png%22:0}`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://h5speed.m.jd.com/v2/speed/event?flag=168&sid=76275185-a14a-42ac-9ba9-e0913a345e19&libVer=3.7.3&url=https%3A%2F%2Fjoypark.jd.com%2F&rts=${new Date().getTime()}&title=%E6%B1%AA%E6%B1%AA%E4%B9%90%E5%9B%AD&network=unknown&fp=&fcp=&lcp=%5B%5D&fid=&cls=&clsInfo=%5B%5D&tti=&fps=%5B%5D&longTask=%5B%5D&tbt=`,
                // 'form':``,
                cookie
            }
        )
        let reports = setInterval(async function f() {
            console.log(`正在上报游戏信息...`)
            let report = await self.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                    // 'form':``,
                    cookie
                }
            )
        }, 10000)
        let inviterPin
        if (this.code.length>0) {
            let help = this.code[(p.index + 1) % this.code.length] || {}
            console.log("正在助力:", help.user)
            inviterPin = help.inviterPin
            if (!this.taskId) {
                let list = await this.curl({
                        'url': `https://api.m.jd.com/`,
                        'form': `functionId=apTaskList&body={"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                    }
                )
                for (let i of this.haskey(list, 'data')) {
                    if (i.taskType == 'SHARE_INVITE') {
                        this.taskId = i.id
                    }
                }
            }
        }
        var base = await this.algo.curl({
                'url': `https://api.m.jd.com/`,
                'form': `functionId=joyBaseInfo&body={"taskId":"${this.taskId}","inviteType":"1","inviterPin":"${inviterPin}","linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                cookie,
                algo: {
                    type: "lite", "version": "3.1", 'appId': '4abce'
                }
            }
        )
        try {
            if (this.haskey(base, 'data')) {
                this.n = 0
            }
            else if (this.haskey(base, 'errMsg', 'blackfail')) {
                console.log("在小黑屋还没出来呢...")
            }
            else {
                this.n++
            }
            if (this.haskey(base, 'data.level') == 30) {
                let joyRestart = await this.algo.curl({
                        'url': `https://api.m.jd.com/`,
                        'form': `functionId=joyRestart&body={"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                        cookie,
                        algo: {
                            type: "lite", "version": "3.1", 'appId': '4abce'
                        }
                    }
                )
                console.log(`已经满级了,正在切换场景`)
            }
            await this.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                    // 'form':``,
                    cookie
                }
            )
            let list = await this.curl({
                    'url': `https://api.m.jd.com/`,
                    'form': `functionId=apTaskList&body={"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                    cookie
                }
            )
            for (let i of this.haskey(list, 'data')) {
                if (i.taskType == 'SHARE_INVITE') {
                    if (this.cookies.help.includes(p.cookie) && this.haskey(base, 'data.invitePin')) {
                        let shareCode = {
                            user: p.user,
                            inviterPin: base.data.invitePin
                        }
                        console.log('获取助力码:', shareCode)
                        this.code.push(shareCode)
                    }
                }
                if (i.taskDoTimes != i.taskLimitTimes) {
                    let ok = 0
                    for (let j = 0; j<i.taskLimitTimes - i.taskDoTimes; j++) {
                        if (ok) {
                            break
                        }
                        console.log(`正在做:`, i.taskTitle)
                        switch (i.taskType) {
                            case 'ORDER_MARK':
                                break
                            case 'SHARE_INVITE':
                                this.inviteId = i.id
                                if (i.taskLimitTimes != i.taskDoTimes) {
                                    let r = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                            cookie
                                        }
                                    )
                                    console.log('任务完成:', r.success)
                                    if (this.haskey(r, 'errMsg', '参数校验失败') || this.haskey(r, 'errMsg', '领取次数不足')) {
                                        ok = 1
                                    }
                                }
                                break
                            case 'BROWSE_CHANNEL':
                            case 'SIGN':
                                let s = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apDoTask&body={"taskType":"${i.taskType}","taskId":${i.id},"itemId":"${encodeURIComponent(i.taskSourceUrl)}","linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                        cookie
                                    }
                                )
                                let d = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                        cookie
                                    }
                                )
                                console.log('任务完成:', d.success)
                                break
                            case 'BROWSE_PRODUCT':
                                let detail = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDetail&body={"taskType":"${i.taskType}","taskId":${i.id},"channel":4,"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                        cookie
                                    }
                                )
                                if (this.haskey(detail, 'data.taskItemList')) {
                                    let s = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apDoTask&body={"taskType":"${i.taskType}","taskId":${i.id},"channel":4,"linkId":"LsQNxL7iWDlXUs6cFl-AAg","itemId":"${detail.data.taskItemList  [j].itemId}"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                            cookie
                                        }
                                    )
                                    let d = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                            cookie
                                        }
                                    )
                                    console.log('任务完成:', d.success)
                                }
                                break
                        }
                        if (i.taskShowTitle == '带着汪汪去赛跑！') {
                            console.log(`等待汪汪赛跑返回能量`)
                            for (let kk of Array(3)) {
                                await this.wait(2000)
                                let home = await this.curl({
                                        'url': `https://api.m.jd.com/?functionId=runningPageHome&body={"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${this.timestamp}&appid=activities_platform&client=ios&clientVersion=4.8.0&cthr=1&build=1164&screen=320*568&networkType=wifi&d_brand=iPhone&d_model=iPhone8,4&lang=zh_CN&osVersion=11.4&partner=`,
                                        // 'form':``,
                                        referer: `https://h5platform.jd.com/swm-stable/people-run/index?activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=LsQNxL7iWDlXUs6cFl-AAg`,
                                        cookie
                                    }
                                )
                                if (this.haskey(home, 'data.runningJoyUserVo.energy')) {
                                    console.log(`能量棒:`, home.data.runningJoyUserVo.energy)
                                    break
                                }
                            }
                        }
                    }
                }
                else {
                    console.log(`任务完成`, i.taskTitle)
                }
                if (i.canDrawAwardNum) {
                    for (let n of Array(i.canDrawAwardNum)) {
                        let d = await this.algo.curl({
                                'url': `https://api.m.jd.com/`,
                                'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                cookie
                            }
                        )
                        console.log('任务完成:', d.success)
                    }
                }
            }
            await this.curl({
                    'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=LsQNxL7iWDlXUs6cFl-AAg`,
                    // 'form':``,
                    cookie
                }
            )
            let home = await this.curl({
                    'url': `https://api.m.jd.com/?functionId=runningPageHome&body={"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&cthr=1&build=1164&screen=320*568&networkType=wifi&d_brand=iPhone&d_model=iPhone8,4&lang=zh_CN&osVersion=11.4&partner=`,
                    // 'form':``,
                    referer: `https://h5platform.jd.com/swm-stable/people-run/index?activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=LsQNxL7iWDlXUs6cFl-AAg`,
                    cookie
                }
            )
            if (this.haskey(home, 'data.runningJoyUserVo.energy')) {
                console.log(`能量棒:`, home.data.runningJoyUserVo.energy)
            }
            if (this.profile.merge) {
                let info = base
                if (this.haskey(info, 'errMsg', 'blackfail')) {
                    console.log("在小黑屋还没出来呢...")
                    clearInterval(reports)
                    return
                }
                let level = info.data.level
                let buyLevel = info.data.fastBuyLevel
                let maxLevel = level>4 ? level + 3 : 7
                // if (!this.dict[p.user].maxLevel) {
                //     console.log("当前等级", level, ',本次升级到', maxLevel, '后停止运行')
                //     this.dict[p.user].maxLevel = maxLevel
                // }
                if (level == 30) {
                    let joyRestart = await this.algo.curl({
                            'url': `https://api.m.jd.com/`,
                            'form': `functionId=joyRestart&body={"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                            cookie,
                            algo: {
                                type: "lite", "version": "3.1", 'appId': '4abce'
                            }
                        }
                    )
                    console.log(`已经满级了,正在切换场景`)
                    buyLevel = 1
                }
                let s = await this.joyList(p)
                let dict = s.dict
                let min = s.min
                let number = s.number
                let err = 0
                let jump = 1
                if (dict["25"] && dict["26"] && dict["27"] && dict["28"] && dict["29"]) {
                    for (let z of Array(2)) {
                        var buy = await this.algo.curl({
                                'url': `https://api.m.jd.com/`,
                                'form': `functionId=joyBuy&body={"level":21,"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                cookie,
                                algo: {
                                    type: "lite", "version": "3.1", 'appId': 'ffb36'
                                }
                            }
                        )
                        if (this.haskey(buy, 'data.id')) {
                            break
                        }
                        await this.wait(this.rand(1000, 2500))
                    }
                    s = await this.joyList(p)
                    dict = s.dict
                    min = s.min
                    number = s.number
                    if (this.haskey(buy, 'data.id')) {
                        // dict[buy.data.level] = dict[buy.data.level] || []
                        // dict[buy.data.level].push(buy.data.id)
                        buyLevel = buy.data.fastBuyLevel
                        console.log('购买', buy.data.level, dict[buy.data.level] || buy.data.id)
                    }
                }
                if (min<buyLevel) {
                    jump = 0
                    for (let i = min; i<buyLevel; i++) {
                        console.log(`检测到有: ${i}级的单身狗`)
                        if (dict[i] && dict[i].length % 2 == 1 && i != min) {
                            console.log(`有一只未配对: ${i}级的单身狗`)
                            continue
                        }
                        else if (dict[i] && dict[i].length % 2 == 0 && i == min) {
                            console.log(`可以双双配对: ${i}级的单身狗`)
                            continue
                        }
                        for (let z of Array(2)) {
                            var buy = await this.algo.curl({
                                    'url': `https://api.m.jd.com/`,
                                    'form': `functionId=joyBuy&body={"level":${i},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                    cookie,
                                    algo: {
                                        type: "lite", "version": "3.1", 'appId': 'ffb36'
                                    }
                                }
                            )
                            if (this.haskey(buy, 'data.id')) {
                                break
                            }
                            await this.wait(this.rand(1000, 2500))
                        }
                        s = await this.joyList(p)
                        dict = s.dict
                        min = s.min
                        number = s.number
                        if (this.haskey(buy, 'data.id')) {
                            buyLevel = buy.data.fastBuyLevel
                            console.log('购买', buy.data.level, dict[buy.data.level])
                        }
                        else if (this.haskey(buy, 'code', 519)) {
                            console.log(`购买${i}级失败`)
                            err = 1
                            break
                        }
                        else {
                            break
                        }
                        await this.wait(this.rand(1000, 2500))
                    }
                }
                s = await this.joyList(p)
                dict = s.dict
                min = s.min
                number = s.number
                for (let n = 0; n<8; n++) {
                    // if (dict[maxLevel]) {
                    //     console.log("超出本次升级最大等级,请过一会再运行....")
                    //     break
                    // }
                    if (jump != 0) {
                        if (err) {
                            break
                        }
                        for (let k of Array(1)) {
                            let buy = await this.algo.curl({
                                    'url': `https://api.m.jd.com/`,
                                    'form': `functionId=joyBuy&body={"level":${buyLevel},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                    cookie,
                                    algo: {
                                        type: "lite", "version": "3.1", 'appId': 'ffb36'
                                    }
                                }
                            )
                            s = await this.joyList(p)
                            dict = s.dict
                            min = s.min
                            number = s.number
                            if (this.haskey(buy, 'data.id')) {
                                buyLevel = buy.data.fastBuyLevel
                                console.log('购买', buy.data.level, dict[buy.data.level])
                            }
                            else if (this.haskey(buy, 'code', 519)) {
                                console.log(`购买${buyLevel}级失败`)
                                err = 1
                                break
                            }
                            else {
                                break
                            }
                            await this.wait(this.rand(1000, 2500))
                        }
                    }
                    for (let i in dict) {
                        let list = dict[i]
                        if (list.length>1) {
                            let spl = this.slice(list, 2)
                            for (let k of spl) {
                                if (k.length == 2) {
                                    let merge = await this.algo.curl({
                                            'url': `https://api.m.jd.com/?functionId=joyMergeGet&body={"joyOneId":${k[0]},"joyTwoId":${k[1]},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                            cookie,
                                            algo: {
                                                type: "lite", "version": "3.1", 'appId': 'b08cf'
                                            }
                                        }
                                    )
                                    s = await this.joyList(p)
                                    dict = s.dict
                                    min = s.min
                                    number = s.number
                                    if (this.haskey(merge, 'data.joyVO')) {
                                        buyLevel = merge.data.joyVO.fastBuyLevel
                                        console.log('升级', merge.data.joyVO.level, dict[merge.data.joyVO.level])
                                        number = s.number
                                        if (merge.data.joyVO.level == 30) {
                                            let joyRestart = await this.algo.curl({
                                                    'url': `https://api.m.jd.com/`,
                                                    'form': `functionId=joyRestart&body={"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                                    cookie,
                                                    algo: {
                                                        type: "lite", "version": "3.1", 'appId': '4abce'
                                                    }
                                                }
                                            )
                                            console.log(`已经满级了,正在切换场景`)
                                            buyLevel = 1
                                        }
                                    }
                                    else {
                                        console.log(`升级失败`)
                                        err = 1
                                        break
                                    }
                                }
                                await this.wait(this.rand(1000, 2500))
                            }
                        }
                    }
                }
                let jl = []
                for (let i in dict) {
                    jl = [...jl, ...dict[i]]
                }
                let location = 1
                for (let i of jl.reverse()) {
                    let move = await this.algo.curl({
                            'url': 'https://api.m.jd.com/',
                            'form': `functionId=joyMove&body={"joyId":${i},"location":${location},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                            cookie,
                            algo: {
                                type: "lite", "version": "3.1", 'appId': '50788'
                            }
                        }
                    )
                    location++
                    if (!move.success) {
                        break
                    }
                }
            }
            let prize = await this.algo.curl({
                    'url': `https://api.m.jd.com/`,
                    'form': `functionId=gameMyPrize&body={"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                    cookie
                }
            )
            for (let i of this.haskey(prize, 'data.gamePrizeItemVos')) {
                if (i.prizeType == 4 && this.haskey(i, 'prizeTypeVO.prizeUsed', 0)) {
                    console.log(`正在提现: ${i.prizeName}`)
                    let cash = await this.algo.curl({
                            'url': `https://api.m.jd.com/`,
                            'form': `functionId=apCashWithDraw&body={"businessSource":"JOY_PARK","base":{"id":${i.prizeTypeVO.id},"business":"joyPark","poolBaseId":${i.prizeTypeVO.poolBaseId},"prizeGroupId":${i.prizeTypeVO.prizeGroupId},"prizeBaseId":${i.prizeTypeVO.prizeBaseId},"prizeType":4},"linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                            cookie
                        }
                    )
                    if (this.haskey(cash, 'data.message', '提现中')) {
                        this.print(`提现: ${i.prizeName}`, p.user)
                    }
                    await this.wait(5000)
                }
            }
        } catch (e) {
        }
        console.log("停止游戏信息上报...")
        clearInterval(reports)
        let cashPrize = await this.curl({
                'url': `https://api.m.jd.com/?functionId=gameMyCashPrize&body={"linkId":"LsQNxL7iWDlXUs6cFl-AAg","pageNum":1,"pageSize":10}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&build=1269&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=11.4&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                // 'form':``,
                cookie
            }
        )
        for (let i of this.haskey(cashPrize, 'data.items')) {
            if (i.prizeType == 4 && i.state == 0) {
                let sss = await this.algo.curl({
                        'url': 'https://api.m.jd.com/',
                        form: `functionId=apCashWithDraw&body={"businessSource":"NONE","base":{"id":${i.id},"business":null,"poolBaseId":${i.poolBaseId},"prizeGroupId":${i.prizeGroupId},"prizeBaseId":${i.prizeBaseId},"prizeType":${i.prizeType},"activityId":"${i.activityId}"},"linkId":"LsQNxL7iWDlXUs6cFl-AAg","inviter":""}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=4.8.0&cthr=1&uuid=db953e5e7cc5812dae6b5e45a04201cc4f3e2030&build=1177&screen=375*667&networkType=wifi&d_brand=iPhone&d_model=iPhone8,1&lang=zh_CN&osVersion=13.7&partner=&eid=eidI16fe81226asdsrs6k2OTTyOBBbhCfGtXwbK7PBFBEWxOgr9KLEUyLLuTguf4fW8nrXFjtSacDPyb%2FWv6KWmFaBUhrlMiSnB5H42FsBr2f72YyFA4`,
                        cookie
                    }
                )
                if (this.haskey(sss, 'data.message'), "无效的openId，当前pin尚未绑定微信") {
                    console.log("无效的openId，当前pin尚未绑定微信")
                    break
                }
                this.print(`提现${i.prizeValue} ${this.haskey(sss, 'data.message')}`, p.user)
                await this.wait(5000)
            }
        }
    }

    async extra() {
        let code = []
        let dict = this.column(this.code, 'inviterPin', 'user') || {}
        for (let i in dict) {
            code.push({user: i, inviterPin: dict[i]})
        }
        await this.modules.fs.writeFile(`${this.dirname}/invite/jd_task_joyPark.json`, this.dumps(code), (error) => {
            if (error) return console.log("写入化失败" + error.message);
            console.log("助力列表写入成功");
        })
    }
}

module.exports = Main;
