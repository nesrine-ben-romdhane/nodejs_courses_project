class AppError extends Error {
    constructor(){
        super()
    }
    create (message,status,statusText){
        this.message=message
        this.status=status
        this.statusText=statusText
        return this 
        // retutrn this bech traja3 kol chy
        

    }
}
module.exports=new AppError()