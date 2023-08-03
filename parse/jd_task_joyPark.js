const Template = require('../../template');

class Main extends Template {
    constructor() {
        super()
        this.title = "京东汪汪庄园"
        this.cron = '22 9,21 * * *'
        this.help = 'jd_6b92704ea3c31'
        this.task = 'local'
        this.import = ['jdAlgo', 'jdUrl', 'fs']
        this.model = 'shuffle'
        this.readme = `默认只做任务,第一次访问会在invite/jd_task_joyPark.json生成主号助力code,之后执行会循环助力这些code`
        this.delay = 500
        this.interval = 6000
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
            let txt = this.modules.fs.readFileSync(`${this.dirname}/invite/${this.filename}.json`).toString()
            this.code = this.loads(txt)
        } catch (e) {
        }
    }

    async main(p) {
        let cookie = p.cookie;
        let count = parseInt(this.profile.count || 4)
        if (this.n>count - 1) {
            console.log(`连续${count}次没有获取到info,ip已黑,停止运行`)
            this.jump = 1
            return
        }
        let self = this
        // 跑前认证
        await this.curl({
                'url': `https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&sid=e502bd3c560dd981443ce6aa22d16bcw&un_area=22_2022_43226_57192`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=jBNXcoiASxGof0f2RFI2Sw&sid=e502bd3c560dd981443ce6aa22d16bcw&un_area=22_2022_43226_57192`,
                'form': ` `,
                cookie
            }
        )
        await this.curl({
                'url': `https://wq.jd.com/bases/ylmonitor/preArousal?app=jdliteapp&refer=https%3A%2F%2Fjoypark.jd.com%2F%3FactivityId%3DjBNXcoiASxGof0f2RFI2Sw%26channel%3Dicon%26sid%3Dc07acedeb4316f9273bfcd3e7fbfdaew&type=1&msg=configCenterAjaxPrame%20Exception&t=0.865337744831448`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=jBNXcoiASxGof0f2RFI2Sw&channel=icon&lng=0.000000&lat=0.000000`,
                // 'form':``,
                cookie
            }
        )
        let a = await this.curl(this.modules.jdUrl.app('queryNative', {
                "activityId": "3UJHhCg4aqDUvoKV68iEH6hghYz8",
                "dogeVersion": "0.59.9"
            }, 'post', cookie)
        )
        let c = await this.curl({
                'url': `https://api.m.jd.com/client.action?functionId=babelGetGuideTips&body={"tipsBusinessId":"0","activityId":"3UJHhCg4aqDUvoKV68iEH6hghYz8","plusExpoTimes":["1662537929547","1662537964931","1662538321101","1662695679342","1663128637223","1663487592110","1665798599912","1665798660939","1665798754185","1665799485600"],"plusClickTimes":[],"plusCloseTimes":[],"channel":"2","siteClient":"apple","mitemAddrId":"","geo":{"lng":"","lat":""},"addressId":"","posLng":"","posLat":"","un_area":"","gps_area":"","homeLng":"","homeLat":"","homeCityLng":"","homeCityLat":"","focus":"","innerAnchor":"","cv":"2.0"}&screen=640*1008&client=wh5&clientVersion=1.0.0&uuid=&ext=%7B%22prstate%22%3A%220%22%7D&callback=bjsonp0`,
                // 'form':``,
                cookie
            }
        )
        let d = await this.curl({
                'url': `https://api.m.jd.com/?functionId=getStaticResource&body={"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&cthr=1&build=168528&screen=320*568&networkType=4g&d_brand=iPhone&d_model=iPhone8,4&lang=zh_CN&osVersion=11.4&partner=&eid=eidIf0aa8121d5saWrnr3ryoR6qt1FxGRFjFGVq57Vv5jwdgmcxSHUO23TTEORkTW84A92Fijx10j2lZfx228DL%2BPAqTpx3MK1VsIZiVGD2pPczQWVRx`,
                // 'form':``,
                cookie
            }
        )
        let e = await this.curl({
                'url': `https://api.m.jd.com/?functionId=checkUserIndulge&body=%7B%7D&t=${new Date().getTime()}&appid=activities_platform&null`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=jBNXcoiASxGof0f2RFI2Sw&channel=icon&lng=0.000000&lat=0.000000`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://api.m.jd.com/?functionId=getStaticResource&body={"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://api.m.jd.com/?functionId=checkUserIndulge&body={}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                // 'form':``,
                cookie
            }
        )
        let reports = setInterval(async function f() {
            console.log(`正在上报游戏信息...`)
            let report = await self.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
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
                        'form': `functionId=apTaskList&body={"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
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
                'form': `functionId=joyBaseInfo&body={"taskId":"${inviterPin ? this.taskId : ''}","inviteType":"1","inviterPin":"${inviterPin}","linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                cookie,
                algo: {
                    type: "main", "version": "3.1", 'appId': '4abce'
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
                        'form': `functionId=joyRestart&body={"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                        cookie,
                        algo: {
                            type: "main", "version": "3.1", 'appId': '4abce'
                        }
                    }
                )
                console.log(`已经满级了,正在切换场景`)
            }
            await this.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                    // 'form':``,
                    cookie
                }
            )
            //   clearInterval(reports)
            // return
            // if (this.haskey(base, 'code', 1006)) {
            //     console.log(`进小黑屋了,过两天再来`)
            //     clearInterval(reports)
            //     return
            // }
            let list = await this.curl({
                    'url': `https://api.m.jd.com/`,
                    'form': `functionId=apTaskList&body={"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
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
                                            'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
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
                                        'form': `functionId=apDoTask&body={"taskType":"${i.taskType}","taskId":${i.id},"itemId":"${encodeURIComponent(i.taskSourceUrl)}","linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                        cookie
                                    }
                                )
                                let d = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                        cookie
                                    }
                                )
                                console.log('任务完成:', d.success)
                                break
                            case 'BROWSE_PRODUCT':
                                let detail = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDetail&body={"taskType":"${i.taskType}","taskId":${i.id},"channel":4,"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                        cookie
                                    }
                                )
                                if (this.haskey(detail, 'data.taskItemList')) {
                                    let s = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apDoTask&body={"taskType":"${i.taskType}","taskId":${i.id},"channel":4,"linkId":"jBNXcoiASxGof0f2RFI2Sw","itemId":"${(detail.data.taskItemList  [j] || detail.data.taskItemList  [0]).itemId}"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                            cookie
                                        }
                                    )
                                    let d = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
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
                                        'url': `https://api.m.jd.com/?functionId=runningPageHome&body={"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${this.timestamp}&appid=activities_platform&client=ios&clientVersion=11.6.0&cthr=1&build=1164&screen=320*568&networkType=wifi&d_brand=iPhone&d_model=iPhone8,4&lang=zh_CN&osVersion=13.7&partner=`,
                                        // 'form':``,
                                        referer: `https://h5platform.jd.com/swm-stable/people-run/index?activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=jBNXcoiASxGof0f2RFI2Sw`,
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
                                'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                cookie
                            }
                        )
                        console.log('任务完成:', d.success)
                    }
                }
            }
            // console.log("停止游戏信息上报...")
            // clearInterval(reports)
            // return
            await this.curl({
                    'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=jBNXcoiASxGof0f2RFI2Sw`,
                    // 'form':``,
                    cookie
                }
            )
            if (this.profile.merge) {
                let info = base
                if (this.haskey(info, 'errMsg', 'blackfail')) {
                    console.log("在小黑屋还没出来呢...")
                    clearInterval(reports)
                    return
                }
                else if (!info) {
                    console.log("没有获取到游戏数据...")
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
                            'form': `functionId=joyRestart&body={"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                            cookie,
                            algo: {
                                type: "main", "version": "3.1", 'appId': '4abce'
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
                                'form': `functionId=joyBuy&body={"level":21,"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                cookie,
                                algo: {
                                    type: "main", "version": "3.1", 'appId': 'ffb36'
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
                                    'form': `functionId=joyBuy&body={"level":${i},"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                    cookie,
                                    algo: {
                                        type: "main", "version": "3.1", 'appId': 'ffb36'
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
                                    'form': `functionId=joyBuy&body={"level":${buyLevel},"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                    cookie,
                                    algo: {
                                        type: "main", "version": "3.1", 'appId': 'ffb36'
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
                                            'url': `https://api.m.jd.com/?functionId=joyMergeGet&body={"joyOneId":${k[0]},"joyTwoId":${k[1]},"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                            cookie,
                                            algo: {
                                                type: "main", "version": "3.1", 'appId': 'b08cf'
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
                                                    'form': `functionId=joyRestart&body={"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                                                    cookie,
                                                    algo: {
                                                        type: "main", "version": "3.1", 'appId': '4abce'
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
                            'form': `functionId=joyMove&body={"joyId":${i},"location":${location},"linkId":"jBNXcoiASxGof0f2RFI2Sw"}&appid=activities_platform&client=ios&clientVersion=11.6.0&build=168528&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=13.7&partner=&eid=eidIb24b812115s9jUHzkyfNSICH4T313nxTSY1B9QqDr0IUV8vdzISUvNGSXxO%2BeCNY01V69ImKsiy4ptOddRzE0E%2F950ionHyQBWNiEguhXNM%2B%2BD5v`,
                            cookie,
                            algo: {
                                type: "main", "version": "3.1", 'appId': '50788'
                            }
                        }
                    )
                    location++
                    if (!move.success) {
                        break
                    }
                }
            }
        } catch
            (e) {
        }
        console.log("停止游戏信息上报...")
        clearInterval(reports)
    }

    async extra() {
        let code = []
        let dict = this.column(this.code, 'inviterPin', 'user') || {}
        for (let i in dict) {
            code.push({user: i, inviterPin: dict[i]})
        }
        await this.modules.fs.writeFile(`${this.dirname}/invite/${this.filename}.json`, this.dumps(code), (error) => {
            if (error) return console.log("写入化失败" + error.message);
            console.log("助力列表写入成功");
        })
    }
}

module.exports = Main;
