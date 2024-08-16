class ApiResponse {
    constructor(statusCode, data, success = true){
        this.statusCode = statusCode,
        this.data = data,
        this.success = success
    }
}

export {ApiResponse}