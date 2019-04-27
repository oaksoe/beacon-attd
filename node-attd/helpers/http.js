exports.corsOptions = () => {
    return {
        origin: "*",
        methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
        allowedHeaders: "Cache-Control,Content-Type,Authorization,Content-Length",
        maxAge: "1000"
    };
};

exports.res = (res, data) => {
    res.status(200).json({
        status: 'SUCCESS',
        data: data
    });
}

exports.err = (res, error) => {
    res.status(500).json({
        status: 'ERROR',
        error: error.message ? error.message : error
    });    
}
