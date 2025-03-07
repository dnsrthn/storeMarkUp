export const handleErrors = (error, req, res, next) => {
    if (error.status === 400 || error.errors) {
        return res.status(400).json({
            success: false,
            errors: error.errors
        })
    }
    return res.status(500).json({
        success: false,
        message: error.message
    })
}
