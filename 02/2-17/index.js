const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const configFilename = './rss_feeds.txt'

function checkForRssFile() {
    fs.access(configFilename, err => {
        if (err) return next(new Error(`Missing:${configFilename}`))
        next(null, configFilename)
    })
}

function readRssFile(configFileName) {
    fs.readFile(configFileName, (err, feedList) => {
        if (err) return next(err)
        console.log('readRssFile console')
        feedList = feedList
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split('\n')
        const random = Math.floor(Math.random() * feedList.length)
        console.log(`random:${random}`)
        console.log(feedList)
        next(null, feedList[random])
    })
}

function downloadRssFeed(feedUrl) {
    request({uri: feedUrl}, (err, res, body) => {
        if (err) return next(err)
        if (res.statusCode !== 200) return next(err)
        console.log('down')
        console.log(res.statusCode)
        console.log(Object.keys(res))
        next(null, body)
    })
}

function parseRssFeed(rss) {
    const handler = new htmlparser.RssHandler()
    console.log('handler')
    console.log(handler)
    const parser = new htmlparser.Parser(handler)
    console.log('parser')
    console.log(parser)
    parser.parseComplete(rss)
    console.log(handler.dom.items)
    console.log(handler.dom.items.length)
    if (!handler.dom.items.length) return next(new Error('No rss found'))
    const item = handler.dom.items.shift()
    console.log('item')
    console.log(item)
    console.log(item.title)
    console.log(item.link)

}

const tasks = [
    checkForRssFile,
    readRssFile,
    downloadRssFeed,
    parseRssFeed
]

function next(err, result) {
    if (err) throw err
    const currentTask = tasks.shift()
    if (currentTask) {
        currentTask(result)
    }
}


next()