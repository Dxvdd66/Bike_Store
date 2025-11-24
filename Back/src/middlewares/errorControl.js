// middlewares/errorControl.js
module.exports = (fn) => {
    return (req, res, next) => {
        try {
            fn(req, res, next);
        } catch (error) {
            console.error("❌ Error:", error);
            res.status(500).json({
                mensaje: "Error interno del servidor",
                error: error.message
            });
        }
    };
};

