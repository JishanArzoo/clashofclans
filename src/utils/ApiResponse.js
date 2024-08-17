class ApiResponse {
    constructor(statusCode, data, success = true, message){
        this.statusCode = statusCode,
        this.data = data,
        this.success = success,
        this.message = message
    }
}

export {ApiResponse}