// this is callback hello
const getUser = (userId, getOrders) => {
    console.log(`getting user id ${userId}`)
    getOrders()
}
const getOrders = (user, processOrder) => {
    console.log(`${user} getting your orders`)
    processOrder()
}
const processPayment = (orders, sendEmail) => {
    console.log(`processing ${orders} payment`)
    sendEmail()
}

const sendEmail = (paymentResult, confirm) => {
    console.log("sending email")
    confirm()
}

export default function callBackHell() {
    getUser("1", (user = "dilip") => {
        getOrders(user, (orders = "vadapav") => {
            processPayment(orders, (paymentResult = 100) => {
                sendEmail(paymentResult, (confirmation = "yes") => {
                    console.log("Order confirmed:", confirmation);
                });
            });
        });
    });
}



