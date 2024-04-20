export const badRequestHendler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400)
            .send({
                succes: false,
                message: err.messsage,
                errorList: err.errorList.map((e) => e.msg),
            })
    } else {
        next(err)
    }
}
export const unauthorizedHandler = (err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({
            succes: false,
            message: err.messsage
        })
    } else {
        next(err)
    }
}
export const notfoundHandler = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({ success: false, message: err.message })
    } else {
        next(err)
    }
}
