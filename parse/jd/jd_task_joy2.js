const Template = require('../../template');

class Main extends Template {
    constructor() {
        super()
        this.title = "京东汪汪乐园"
        this.cron = "33 8,21 * * *"
        this.help = 'main'
        this.task = 'local'
        this.import = ['jdAlgo']
        this.model = 'shuffle'
        this.readme = "默认只做任务,如需购买跟合成请在ini设置节点\n[jd_task_joy]\nmerge=1"
    }

    async prepare() {
        this.algo = new this.modules.jdAlgo({
            type: "lite", "version": "3.1", 'appId': '4abce'
        })
        for (let cookie of this.cookies.help) {
            await this.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    // 'form':``,
                    cookie,
                    algo: {
                        type: "lite", "version": "3.1", 'appId': '4abce'
                    }
                }
            )
            let s = await this.algo.curl({
                    'url': `https://api.m.jd.com/`,
                    'form': `functionId=joyBaseInfo&body={"taskId":"","inviteType":"","inviterPin":"","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform&cthr=1`,
                    cookie,
                    algo: {
                        type: "lite", "version": "3.1", 'appId': '4abce'
                    }
                }
            )
            if (this.haskey(s, 'data.invitePin')) {
                this.shareCode.push({
                    invitePin: s.data.invitePin, user: this.userName(cookie)
                })
            }
        }
    }

    async main(p) {
        let cookie = p.cookie;
        let self = this
        await this.curl({
                'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=99DZNpaCTAv8f4TuKXr0Ew&channel=icon&lng=0.000000&lat=0.000000`,
                // 'form':``,
                cookie
            }
        )
        await this.algo.curl({
                'url': `https://api.m.jd.com/?functionId=joyList&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                // 'form':``,
                cookie,
                algo: {
                    type: "lite", "version": "3.1", 'appId': 'e18ed'
                }
            }
        )
        await this.curl({
                'url': `https://api.m.jd.com/?functionId=getStaticResource&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=1662772800233&appid=activities_platform&cthr=1`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://api.m.jd.com/?functionId=checkUserIndulge&body={}&t=${new Date().getTime()}&appid=activities_platform&null`,
                // 'form':``,
                cookie
            }
        )
        let reports = setInterval(async function f() {
            console.log(`正在上报游戏信息...`)
            let report = await self.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    // 'form':``,
                    cookie
                }
            )
        }, 10000)
        try {
            let base = await this.algo.curl({
                    'url': `https://api.m.jd.com/`,
                    'form': `functionId=joyBaseInfo&body={"taskId":"610","inviteType":"1","inviterPin":"${p.inviter.invitePin}","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    cookie,
                    algo: {
                        type: "lite", "version": "3.1", 'appId': '4abce'
                    }
                }
            )
            if (this.haskey(base, 'data.level') == 30) {
                let joyRestart = await this.algo.curl({
                        'url': `https://api.m.jd.com/`,
                        'form': `functionId=joyRestart&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                        cookie,
                        algo: {
                            type: "lite", "version": "3.1", 'appId': '4abce'
                        }
                    }
                )
                console.log(`已经满级了,正在切换场景`)
            }
            await this.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                    'form': `functionId=apTaskList&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    cookie
                }
            )
            for (let i of this.haskey(list, 'data')) {
                if (i.taskDoTimes != i.taskLimitTimes) {
                    for (let j = 0; j<i.taskLimitTimes - i.taskDoTimes; j++) {
                        console.log(`正在做:`, i.taskTitle)
                        switch (i.taskType) {
                            case 'SHARE_INVITE':
                                let r = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                        cookie
                                    }
                                )
                                console.log('任务完成:', r.success)
                                break
                            case 'BROWSE_CHANNEL':
                            case 'SIGN':
                                let s = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apDoTask&body={"taskType":"${i.taskType}","taskId":${i.id},"itemId":"${encodeURIComponent(i.taskSourceUrl)}","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                        cookie
                                    }
                                )
                                let d = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                        cookie
                                    }
                                )
                                console.log('任务完成:', d.success)
                                break
                            case 'BROWSE_PRODUCT':
                                let detail = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDetail&body={"taskType":"${i.taskType}","taskId":${i.id},"channel":4,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                        cookie
                                    }
                                )
                                if (this.haskey(detail, 'data.taskItemList')) {
                                    let s = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apDoTask&body={"taskType":"${i.taskType}","taskId":${i.id},"channel":4,"linkId":"99DZNpaCTAv8f4TuKXr0Ew","itemId":"${detail.data.taskItemList  [j].itemId}"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                            cookie
                                        }
                                    )
                                    let d = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                                        'url': `https://api.m.jd.com/?functionId=runningPageHome&body={"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${this.timestamp}&appid=activities_platform&client=ios&clientVersion=3.9.2&cthr=1&build=1164&screen=320*568&networkType=wifi&d_brand=iPhone&d_model=iPhone8,4&lang=zh_CN&osVersion=11.4&partner=`,
                                        // 'form':``,
                                        referer: `https://h5platform.jd.com/swm-stable/people-run/index?activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=99DZNpaCTAv8f4TuKXr0Ew`,
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
                                'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                    'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=99DZNpaCTAv8f4TuKXr0Ew`,
                    // 'form':``,
                    cookie
                }
            )
            let home = await this.curl({
                    'url': `https://api.m.jd.com/?functionId=runningPageHome&body={"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=3.9.2&cthr=1&build=1164&screen=320*568&networkType=wifi&d_brand=iPhone&d_model=iPhone8,4&lang=zh_CN&osVersion=11.4&partner=`,
                    // 'form':``,
                    referer: `https://h5platform.jd.com/swm-stable/people-run/index?activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=99DZNpaCTAv8f4TuKXr0Ew&lng=117.613005&lat=23.940137&sid=47c4455121cd08e4894576635689174w&un_area=16_1341_1347_44750`,
                    cookie
                }
            )
            if (this.haskey(home, 'data.runningJoyUserVo.energy')) {
                console.log(`能量棒:`, home.data.runningJoyUserVo.energy)
            }
            if (this.profile.merge) {
                let info = await this.algo.curl({
                        'url': `https://api.m.jd.com/`,
                        'form': `functionId=joyBaseInfo&body={"taskId":"","inviteType":"","inviterPin":"","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                        cookie,
                        algo: {
                            type: "lite", "version": "3.1", 'appId': '4abce'
                        }
                    }
                )
                let level = info.data.level
                let buyLevel = info.data.fastBuyLevel
                if (level == 30) {
                    let joyRestart = await this.algo.curl({
                            'url': `https://api.m.jd.com/`,
                            'form': `functionId=joyRestart&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                                'form': `functionId=joyBuy&body={"level":21,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                                cookie,
                                algo: {
                                    type: "lite", "version": "3.1", 'appId': 'ffb36'
                                }
                            }
                        )
                        if (this.haskey(buy, 'data.id')) {
                            break
                        }
                        await this.wait(this.rand(4000, 6000))
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
                // console.log(buyLevel)
                // console.log(dict)
                // if (dict["1"] && buyLevel>7) {
                //     for (let kk of ["1", "2"]) {
                //         for (let ll of dict[kk]) {
                //             let remove = await this.curl({
                //                     'url': `https://api.m.jd.com/`,
                //                     'form': `functionId=joyRecovery&body={"joyId":${ll},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=1663387977180&appid=activities_platform&cthr=1`,
                //                     cookie
                //                 }
                //             )
                //             console.log(remove)
                //         }
                //     }
                // }
                // return
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
                                    'form': `functionId=joyBuy&body={"level":${i},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                                    cookie,
                                    algo: {
                                        type: "lite", "version": "3.1", 'appId': 'ffb36'
                                    }
                                }
                            )
                            if (this.haskey(buy, 'data.id')) {
                                break
                            }
                            await this.wait(this.rand(4000, 6000))
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
                        await this.wait(this.rand(4000, 6000))
                    }
                }
                s = await this.joyList(p)
                dict = s.dict
                min = s.min
                number = s.number
                for (let n = 0; n<36; n++) {
                    if (jump != 0) {
                        if (err) {
                            break
                        }
                        for (let k of Array(1)) {
                            let buy = await this.algo.curl({
                                    'url': `https://api.m.jd.com/`,
                                    'form': `functionId=joyBuy&body={"level":${buyLevel},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
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
                            await this.wait(this.rand(4000, 6000))
                        }
                    }
                    for (let i in dict) {
                        let list = dict[i]
                        if (list.length>1) {
                            let spl = this.slice(list, 2)
                            for (let k of spl) {
                                if (k.length == 2) {
                                    let merge = await this.algo.curl({
                                            'url': `https://api.m.jd.com/?functionId=joyMergeGet&body={"joyOneId":${k[0]},"joyTwoId":${k[1]},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
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
                                                    'form': `functionId=joyRestart&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                                await this.wait(this.rand(4000, 6000))
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
                            'form': `functionId=joyMove&body={"joyId":${i},"location":${location},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform&cthr=1`,
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
                    'form': `functionId=gameMyPrize&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    cookie
                }
            )
            for (let i of this.haskey(prize, 'data.gamePrizeItemVos')) {
                if (i.prizeType == 4 && this.haskey(i, 'prizeTypeVO.prizeUsed', 0)) {
                    console.log(`正在提现: ${i.prizeName}`)
                    let cash = await this.algo.curl({
                            'url': `https://api.m.jd.com/`,
                            'form': `functionId=apCashWithDraw&body={"businessSource":"JOY_PARK","base":{"id":${i.prizeTypeVO.id},"business":"joyPark","poolBaseId":${i.prizeTypeVO.poolBaseId},"prizeGroupId":${i.prizeTypeVO.prizeGroupId},"prizeBaseId":${i.prizeTypeVO.prizeBaseId},"prizeType":4},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
            console.log(e)
        }
        console.log("停止游戏信息上报...")
        clearInterval(reports)
        let cashPrize = await this.curl({
                'url': `https://api.m.jd.com/?functionId=gameMyCashPrize&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew","pageNum":1,"pageSize":10}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                // 'form':``,
                cookie
            }
        )
        for (let i of this.haskey(cashPrize, 'data.items')) {
            if (i.prizeType == 4 && i.state == 0) {
                let sss = await this.algo.curl({
                        'url': 'https://api.m.jd.com/',
                        form: `functionId=apCashWithDraw&body={"businessSource":"NONE","base":{"id":${i.id},"business":null,"poolBaseId":${i.poolBaseId},"prizeGroupId":${i.prizeGroupId},"prizeBaseId":${i.prizeBaseId},"prizeType":${i.prizeType},"activityId":"${i.activityId}"},"linkId":"99DZNpaCTAv8f4TuKXr0Ew","inviter":""}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=3.9.6&cthr=1&uuid=db953e5e7cc5812dae6b5e45a04201cc4f3e2030&build=1177&screen=375*667&networkType=wifi&d_brand=iPhone&d_model=iPhone8,1&lang=zh_CN&osVersion=13.7&partner=&eid=eidI16fe81226asdsrs6k2OTTyOBBbhCfGtXwbK7PBFBEWxOgr9KLEUyLLuTguf4fW8nrXFjtSacDPyb%2FWv6KWmFaBUhrlMiSnB5H42FsBr2f72YyFA4`,
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
        let other = this.shareCode[p.number + 1] || this.shareCode[0]
        await this.algo.curl({
                'url': `https://api.m.jd.com/`,
                'form': `functionId=joyBaseInfo&body={"taskId":"1185","inviteType":"1","inviterPin":"${other.invitePin}","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                cookie,
                algo: {
                    type: "lite", "version": "3.1", 'appId': '4abce'
                }
            }
        )
    }

    async main2(p) {
        let cookie = p.cookie;
        let self = this
        await this.curl({
                'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=99DZNpaCTAv8f4TuKXr0Ew&channel=icon&lng=0.000000&lat=0.000000`,
                // 'form':``,
                cookie
            }
        )
        await this.algo.curl({
                'url': `https://api.m.jd.com/?functionId=joyList&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                // 'form':``,
                cookie,
                algo: {
                    type: "lite", "version": "3.1", 'appId': 'e18ed'
                }
            }
        )
        await this.curl({
                'url': `https://api.m.jd.com/?functionId=getStaticResource&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=1662772800233&appid=activities_platform&cthr=1`,
                // 'form':``,
                cookie
            }
        )
        await this.curl({
                'url': `https://api.m.jd.com/?functionId=checkUserIndulge&body={}&t=${new Date().getTime()}&appid=activities_platform&null`,
                // 'form':``,
                cookie
            }
        )
        let reports = setInterval(async function f() {
            console.log(`正在上报游戏信息...`)
            let report = await self.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    // 'form':``,
                    cookie
                }
            )
        }, 10000)
        try {
            let base = await this.algo.curl({
                    'url': `https://api.m.jd.com/`,
                    'form': `functionId=joyBaseInfo&body={"taskId":"610","inviteType":"1","inviterPin":"${p.inviter.invitePin}","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    cookie,
                    algo: {
                        type: "lite", "version": "3.1", 'appId': '4abce'
                    }
                }
            )
            if (this.haskey(base, 'data.level') == 30) {
                let joyRestart = await this.algo.curl({
                        'url': `https://api.m.jd.com/`,
                        'form': `functionId=joyRestart&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                        cookie,
                        algo: {
                            type: "lite", "version": "3.1", 'appId': '4abce'
                        }
                    }
                )
                console.log(`已经满级了,正在切换场景`)
            }
            await this.curl({
                    'url': `https://api.m.jd.com/?functionId=gameHeartbeat&body={"businessCode":1,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                    'form': `functionId=apTaskList&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    cookie
                }
            )
            for (let i of this.haskey(list, 'data')) {
                if (i.taskDoTimes != i.taskLimitTimes) {
                    for (let j = 0; j<i.taskLimitTimes - i.taskDoTimes; j++) {
                        console.log(`正在做:`, i.taskTitle)
                        switch (i.taskType) {
                            case 'SHARE_INVITE':
                                let r = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                        cookie
                                    }
                                )
                                console.log('任务完成:', r.success)
                                break
                            case 'BROWSE_CHANNEL':
                            case 'SIGN':
                                let s = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apDoTask&body={"taskType":"${i.taskType}","taskId":${i.id},"itemId":"${encodeURIComponent(i.taskSourceUrl)}","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                        cookie
                                    }
                                )
                                let d = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                        cookie
                                    }
                                )
                                console.log('任务完成:', d.success)
                                break
                            case 'BROWSE_PRODUCT':
                                let detail = await this.algo.curl({
                                        'url': `https://api.m.jd.com/`,
                                        'form': `functionId=apTaskDetail&body={"taskType":"${i.taskType}","taskId":${i.id},"channel":4,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                        cookie
                                    }
                                )
                                if (this.haskey(detail, 'data.taskItemList')) {
                                    let s = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apDoTask&body={"taskType":"${i.taskType}","taskId":${i.id},"channel":4,"linkId":"99DZNpaCTAv8f4TuKXr0Ew","itemId":"${detail.data.taskItemList  [j].itemId}"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                                            cookie
                                        }
                                    )
                                    let d = await this.algo.curl({
                                            'url': `https://api.m.jd.com/`,
                                            'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                                        'url': `https://api.m.jd.com/?functionId=runningPageHome&body={"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${this.timestamp}&appid=activities_platform&client=ios&clientVersion=3.9.2&cthr=1&build=1164&screen=320*568&networkType=wifi&d_brand=iPhone&d_model=iPhone8,4&lang=zh_CN&osVersion=11.4&partner=`,
                                        // 'form':``,
                                        referer: `https://h5platform.jd.com/swm-stable/people-run/index?activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=99DZNpaCTAv8f4TuKXr0Ew`,
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
                                'form': `functionId=apTaskDrawAward&body={"taskType":"${i.taskType}","taskId":${i.id},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                    'url': `https://mapi.m.jd.com/config/display.action?isNewVersion=1&appType=jdlite&_format_=json&activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=99DZNpaCTAv8f4TuKXr0Ew`,
                    // 'form':``,
                    cookie
                }
            )
            let home = await this.curl({
                    'url': `https://api.m.jd.com/?functionId=runningPageHome&body={"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=3.9.2&cthr=1&build=1164&screen=320*568&networkType=wifi&d_brand=iPhone&d_model=iPhone8,4&lang=zh_CN&osVersion=11.4&partner=`,
                    // 'form':``,
                    referer: `https://h5platform.jd.com/swm-stable/people-run/index?activityId=L-sOanK_5RJCz7I314FpnQ&joyLinkId=99DZNpaCTAv8f4TuKXr0Ew&lng=117.613005&lat=23.940137&sid=47c4455121cd08e4894576635689174w&un_area=16_1341_1347_44750`,
                    cookie
                }
            )
            if (this.haskey(home, 'data.runningJoyUserVo.energy')) {
                console.log(`能量棒:`, home.data.runningJoyUserVo.energy)
            }
            if (this.profile.merge) {
                let info = await this.algo.curl({
                        'url': `https://api.m.jd.com/`,
                        'form': `functionId=joyBaseInfo&body={"taskId":"","inviteType":"","inviterPin":"","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                        cookie,
                        algo: {
                            type: "lite", "version": "3.1", 'appId': '4abce'
                        }
                    }
                )
                let level = info.data.level
                let buyLevel = info.data.fastBuyLevel
                if (level == 30) {
                    let joyRestart = await this.algo.curl({
                            'url': `https://api.m.jd.com/`,
                            'form': `functionId=joyRestart&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                            cookie,
                            algo: {
                                type: "lite", "version": "3.1", 'appId': '4abce'
                            }
                        }
                    )
                    console.log(`已经满级了,正在切换场景`)
                    buyLevel = 1
                }
                let joyList = await this.algo.curl({
                        'url': `https://api.m.jd.com/?functionId=joyList&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                        // 'form':``,
                        cookie,
                        algo: {
                            type: "lite", "version": "3.1", 'appId': 'e18ed'
                        }
                    }
                )
                // console.log(joyList.data.activityJoyList)
                let min = (Math.min(...this.column(joyList.data.activityJoyList, 'level').map(d => parseInt(d))))
                let number = joyList.data.joyNumber
                var dict = {}
                for (let i of joyList.data.activityJoyList) {
                    dict[i.level] = dict[i.level] || []
                    dict[i.level].push(i.id)
                }
                if (this.haskey(joyList, 'data.workJoyInfoList')) {
                    for (let i of joyList.data.workJoyInfoList) {
                        if (this.haskey(i, 'joyDTO.id')) {
                            let move = await this.algo.curl({
                                    'url': 'https://api.m.jd.com/',
                                    'form': `functionId=joyMove&body={"joyId":${i.joyDTO.id},"location":0,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform&cthr=1`,
                                    cookie,
                                    algo: {
                                        type: "lite", "version": "3.1", 'appId': '50788'
                                    }
                                }
                            )
                            if (move.success) {
                                dict[i.joyDTO.level] = dict[i.joyDTO.level] || []
                                dict[i.joyDTO.level].push(i.joyDTO.id)
                            }
                        }
                    }
                }
                let err = 0
                let jump = 1
                if (dict["25"] && dict["26"] && dict["27"] && dict["28"] && dict["29"]) {
                    for (let z of Array(2)) {
                        var buy = await this.algo.curl({
                                'url': `https://api.m.jd.com/`,
                                'form': `functionId=joyBuy&body={"level":21,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                                cookie,
                                algo: {
                                    type: "lite", "version": "3.1", 'appId': 'ffb36'
                                }
                            }
                        )
                        if (this.haskey(buy, 'data.id')) {
                            break
                        }
                        await this.wait(this.rand(4000, 6000))
                    }
                    if (this.haskey(buy, 'data.id')) {
                        // dict[buy.data.level] = dict[buy.data.level] || []
                        // dict[buy.data.level].push(buy.data.id)
                        buyLevel = buy.data.fastBuyLevel
                        console.log('购买', buy.data.level, dict[buy.data.level] || buy.data.id)
                        dict[buy.data.level] = dict[buy.data.level] || []
                        dict[buy.data.level].push(buy.data.id)
                    }
                }
                // console.log(buyLevel)
                // console.log(dict)
                // if (dict["1"] && buyLevel>7) {
                //     for (let kk of ["1", "2"]) {
                //         for (let ll of dict[kk]) {
                //             let remove = await this.curl({
                //                     'url': `https://api.m.jd.com/`,
                //                     'form': `functionId=joyRecovery&body={"joyId":${ll},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=1663387977180&appid=activities_platform&cthr=1`,
                //                     cookie
                //                 }
                //             )
                //             console.log(remove)
                //         }
                //     }
                // }
                // return
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
                                    'form': `functionId=joyBuy&body={"level":${i},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                                    cookie,
                                    algo: {
                                        type: "lite", "version": "3.1", 'appId': 'ffb36'
                                    }
                                }
                            )
                            if (this.haskey(buy, 'data.id')) {
                                break
                            }
                            await this.wait(this.rand(4000, 6000))
                        }
                        if (this.haskey(buy, 'data.id')) {
                            // dict[buy.data.level] = dict[buy.data.level] || []
                            // dict[buy.data.level].push(buy.data.id)
                            buyLevel = buy.data.fastBuyLevel
                            console.log('购买', buy.data.level, dict[buy.data.level] || buy.data.id)
                            dict[buy.data.level] = dict[buy.data.level] || []
                            dict[buy.data.level].push(buy.data.id)
                        }
                        else if (this.haskey(buy, 'code', 519)) {
                            console.log(`购买${i}级失败`)
                            err = 1
                            break
                        }
                        else {
                            break
                        }
                        await this.wait(this.rand(4000, 6000))
                    }
                }
                for (let n = 0; n<36; n++) {
                    if (jump != 0) {
                        if (err) {
                            break
                        }
                        for (let k of Array(1)) {
                            let buy = await this.algo.curl({
                                    'url': `https://api.m.jd.com/`,
                                    'form': `functionId=joyBuy&body={"level":${buyLevel},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                                    cookie,
                                    algo: {
                                        type: "lite", "version": "3.1", 'appId': 'ffb36'
                                    }
                                }
                            )
                            if (this.haskey(buy, 'data.id')) {
                                // dict[buy.data.level] = dict[buy.data.level] || []
                                // dict[buy.data.level].push(buy.data.id)
                                buyLevel = buy.data.fastBuyLevel
                                console.log('购买', buy.data.level, dict[buy.data.level] || buy.data.id)
                            }
                            else if (this.haskey(buy, 'code', 519)) {
                                console.log(`购买${buyLevel}级失败`)
                                err = 1
                                break
                            }
                            else {
                                break
                            }
                            let joyList = await this.algo.curl({
                                    'url': `https://api.m.jd.com/?functionId=joyList&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                                    // 'form':``,
                                    cookie,
                                    algo: {
                                        type: "lite", "version": "3.1", 'appId': 'e18ed'
                                    }
                                }
                            )
                            dict = {}
                            for (let i of joyList.data.activityJoyList) {
                                dict[i.level] = dict[i.level] || []
                                dict[i.level].push(i.id)
                            }
                            await this.wait(this.rand(4000, 6000))
                        }
                    }
                    for (let i in dict) {
                        let list = dict[i]
                        if (list.length>1) {
                            let spl = this.slice(list, 2)
                            for (let k of spl) {
                                if (k.length == 2) {
                                    let merge = await this.algo.curl({
                                            'url': `https://api.m.jd.com/?functionId=joyMergeGet&body={"joyOneId":${k[0]},"joyTwoId":${k[1]},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                                            cookie,
                                            algo: {
                                                type: "lite", "version": "3.1", 'appId': 'b08cf'
                                            }
                                        }
                                    )
                                    if (this.haskey(merge, 'data.joyVO')) {
                                        dict[merge.data.joyVO.level] = dict[merge.data.joyVO.level] || []
                                        dict[merge.data.joyVO.level].push(merge.data.joyVO.id)
                                        buyLevel = merge.data.joyVO.fastBuyLevel
                                        console.log('升级', merge.data.joyVO.level, dict[merge.data.joyVO.level])
                                        if (merge.data.joyVO.level == 30) {
                                            let joyRestart = await this.algo.curl({
                                                    'url': `https://api.m.jd.com/`,
                                                    'form': `functionId=joyRestart&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                                    let joyList = await this.algo.curl({
                                            'url': `https://api.m.jd.com/?functionId=joyList&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                                            // 'form':``,
                                            cookie,
                                            algo: {
                                                type: "lite", "version": "3.1", 'appId': 'e18ed'
                                            }
                                        }
                                    )
                                    dict = {}
                                    for (let i of joyList.data.activityJoyList) {
                                        dict[i.level] = dict[i.level] || []
                                        dict[i.level].push(i.id)
                                    }
                                }
                                await this.wait(this.rand(4000, 6000))
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
                            'form': `functionId=joyMove&body={"joyId":${i},"location":${location},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform&cthr=1`,
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
                    'form': `functionId=gameMyPrize&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                    cookie
                }
            )
            for (let i of this.haskey(prize, 'data.gamePrizeItemVos')) {
                if (i.prizeType == 4 && this.haskey(i, 'prizeTypeVO.prizeUsed', 0)) {
                    console.log(`正在提现: ${i.prizeName}`)
                    let cash = await this.algo.curl({
                            'url': `https://api.m.jd.com/`,
                            'form': `functionId=apCashWithDraw&body={"businessSource":"JOY_PARK","base":{"id":${i.prizeTypeVO.id},"business":"joyPark","poolBaseId":${i.prizeTypeVO.poolBaseId},"prizeGroupId":${i.prizeTypeVO.prizeGroupId},"prizeBaseId":${i.prizeTypeVO.prizeBaseId},"prizeType":4},"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
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
                'url': `https://api.m.jd.com/?functionId=gameMyCashPrize&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew","pageNum":1,"pageSize":10}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                // 'form':``,
                cookie
            }
        )
        for (let i of this.haskey(cashPrize, 'data.items')) {
            if (i.prizeType == 4 && i.state == 0) {
                let sss = await this.algo.curl({
                        'url': 'https://api.m.jd.com/',
                        form: `functionId=apCashWithDraw&body={"businessSource":"NONE","base":{"id":${i.id},"business":null,"poolBaseId":${i.poolBaseId},"prizeGroupId":${i.prizeGroupId},"prizeBaseId":${i.prizeBaseId},"prizeType":${i.prizeType},"activityId":"${i.activityId}"},"linkId":"99DZNpaCTAv8f4TuKXr0Ew","inviter":""}&t=${new Date().getTime()}&appid=activities_platform&client=ios&clientVersion=3.9.6&cthr=1&uuid=db953e5e7cc5812dae6b5e45a04201cc4f3e2030&build=1177&screen=375*667&networkType=wifi&d_brand=iPhone&d_model=iPhone8,1&lang=zh_CN&osVersion=13.7&partner=&eid=eidI16fe81226asdsrs6k2OTTyOBBbhCfGtXwbK7PBFBEWxOgr9KLEUyLLuTguf4fW8nrXFjtSacDPyb%2FWv6KWmFaBUhrlMiSnB5H42FsBr2f72YyFA4`,
                        cookie
                    }
                )
                this.print(`提现${i.prizeValue} ${this.haskey(sss, 'data.message')}`, p.user)
                await this.wait(5000)
            }
        }
        let other = this.shareCode[p.number + 1] || this.shareCode[0]
        await this.algo.curl({
                'url': `https://api.m.jd.com/`,
                'form': `functionId=joyBaseInfo&body={"taskId":"610","inviteType":"1","inviterPin":"${other.invitePin}","linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&t=${new Date().getTime()}&appid=activities_platform&cthr=1`,
                cookie,
                algo: {
                    type: "lite", "version": "3.1", 'appId': '4abce'
                }
            }
        )
    }

    async joyList(p) {
        let cookie = p.cookie
        let joyList = await this.algo.curl({
                'url': `https://api.m.jd.com/?functionId=joyList&body={"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform`,
                // 'form':``,
                cookie,
                algo: {
                    type: "lite", "version": "3.1", 'appId': 'e18ed'
                }
            }
        )
        this.assert(joyList.success, "获取狗狗信息出错")
        //  console.log(joyList.data)
        // console.log(joyList.data.activityJoyList)
        // let min = (Math.min(...this.column(joyList.data.activityJoyList, 'level').map(d => parseInt(d))))
        let number = joyList.data.joyNumber
        var dict = {}
        for (let i of joyList.data.activityJoyList) {
            dict[i.level] = dict[i.level] || []
            dict[i.level].push(i.id)
        }
        if (this.haskey(joyList, 'data.workJoyInfoList')) {
            for (let i of joyList.data.workJoyInfoList) {
                if (this.haskey(i, 'joyDTO.id')) {
                    let move = await this.algo.curl({
                            'url': 'https://api.m.jd.com/',
                            'form': `functionId=joyMove&body={"joyId":${i.joyDTO.id},"location":0,"linkId":"99DZNpaCTAv8f4TuKXr0Ew"}&appid=activities_platform&cthr=1`,
                            cookie,
                            algo: {
                                type: "lite", "version": "3.1", 'appId': '50788'
                            }
                        }
                    )
                    if (move.success) {
                        dict[i.joyDTO.level] = dict[i.joyDTO.level] || []
                        dict[i.joyDTO.level].push(i.joyDTO.id)
                    }
                }
            }
        }
        let min = Math.min(...Object.keys(dict))
        // console.log({
        //     dict,
        //     number,
        //     min
        // })
        return {
            dict,
            number,
            min
        }
    }
}

module.exports = Main;
