
const asyncHandler =  (fn) =>  async (req, res, next) => {
        try{
            await fn(req, res, next)
        } catch (e) {
            // console.log(e)
            res.status(e.statusCode || 500).json({
                success: false,
                statusCode: e.statusCode,
                message: e.message
            })

        }
    }


export {asyncHandler}