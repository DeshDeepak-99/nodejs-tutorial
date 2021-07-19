var responseData=
[
    {
        id:1,
        creditAmount:5000,
        debitAmount:2000
    },
    {
        id:2,
        creditAmount:4000,
        debitAmount:2000
    },
    {
        id:3,
        creditAmount:6000,
        debitAmount:2000
    },
];

function performOperationOnCustomer(id,str,responseData)
{
    if(typeof responseData==String)
    {
        responseData=JSON.parse(responseData);
    }
    if(str=="totalBalance")
    {
       return first(id,responseData);
    }
    else if(str=="allUserTotalBalance")
    {
        return second(id,responseData);
    }
    else if(str=="highestBalance")
    {
        return third(id,responseData);
    }
    else if(str=="lowestBalance")
    {
        return fourth(id,responseData);
    }
    else if(str=="totalTransactions")
    {
        return fifth(id,responseData);
    }
    else if(str=="sumAllCreditAmount")
    {
        return sixth(id,responseData);
    }
    else if(str=="sumAllDebitAmount")
    {
        return seventh(id,responseData);
    }
    // Inside Functions
    function first(id,responseData)
    {
        let data=responseData.filter(item=>item.id==id);
       let result=data.creditAmount-data.debitAmount;
       return `balance is ${result}`;
    }
    function second(id,responseData)
    {
        let result=responseData.map(item=>
            {
                let id=item.id;
                let balance=item.creditAmount-item.debitAmount;
                return {
                    id,
                    balance
                }
            });
            return result;
    }
    function third(id,responseData)
    {
        let result=responseData.map(item=>
            {
                let balance=item.creditAmount-item.debitAmount;
                return {
                    balance
                }
            });
            return Math.max.apply(Math, result.map(function(o) { return o.balance; }))
    }
    function fourth(id,responseData)
    {
        let result=responseData.map(item=>
            {
                let balance=item.creditAmount-item.debitAmount;
                return {
                    balance
                }
            });
            return Math.min.apply(Math, result.map(function(o) { return o.balance; }))
    }
    function fifth(id,responseData)
    {
        let result=0;
        let max=responseData.forEach(item=>
            {
                result=result+item.creditAmount-item.debitAmount;
                
            })
            return result;
    }
    function sixth(id,responseData)
    {
        let result=0;
        let max=responseData.forEach(item=>
            {
                result=result+item.creditAmount;
                
            })
            return result; 
    }
    function seventh(id,responseData)
    {
        let result=0;
        let max=responseData.forEach(item=>
            {
                result=result+item.debitAmount;
                
            })
            return result;
    }
}
console.log(performOperationOnCustomer(2,"totalBalance",responseData));
console.log(performOperationOnCustomer(undefined,"allUserTotalBalance",responseData));
console.log(performOperationOnCustomer(undefined,"highestBalance",responseData));
console.log(performOperationOnCustomer(undefined,"lowestBalance",responseData));
console.log(performOperationOnCustomer(undefined,"totalTransactions",responseData));
console.log(performOperationOnCustomer(undefined,"sumAllCreditAmount",responseData));
console.log(performOperationOnCustomer(undefined,"sumAllDebitAmount",responseData));