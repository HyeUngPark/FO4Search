export function checkConsonant (text) {
    var pattern = /([^0-9a-zA-Z가-힣\x20])/i
    return pattern.test(text)
}

export function checkSpecial(text) {
    var pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi
    return pattern.test(text)
}

export function checkSpace(text) {
    return text.search(/\s/) != -1
}

