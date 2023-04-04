const Template = require('../../template');
let res = ""
class Main extends Template {
    constructor() {
        super()
        this.title = "京东有奖答题通知"
        this.cron = "33 * * * *"
        this.import = ['jdUrl']
        this.task = 'local'
    }
    async prepare() {
    }
    async main(p) {
        let cookie = p.cookie;
        let notion = await this.curl({
            'url': `https://answer.jd.com/community/survey/list`,
            // 'form':``,
            cookie,
        }
        )
        console.log(JSON.stringify(notion.messages.list))
        if (notion.messages.list.length > 0) {
            for (let a of notion.messages.list) {
                for (let b of a.surveyList) {
                    let auto = ''
                    let qas = ''
                    console.log(p.user, `\n问卷：${b.title},${b.subTitle}\n地址：${b.answerUrl}`)
                    try {
                        if (b.subTitle.includes('1-2京豆') || b.subTitle.includes('2-3京豆')) {
                            console.log(`自动答题`)
                            let info = b.answerUrl.split('/')
                            // console.log(info)
                            let shortCode = info[4]
                            let surveyId = info[5].split('.')[0]
                            // console.log(shortCode,surveyId)
                            let html = await this.curl({
                                'url': b.answerUrl,
                                cookie,
                            }
                            )
                            // console.log(html)
                            let sasToken = html.match(/sas-token value=(\w+)/)[1]
                            // console.log(sasToken)
                            let Detail = await this.curl({
                                'url': `https://answer.jd.com/answer/getSurveyDetail?surveyId=${surveyId}&shortCode=${shortCode}`,
                                cookie,
                            }
                            )
                            let questions = Detail.messages.jsonStr.pages
                            // console.log(questions)
                            let questionAnswer = []
                            let flag = 1
                            for (let q of questions) {
                                // console.log(q)
                                if (q.questions.length > 1) {
                                    flag = 0
                                    break
                                }
                                let id = q.id
                                let question = q.questions[0].title.match(/[^<>"]+(?=<\/(?:p|span)>)/)[0]
                                if (q.questions[0].options) {
                                    let options = q.questions[0].options[Math.floor(Math.random() * (q.questions[0].options.length - 2 - 0) + 0)]
                                    var answername = options.text.match(/[^<>"]+(?=<\/(?:p|span)>)/)[0]
                                    var answerid = options.id
                                } else {
                                    var answername = '无'
                                }
                                let type = q.questions[0].type
                                console.log(question, answername)
                                switch (type) {
                                    case "SingleChoice":
                                    case "MultipleChoice":
                                        var answer = {
                                            "id": answerid,
                                            "name": answername
                                        }
                                    case "InputQuestion":
                                        var answer = answername
                                }
                                questionAnswer.push({
                                    "id": id,
                                    "type": type,
                                    "title": question,
                                    "answer": answer
                                })
                            }
                            // console.log(questionAnswer)
                            if (flag) {
                                let body = {
                                    "surveyId": surveyId,
                                    "trapIds": [
                                    ],
                                    "questionAnswer": questionAnswer,
                                    "exception": 0,
                                    "ext1": "",
                                    "ext2": "",
                                    "ext3": "",
                                    "ext4": "",
                                    "ext5": ""
                                }
                                let sTime = new Date((new Date).getTime() + 8 * 60 * 60 * 1000).toJSON().replace(/T/, " ").substr(0, 19)
                                let commit = await this.curl({
                                    'url': `https://answer.jd.com/answer/commitSurveyAnswers`,
                                    'form': `surveyId=${surveyId}&source=community&content=${this.dumps(body)}&sTime=${sTime}&exception=0&v=0.22386442043050447&sasToken=${sasToken}&ext1=&ext2=&ext3=&ext4=&ext5=`,
                                    cookie,
                                }
                                )
                                // console.log(commit)
                                if (commit.result) {
                                    console.log(commit.messages.msg)
                                }
                                auto = commit.messages.msg
                            }

                        }
                        else {
                            console.log(`尝试判断答案`)
                            let info = b.answerUrl.split('/')
                            // console.log(info)
                            let shortCode = info[4]
                            let surveyId = info[5].split('.')[0]
                            // console.log(shortCode,surveyId)
                            let html = await this.curl({
                                'url': b.answerUrl,
                                cookie,
                            }
                            )
                            console.log(info)
                            let Detail = await this.curl({
                                'url': `https://answer.jd.com/answer/getSurveyDetail?surveyId=${surveyId}&shortCode=${shortCode}`,
                                cookie,
                            }
                            )
                            try {
                                var messages = Detail.messages
                                var jsonStr = messages.jsonStr
                            } catch (e) {
                                var Detail2 = Detail.replace(/"jsonStr":/, '"jsonStr":""')
                                Detail = JSON.parse(Detail2)
                                var messages = Detail.messages
                                var jsonStr = messages.jsonStr
                                // console.log(e)
                            }
                            let title = Detail.messages.title.replace(/<.?[\w \-=":(,);]+>/g, '')
                            if (jsonStr) {
                                let questions = Detail.messages.jsonStr.pages
                                for (let q of questions) {
                                    for (let i of q.questions) {
                                        if (i.type == "SingleChoice") {
                                            let question = i.title.match(/>(.+)<(\/p|\/span)>/)[1].replace(/<.+>(.+)<.+>/, '$1')
                                            let answers = []
                                            let tag = 0
                                            for (let a of i.options) {
                                                if (a.goto == "-2") {
                                                    let answer = a.text.match(/>(.+)<(\/p|\/span)>/)[1].replace(/<.+>(.+)<.+>/, '$1').replace(/<.+>/, '')
                                                    answers.push(answer)
                                                    tag = 1
                                                }
                                            }
                                            if (tag) {
                                                qas += `${i.index}:${question}\n不要选:${answers}\n\n`
                                            }
                                        }
                                    }
                                }
                                console.log(qas)
                            } else {
                                console.log(`不支持类型`)
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    this.notices(`问卷：${b.title},${b.subTitle}\n地址：${b.answerUrl}\n${auto}\n${qas}`, p.user)
                }
            }
        } else {
            console.log(p.user, `当前无问卷`)
        }

    }

}

module.exports = Main;
