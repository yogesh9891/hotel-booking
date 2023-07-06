export const calculateGstOnAmount = (amount) => {
    let gstObj ={
        tax:0,
        taxAmount:0,
        amount:amount
    }
    if(amount < 7500){
        gstObj.tax = 12
        let gstamo =Math.round(0.12*amount)
        gstObj.amount = gstamo;
    } else {
        gstObj.tax = 18
        let gstamo =Math.round(0.18*amount)
        gstObj.amount = gstamo;
    }
    return gstObj;
}