const urls = [
    { info: 'link1', time: 3000, priority: 1},
    { info: 'link2', time: 2000, priority: 1},
    { info: 'link3', time: 1000, priority: 1},
    { info: 'link4', time: 800, priority: 4},
    { info: 'link5', time: 1500, priority: 1},
    { info: 'link6', time: 2000, priority: 1},
    { info: 'link7', time: 300, priority: 6},
    { info: 'link8', time: 3000, priority: 1},
    { info: 'link9', time: 1000, priority: 1},
]

const loadImg = (url) => {
    return new Promise((resolve, reject) => {
        console.log('---' + url.info + ' start!');
        setTimeout(() => {
            console.log(url.info + 'is OK!!!');
            resolve();
        }, url.time);
    })
}

module.exports = {
    urls,
    loadImg
}