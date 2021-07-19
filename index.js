// 1. performOperationOnCustomer(3, 'totalBalance', responseData) should returns a number: 1000 
// 2. performOperationOnCustomer(undefined, 'allUserTotalBalance', responseData) return [{id:1, totalBalance: 2323},{id:1, totalBalance: 2323}] 
// 3. performOperationOnCustomer(undefined, 'highestBalance', responseData) 
// 4. performOperationOnCustomer(undefined, 'lowestBalance', responseData) 
// 5. performOperationOnCustomer(undefined, 'totalTransactions', responseData) 
// 6. performOperationOnCustomer(undefined, 'sumAllCreditAmt', responseData) 
// 7. performOperationOnCustomer(undefined, 'sumAllDebitAmt', responseData) 
// 8. print user details by id (2, 'userDetail', responseData)

/**
 * Method to perform operation on customer data
 * 
 * @param {*} userId 
 * @param {*} keyName 
 * @param {*} responseData 
 */
function performOperationOnCustomer( userId, keyName, responseData ) {
    let isValidInput = validateInputs( userId, keyName, responseData )
    if( isValidInput ) {
        switch( keyName ) {
            case 'totalBalance':
                return calculateTotalBalance(userId, responseData)
            
            case 'allUserTotalBalance':
                return calculateAllUserBalance(responseData)
            
            case 'highestBalance':
                return calculateHighestBalance(responseData)
            
            case 'lowestBalance':
                return calculateLowestBalance(responseData)
            
            case 'totalTransactions':
                return calculateTotalTransactions(responseData)
            
            case 'sumAllCreditAmt':
                return calculateSumCreditAmt(responseData)
            
            case 'sumAllDebitAmt':
                return calculateSumDebitAmt(responseData)
            
            case 'userDetail':
                return getUserDetails(userId, responseData)

        }
    } else {
        return 'Invalid Input'
    }
}

/**
 * Method to validate inputs
 * 
 * @param {*} userId
 * @param {*} keyName
 * @param {*} responseData
 */
function validateInputs( userId, keyName, responseData ) {
    const keys = ['allUserTotalBalance', 'highestBalance', 'lowestBalance', 'totalTransactions', 'sumAllCreditAmt', 'sumAllDebitAmt']
    
    if( ( keyName == undefined ||  keyName == null ) && !(keys.includes(keyName) || keyName === "totalBalance" || keyName == "userDetail") ) {
        return false
    }

    if( isNaN(userId) && !keys.includes(keyName) ) {
        return false
    }

    if( !Array.isArray(responseData) ) {
        return false
    }

    return true
}

/**
 * Method to return user details of user id provided from response data
 * 
 * @param {*} userId 
 * @param {*} responseData 
 */
function getUserDetails( userId, responseData ) {
    responseData.foreach(item => {
        if(item == undefined) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null && userId == item["id"]) {
                return item
            }
        }
    })

    return 'No data found for user Id'
}

/**
 * Calculate Total transactions
 * 
 * @param {*} responseData 
 * @returns Number
 */
function calculateTotalTransactions(responseData) {
    let total = 0
    responseData.foreach(item => {
        if(item == undefined || item == null) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null && userId == item["id"]) {
                
                if(item["creditAmount"] != undefined && item["creditAmount"] != null && !isNaN(item["creditAmount"])) {
                    total = total + 1
                }

                if(item["debitAmount"] != undefined && item["debitAmount"] != null && !isNaN(item["debitAmount"])) {
                    total = total + 1
                }
            }
        }
    })

    return total
}

/**
 * Sum total credit amount
 * 
 * @param {*} responseData
 * @returns Number 
 */
function calculateSumCreditAmt( responseData ) {
    let total = 0
    responseData.foreach(item => {
        if(item == undefined || item == null) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null && userId == item["id"]) {
                let creditAmount = 0
                let debitAmount = 0
                if(item["creditAmount"] != undefined && item["creditAmount"] != null && !isNaN(item["creditAmount"])) {
                    total = total + Number(item["creditAmount"])
                }
            }
        }
    })

    return total
}

/**
 * Sum total debit amount
 * 
 * @param {*} responseData
 * @returns Number 
 */
function calculateSumDebitAmt( responseData ) {
    let total = 0
    responseData.foreach(item => {
        if(item == undefined || item == null) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null && userId == item["id"]) {
                let creditAmount = 0
                let debitAmount = 0
                if(item["debitAmount"] != undefined && item["debitAmount"] != null && !isNaN(item["debitAmount"])) {
                    total = total + Number(item["debitAmount"])
                }
            }
        }
    })

    return total
}

/**
 * Calculate lowest balance
 * 
 * @param {*} responseData 
 * @returns Number
 */
function calculateLowestBalance( responseData ) {
    let lowestBalance = 0
    responseData.foreach(item => {
        if(item == undefined || item == null) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null) {
                let creditAmount = 0
                let debitAmount = 0
                let total = 0
                if(item["creditAmount"] != undefined && item["creditAmount"] != null && !isNaN(item["creditAmount"])) {
                    creditAmount = Number(item["creditAmount"])
                }

                if(item["debitAmount"] != undefined && item["debitAmount"] != null && !isNaN(item["debitAmount"])) {
                    debitAmount = Number(item["debitAmount"])
                }

                total = creditAmount - debitAmount
                
                if(total < lowestBalance) {
                    lowestBalance = total
                }
                break
            }
        }
    })
    responseData.foreach(item => {
        if(item == undefined || item == null) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null) {
                let creditAmount = 0
                let debitAmount = 0
                let total = 0
                if(item["creditAmount"] != undefined && item["creditAmount"] != null && !isNaN(item["creditAmount"])) {
                    creditAmount = Number(item["creditAmount"])
                }

                if(item["debitAmount"] != undefined && item["debitAmount"] != null && !isNaN(item["debitAmount"])) {
                    debitAmount = Number(item["debitAmount"])
                }

                total = creditAmount - debitAmount
                
                if(total < lowestBalance) {
                    lowestBalance = total
                }
            }
        }
    })

    return lowestBalance
}

/**
 * Calculate highest balance
 * 
 * @param {*} responseData 
 * @returns Number
 */
function calculateHighestBalance( responseData ) {
    let highestBalance = 0
    responseData.foreach(item => {
        if(item == undefined || item == null) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null) {
                let creditAmount = 0
                let debitAmount = 0
                let total = 0
                if(item["creditAmount"] != undefined && item["creditAmount"] != null && !isNaN(item["creditAmount"])) {
                    creditAmount = Number(item["creditAmount"])
                }

                if(item["debitAmount"] != undefined && item["debitAmount"] != null && !isNaN(item["debitAmount"])) {
                    debitAmount = Number(item["debitAmount"])
                }

                total = creditAmount - debitAmount
                
                if(total > highestBalance) {
                    highestBalance = total
                }
            }
        }
    })

    return highestBalance
}

/**
 * Calculate all user balance
 * 
 * @param {*} responseData 
 * @returns array
 */
function calculateAllUserBalance( responseData ) {
    let allUserBalance = []
    responseData.foreach(item => {
        if(item == undefined || item == null) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null) {
                let creditAmount = 0
                let debitAmount = 0
                let total = 0
                if(item["creditAmount"] != undefined && item["creditAmount"] != null && !isNaN(item["creditAmount"])) {
                    creditAmount = Number(item["creditAmount"])
                }

                if(item["debitAmount"] != undefined && item["debitAmount"] != null && !isNaN(item["debitAmount"])) {
                    debitAmount = Number(item["debitAmount"])
                }

                total = creditAmount - debitAmount
                allUserBalance.push({ 
                    "id": item["id"],
                    "totalBalance": total
                })
            }
        }
    })

    return allUserBalance
}

/**
 * Calculate total balance of user
 * 
 * @param {*} userId 
 * @param {*} responseData 
 * @returns Number
 */
function calculateTotalBalance(userId, responseData) {
    let total = 0
    responseData.foreach(item => {
        if(item == undefined || item == null) {
            return 'Invalid Input'
        } else {
            if(item["id"] != undefined && item["id"] != null && userId == item["id"]) {
                let creditAmount = 0
                let debitAmount = 0
                if(item["creditAmount"] != undefined && item["creditAmount"] != null && !isNaN(item["creditAmount"])) {
                    creditAmount = Number(item["creditAmount"])
                }

                if(item["debitAmount"] != undefined && item["debitAmount"] != null && !isNaN(item["debitAmount"])) {
                    debitAmount = Number(item["debitAmount"])
                }

                total = creditAmount - debitAmount
            }
        }
    })

    return total
}


