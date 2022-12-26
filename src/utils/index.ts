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

export const getProductsPerPage = (arr: Product[], page: number, quantity: number) => {
    return arr.slice((page-1)*quantity, page*quantity)
} 

export const formatFoodName = (name: string) => {
    let nameWithoutDash = name.split('-').join(' ')
    return nameWithoutDash.charAt(0).toUpperCase() + nameWithoutDash.slice(1)
}

