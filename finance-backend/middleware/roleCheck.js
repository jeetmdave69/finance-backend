// role-based access control middleware
// simple version using headers (can be replaced with JWT later)

module.exports = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            const userRole = req.headers.role;

            // check if role is provided
            if (!userRole) {
                return res.status(401).json({
                    message: "No role provided in request headers"
                });
            }

            // normalize role (avoid case issues)
            const normalizedRole = userRole.toLowerCase();

            // check if role is valid
            const validRoles = ['admin', 'analyst', 'viewer'];
            if (!validRoles.includes(normalizedRole)) {
                return res.status(400).json({
                    message: "Invalid role provided"
                });
            }

            // check access
            if (!allowedRoles.includes(normalizedRole)) {
                return res.status(403).json({
                    message: "Access denied: insufficient permissions"
                });
            }

            // attach role to request (useful later)
            req.user = {
                role: normalizedRole
            };

            next();

        } catch (error) {
            console.error("Role check error:", error);
            res.status(500).json({
                message: "Server error in role check"
            });
        }
    };
};