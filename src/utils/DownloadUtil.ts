// 下载文件
export default function downloadFile(data,fileName){
    // @ts-ignore
    let url = window.URL.createObjectURL(new Blob([data]))
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.setAttribute('download',fileName)
    document.body.appendChild(a)
    //执行下载
    a.click()
    // @ts-ignore
    window.URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
}
