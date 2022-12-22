import { Product } from "../features/products/productSlice"

export const paginateList = (arr: Product[], num: number) => {
    let subArr = []
    let resultArr = []
    const pageNum = Math.ceil(arr.length/num)
    for (let i = 1; i <= pageNum; i++) {
        subArr = arr.slice((i-1)*num, i*num)
        resultArr.push(subArr)
    }
    return resultArr
}

