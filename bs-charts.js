/*
 * @Author: 农村高富帅
 * @Date: 2018-11-23 10:38:12
 * @LastEditors: 农村高富帅
 * @LastEditTime: 2018-11-26 18:31:13
 * @Description: bitsum weap h5
 * @Email: gaozemin0509@gmail.com
 */

/**
 * options
 * 
 * context 绘制上下文 require
 * xNumArray 横轴数据 require
 * yNumArray 纵轴数据 require
 * xArray 横轴展示数据 default xNumArray
 * yArray 纵轴展示数据 default yNumArray
 * widht 宽度 default 200xp
 * height 高度 default 200xp
 * isShowX 是否展示横轴数据 默认展示（ture）
 * isShowY 是否展示纵轴数据 默认展示（ture）
 * isShowAxisX 是否展示横轴 默认展示（ture）
 * isShowAxisY 是否展示纵轴 默认展示（ture）
 * isYRight 纵轴是否在右边，默认在左边（false）
 * xAxisColor x轴的颜色 default #000000
 * yAxisColor y轴的颜色 default #000000
 * pathColor 绘制线的颜色 default #000000
 * gradientStartColor 背景渐变色开始  default #1CB0F6
 * gradientEndColor 背景渐变色结束  default #ffffff
 * paddingLeft 左边距 default 20
 * paddingRight 右边距 default 20
 * fixedY y轴数据保留小数点位数，default 2
 */
/**
 * 
 * @param {context 绘制上下文,xArray 横轴数据,widht 宽度 default 200xp,height 高度 default 200xp,isShowX 是否展示横轴数据 默认展示（ture）,isShowY 是否展示纵轴数据 默认展示（ture）,isYRight 纵轴是否在右边，默认在左边（false} options 
 */
const createCanves = function createCanves(options) {
    // 参数初始化
    if (!options || Object.keys(options).length == 0) {
        console.warn('请初始化options')
        return
    }
    let context = options.context
    if (!context) {
        console.warn('请初始化context')
        return
    }
    let xNumArray = options.xNumArray
    if (!xNumArray || xNumArray.length == 0) {
        console.warn('请初始化xNumArray')
        return
    }
    let yNumArray = options.yNumArray
    if (!yNumArray || yNumArray.length == 0) {
        console.warn('请初始化yNumArray')
        return
    }
    let xArray = options.xArray || xNumArray
    let yArray = options.yArray || yNumArray
    let width = options.width || 200
    let height = options.height || 200
    let gradientStartColor = options.gradientStartColor || 'rgba(28,176,246,0.6)'
    let gradientEndColor = options.gradientStartColor || '#ffffff'

    let isShowX = options.isShowX
    let isShowY = options.isShowY
    let isYRight = options.isYRight
    let isShowAxisX = options.isShowAxisX
    let isShowAxisY = options.isShowAxisY
    let paddingLeft = options.paddingLeft
    let paddingRight = options.paddingRight
    let fixedY = options.fixedY
    if (isShowX == undefined) {
        isShowX = true
    }
    if (isShowY == undefined) {
        isShowY = true
    }
    if (isShowAxisX == undefined) {
        isShowAxisX = true
    }
    if (isShowAxisY == undefined) {
        isShowAxisY = true
    }
    if (isYRight == undefined) {
        isYRight = false
    }
    if (paddingLeft == undefined) {
        paddingLeft = 20
    }
    if (paddingRight == undefined) {
        paddingRight = 20
    }
    if (fixedY == undefined) {
        fixedY = 2
    }
    let xAxisColor = options.xAxisColor || '#000000'
    let yAxisColor = options.yAxisColor || '#000000'
    let pathColor = options.pathColor || '#000000'

    let xCount = xNumArray.length
    let yCount = yNumArray.length
    if (xCount > yCount) {
        console.warn('横轴元素长度小于或者等于纵轴元素长度')
        return
    } else if (xCount < yCount) {
        xNumArray = []
        for (let index = 0; index < yNumArray.length; index++) {
            xNumArray.push(index)

        }
    }

    // 数据都转化为number类型
    for (let index = 0; index < yNumArray.length; index++) {
        yNumArray[index] = parseFloat(yNumArray[index])

    }
    // 给y轴数据排序 bubbleSort为排序方法
    let sortYArray = bubbleSort(yArray)
    let sortYNumArray = bubbleSort(yNumArray)
    let minY = sortYNumArray[0]
    let maxY = sortYNumArray[sortYNumArray.length - 1]


    // 绘制
    let margin = 20 // 上下边距
    // 绘制横纵坐标
    let x = paddingLeft
    let y = margin
    if (isShowAxisY) {
        context.setStrokeStyle(yAxisColor)

        // y轴在右边
        if (isYRight) {
            x = width - paddingRight
        }
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(x, height - margin)
        context.closePath()
        context.stroke()
    }


    // x轴
    if (isShowAxisX) {
        context.setStrokeStyle(xAxisColor)
        x = paddingLeft
        y = height - margin
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(width - paddingRight, y)
        context.closePath()
        context.stroke()
    }


    // 绘制数据线
    let canvesAreaW = width - (paddingLeft + paddingRight)
    let canvesAreaH = height - (2 * margin)
    context.beginPath()
    context.moveTo(paddingLeft, height - margin)
    context.lineTo(x, y)
    context.setStrokeStyle(pathColor)
    for (let index = 0; index < xNumArray.length; index++) {
        let yElement = yNumArray[index]
        x = paddingLeft + ((canvesAreaW / (xNumArray.length - 1)) * (index))
        let skip = maxY - minY
        if (skip == 0) {
            y = margin

        } else {
            y = height - margin - (canvesAreaH / (maxY - minY) * (yElement - minY))

        }
        context.lineTo(x, y)
    }
    context.lineTo(width - paddingRight, height - margin)
    context.setStrokeStyle(pathColor)
    context.stroke();
    var my_gradient = context.createLinearGradient(0, 0, 0, height - margin);
    my_gradient.addColorStop(0, gradientStartColor);    //定义黄色渐变色
    my_gradient.addColorStop(1, gradientEndColor);    //定义红色渐变色
    context.setFillStyle(my_gradient)
    context.fill()


    // 数字下边添加
    // x 轴
    context.setTextAlign('center')
    context.setFillStyle(xAxisColor)
    context.setFontSize(12)
    // context.fillText(0, margin, height - 8)
    if (isShowX) {
        for (let index = 0; index < xArray.length; index++) {
            const element = xArray[index];
            y = height - 8
            x = (canvesAreaW / (xArray.length - 1)) * (index) + paddingLeft
            context.fillText(element, x, y)
        }
    }

    // y轴
    if (isShowY) {
        for (let index = 0; index < sortYArray.length; index++) {
            x = 20
            if (isYRight) {
                x = width - (paddingRight / 2)
            }
            if ((maxY - minY) == 0) {
                y = margin
            } else {
                y = height - (canvesAreaH / (yArray.length - 1)) * (index) - margin
            }

            context.fillText((sortYArray[index]).toFixed(fixedY), x, y)
        }
    }
    context.draw()
}


function bubbleSort(array) {
    var arr = array.concat()
    var i = arr.length - 1;  //初始时,最后位置保持不变
    while (i > 0) {
        var pos = 0; //每趟开始时,无记录交换
        for (var j = 0; j < i; j++)
            if (arr[j] > arr[j + 1]) {
                pos = j; //记录交换的位置
                var tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }
        i = pos; //为下一趟排序作准备
    }
    return arr;
}


module.exports = createCanves